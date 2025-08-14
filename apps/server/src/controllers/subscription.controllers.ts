import { eq, InferSelectModel } from 'drizzle-orm';
import type { Stripe } from 'stripe';
import stripe from '../config/stripe.config';
import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import { subscription, user } from '../db/schema';
import ApiResponse from '../utils/ApiResponse';
import { db } from '../db';

const tierList = [
	{
		name: 'sasic',
		price: 12,
		description: 'For individuals',
		features: ['Feature 1', 'Feature 2', 'Feature 3'],
		priceId: 'price_1RvEouSEXP17teEvMOCnsdfC',
	},
	{
		name: 'grow',
		price: 24,
		description: 'For small teams',
		features: ['Feature 1', 'Feature 2', 'Feature 3'],
		priceId: 'price_1Rw5IdSEXP17teEvSndfKIAF',
	},
	{
		name: 'scale',
		price: 49,
		description: 'For large teams',
		features: ['Feature 1', 'Feature 2', 'Feature 3'],
		priceId: 'price_1Rw5JrSEXP17teEvNO6xubDF',
	},
];

export const checkoutSubscription = asyncHandler(
	async (request: Request, response: Response) => {
		const { tierName } = request.body;
		const storeId = request.storeId!;
		const authUser = request.user as InferSelectModel<typeof user>;

		const selectedTier = tierList.find((tier) => tier.name === tierName);

		if (!selectedTier) {
			response.status(400).json(new ApiError(400, 'Invalid tier'));
		}

		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: selectedTier?.priceId,
					quantity: 1,
				},
			],
			customer_email: authUser.email,
			mode: 'subscription',
			metadata: {
				userId: authUser.id,
				storeId: storeId,
			},
			success_url: `http://localhost:5173/store/${storeId}/success`,
			cancel_url: `http://localhost:5173/store/${storeId}/billing`,
		});

		console.log(session);

		response
			.status(200)
			.json(new ApiResponse(200, session, 'Checkout session created'));
	}
);

// Stripe webhook handler
export const handleStripeWebhook = async (
	request: Request,
	response: Response
) => {
	// let event = request.body;
	// Only verify the event if you have an endpoint secret defined.
	// Otherwise use the basic event deserialized with JSON.parse
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (endpointSecret) {
		// Get the signature sent by Stripe
		const signature = request.headers['stripe-signature'];
		try {
			const event = stripe.webhooks.constructEvent(
				request.body,
				signature as string,
				endpointSecret
			) as Stripe.Event;

			if (event.type === 'checkout.session.completed') {
				const checkoutEvent = event.data.object as Stripe.Checkout.Session & {
					metadata: { userId: string; storeId: string };
				};

				const subscriptionData = (await stripe.subscriptions.retrieve(
					checkoutEvent.subscription as string
				)) as Stripe.Subscription;

				const priceId = subscriptionData.items.data[0].price.id;

				const selectedTier = tierList.find((tier) => tier.priceId === priceId);

				console.log(selectedTier, checkoutEvent, subscriptionData, priceId);

				const storeId = checkoutEvent.metadata?.storeId;
				if (!storeId || typeof storeId !== 'string') {
					throw new Error(
						'Invalid or missing storeId in checkout event metadata'
					);
				}

				try {
					const response = await db
						.insert(subscription)
						.values({
							storeId: storeId,
							stripeCustomerId: checkoutEvent.customer as string,
							subscriptionId: subscriptionData.id,
							tier: selectedTier?.name,
							status: subscriptionData.status,
							lastRenewalDate: new Date(
								subscriptionData.items.data[0].current_period_start * 1000
							).toISOString(),
							currentPeriodEnd: new Date(
								subscriptionData.items.data[0].current_period_end * 1000
							).toISOString(),
							cancelAtPeriodEnd: subscriptionData.cancel_at_period_end || false,
						})
						.returning();

					console.log(response);
				} catch (error) {
					console.log(error);
				}
			} else if (event.type === 'customer.subscription.updated') {
				const subscriptionData = event.data.object as Stripe.Subscription;
				const selectedTier = tierList.find(
					(tier) => tier.priceId === subscriptionData.items.data[0].price.id
				);

				try {
					await db
						.update(subscription)
						.set({
							subscriptionId: subscriptionData.id,
							status: ['active', 'trialing'].includes(subscriptionData.status)
								? 'active'
								: 'inactive',
							tier: selectedTier?.name,
							lastRenewalDate: new Date(
								subscriptionData.items.data[0].current_period_start
							).toISOString(),
							currentPeriodEnd: new Date(
								subscriptionData.items.data[0].current_period_end
							).toISOString(),
							cancelAtPeriodEnd: subscriptionData.cancel_at_period_end,
						})
						.where(eq(subscription.subscriptionId, subscriptionData.id));
				} catch (error) {
					console.log(error);
				}
			}
		} catch (err) {
			console.log(`⚠️  Webhook signature verification failed.`, err as Error);
			response.sendStatus(400);
		}
	}

	// Return a 200 response to acknowledge receipt of the event
	response.send().json({ received: true });
};
