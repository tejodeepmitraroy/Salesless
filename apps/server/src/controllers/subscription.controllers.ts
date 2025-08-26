import { eq, InferSelectModel } from 'drizzle-orm';
import type { Stripe } from 'stripe';
import stripe from '../config/stripe.config';
import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import { store, subscription, user } from '../db/schema';
import ApiResponse from '../utils/ApiResponse';
import { db } from '../db';

// Type for the subscription object we get from the Stripe API
interface StripeSubscription extends Stripe.Subscription {
	current_period_start: number;
	current_period_end: number;
	cancel_at_period_end: boolean;
}

const tierList = [
	{
		name: 'basic',
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

		console.log('tierName', tierName);
		const selectedTier = tierList.find((tier) => tier.name === tierName);
		console.log('selectedTier', selectedTier);

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
			success_url: `http://localhost:5173/store/${storeId}/billing/success`,
			cancel_url: `http://localhost:5173/store/${storeId}/billing`,
		});

		console.log(session);

		response
			.status(200)
			.json(new ApiResponse(200, session, 'Checkout session created'));
	}
);

// Type for request with raw body
type RawBodyRequest = Request & { rawBody?: string };

// Stripe webhook handler
export const handleStripeWebhook = asyncHandler(
	async (request: RawBodyRequest, response: Response) => {
		const signature = request.headers['stripe-signature'] as string;
		const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

		// try {
		try {
			if (!signature) {
				console.error('No signature found in request headers');
				response.status(400).json({ error: 'No signature found' });
			}

			console.log('Body is buffer?', Buffer.isBuffer(request.body));

			if (!request.body) {
				console.error('No raw body found in request');
				response
					.status(400)
					.json({ error: 'Raw body is required for webhook verification' });
			}

			const event = stripe.webhooks.constructEvent(
				request.body,
				signature,
				endpointSecret
			);

			if (!event) {
				console.error('Webhook signature verification failed:');
				response.status(400).json({ error: 'Invalid event' });
			}

			// Handle the event
			if (event.type === 'checkout.session.completed') {
				const session = event.data.object as Stripe.Checkout.Session;
				const subscriptionId = session.subscription as string;

				if (!subscriptionId || typeof subscriptionId !== 'string') {
					response.status(400).json({
						error: 'Invalid or missing subscription ID in checkout session',
					});
				}

				const subscriptionResponse =
					await stripe.subscriptions.retrieve(subscriptionId);
				const subscriptionData =
					subscriptionResponse as unknown as StripeSubscription;
				const priceId = subscriptionData.items.data[0]?.price?.id;

				if (!priceId) {
					response
						.status(400)
						.json({ error: 'Invalid or missing price ID in subscription' });
				}

				const selectedTier = tierList.find((tier) => tier.priceId === priceId);
				const storeId = session.metadata?.storeId as string;

				if (!storeId || typeof storeId !== 'string') {
					response.status(400).json({
						error: 'Invalid or missing storeId in checkout session metadata',
					});
				}

				try {
					await db.transaction(async (tx) => {
						await tx.insert(subscription).values({
							storeId: storeId,
							stripeCustomerId: subscriptionData.customer as string,
							subscriptionId: subscriptionData.id,
							tier: selectedTier!.name,
							status: subscriptionData.status,
							lastRenewalDate: new Date(
								subscriptionData.items.data[0].current_period_start * 1000
							).toISOString(),
							currentPeriodEnd: new Date(
								subscriptionData.items.data[0].current_period_end * 1000
							).toISOString(),
							cancelAtPeriodEnd: subscriptionData.cancel_at_period_end || false,
						});
						await tx
							.update(store)
							.set({
								isSubscribed: true,
							})
							.where(eq(store.id, storeId));
					});
				} catch (error) {
					console.error('Error saving subscription:', error);
					response.status(500).json({ error: 'Error saving subscription' });
				}
			} else if (event.type === 'customer.subscription.updated') {
				const subscriptionData = event.data
					.object as unknown as StripeSubscription;
				const priceId = subscriptionData.items.data[0]?.price?.id;

				if (!priceId) {
					response.status(400).json({
						error: 'Invalid or missing price ID in subscription update',
					});
				}

				const selectedTier = tierList.find((tier) => tier.priceId === priceId);

				try {
					await db
						.update(subscription)
						.set({
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
						.where(eq(subscription.subscriptionId, subscriptionData.id));
				} catch (error) {
					console.error('Error updating subscription:', error);
					response.status(500).json({ error: 'Error updating subscription' });
				}
			} else {
				console.log(`Unhandled event type: ${event.type}`);
			}

			// Return a 200 response to acknowledge receipt of the event
			response.json({ received: true });
		} catch (error) {
			console.error('Error handling webhook event:', error);
			response.status(500).json({ error: 'Internal server error ' + error });
		}
	}
);
