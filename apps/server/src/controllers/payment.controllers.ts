import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';

import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import { razorpayCard, RazorPayGateway } from '../gateways/RazorpayGateway';
import { db } from '../db';
import { GatewayConfigs } from '../db/schema';
import { eq } from 'drizzle-orm';

export const initiatePayment = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			// const { storeId, amount, currency, orderId, customerId } = request.body;

			const storeConfigs = await db.query.GatewayConfigs.findFirst({
				where: eq(GatewayConfigs.id, '01K14AN7VFYYKNYE8K8CCT6BVP'),
			});

			const razorpayApiKey = storeConfigs?.apiKey;
			const razorpayApiSecret = storeConfigs?.apiSecret;

			if (!razorpayApiKey || !razorpayApiSecret) {
				response.status(404).json(new ApiError(404, 'Store not found'));
			}

			const razorpay = new RazorPayGateway(razorpayApiKey!, razorpayApiSecret!);

			const paymentResponse = await razorpay.createPayment({
				amount: 1000,
				currency: 'INR',
				orderId: 'order_123456789',
				customerId: 'customer_123456789',
				storeId: 'store_123456789',
			});

			console.log('paymentResponse', paymentResponse, razorpayCard);

			response.status(200).send(
				razorpayCard({
					apiKey: razorpayApiKey!,
					amount: 1000 * 100,
					orderId: paymentResponse.transactionId!,
				})
			);
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiError(500, 'Error fetching product', error));
		}
	}
);

export const verifyPayment = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			const razorpayApiKey = process.env.RAZORPAY_API_KEY!;
			const razorpayApiSecret = process.env.RAZORPAY_API_SECRET!;

			const { verifyWebhook } = new RazorPayGateway(
				razorpayApiKey,
				razorpayApiSecret
			);

			if (!verifyWebhook(request)) {
				response.status(400).json(new ApiError(400, 'Invalid webhook'));
			}

			response
				.status(200)
				.json(new ApiResponse(200, {}, 'Payment Succesful successfully'));
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiError(500, 'Error fetching product', error));
		}
	}
);

///Gateways
export const setupPaymentGateway = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			const {
				gateway,
				apiKey,
				apiSecret,
				apiUrl,
				mode,
				active,
			}: {
				gateway: string;
				apiKey: string;
				apiSecret: string;
				apiUrl: string;
				mode: string;
				active: boolean;
			} = request.body;
			const storeId = request.storeId!;

			if (gateway.toLowerCase() === 'razorpay') {
				const [configs] = await db
					.insert(GatewayConfigs)
					.values({
						storeId: storeId,
						gateway: 'razorpay',
						apiKey: apiKey,
						apiSecret: apiSecret,
						apiUrl: apiUrl,
						mode: mode === 'test' ? 'test' : 'live',
						active: active,
					})
					.returning();

				response
					.status(201)
					.json(
						new ApiResponse(
							200,
							configs,
							'Razorpay Payment Gateway Configured successfully'
						)
					);
			} else if (gateway.toLowerCase() === 'stripe') {
				const [configs] = await db
					.insert(GatewayConfigs)
					.values({
						storeId: storeId,
						gateway: 'stripe',
						apiKey: apiKey,
						apiSecret: apiSecret,
						mode: mode === 'test' ? 'test' : 'live',
						active: active,
					})
					.returning();

				response
					.status(201)
					.json(
						new ApiResponse(
							200,
							configs,
							'Stripe Payment Gateway Configured successfully'
						)
					);
			} else if (gateway.toLowerCase() === 'phonepe') {
				const [configs] = await db
					.insert(GatewayConfigs)
					.values({
						storeId: storeId,
						gateway: 'phonepe',
						apiKey: apiKey,
						apiSecret: apiSecret,
						mode: mode === 'test' ? 'test' : 'live',
						active: active,
					})
					.returning();

				response
					.status(201)
					.json(
						new ApiResponse(
							200,
							configs,
							'PhonePe Payment Gateway Configured successfully'
						)
					);
			} else if (gateway.toLowerCase() === 'paytm') {
				const [configs] = await db
					.insert(GatewayConfigs)
					.values({
						storeId: storeId,
						gateway: 'paytm',
						apiKey: apiKey,
						apiSecret: apiSecret,
						mode: mode === 'test' ? 'test' : 'live',
						active: active,
					})
					.returning();

				response
					.status(201)
					.json(
						new ApiResponse(
							200,
							configs,
							'Paytm Payment Gateway Configured successfully'
						)
					);
			}
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiError(500, 'Error fetching product', error));
		}
	}
);

export const getAllInstalledGateways = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			const storeId = request.storeId!;

			const gatewayType = request.params.gateway as string;

			if (gatewayType) {
				const gateway = await db.query.GatewayConfigs.findFirst({
					where: eq(
						GatewayConfigs.gateway,
						gatewayType as 'stripe' | 'razorpay' | 'phonepe' | 'paytm'
					),
				});

				if (!gateway) {
					response.status(404).json(new ApiError(404, 'Gateway not found'));
				}
				response
					.status(201)
					.json(
						new ApiResponse(
							200,
							gateway,
							'Fetched installed gateway Details successfully'
						)
					);
			} else {
				const allGateways = await db.query.GatewayConfigs.findMany({
					where: eq(GatewayConfigs.storeId, storeId),
				});

				if (!allGateways) {
					response.status(404).json(new ApiError(404, 'Gateways not found'));
				}

				response
					.status(201)
					.json(
						new ApiResponse(
							200,
							allGateways,
							'Fetched all installed gateways successfully'
						)
					);
			}
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiError(500, 'Error fetching product', error));
		}
	}
);

export const updatePaymentGateway = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			const {
				id,
				gateway,
				apiKey,
				apiSecret,
				apiUrl,
				mode,
				active,
			}: {
				id: string;
				gateway: string;
				apiKey: string;
				apiSecret: string;
				apiUrl: string;
				mode: string;
				active: boolean;
			} = request.body;
			const storeId = request.storeId!;

			if (gateway.toLowerCase() === 'razorpay') {
				const [configs] = await db
					.update(GatewayConfigs)
					.set({
						apiKey: apiKey,
						apiSecret: apiSecret,
						apiUrl: apiUrl,
						mode: mode === 'test' ? 'test' : 'live',
						active: active,
					})
					.where(
						eq(GatewayConfigs.storeId, storeId && eq(GatewayConfigs.id, id))
					)
					.returning();

				response
					.status(201)
					.json(
						new ApiResponse(
							200,
							configs,
							'Razorpay Payment Gateway Configured successfully'
						)
					);
			} else if (gateway.toLowerCase() === 'stripe') {
				const [configs] = await db
					.update(GatewayConfigs)
					.set({
						apiKey: apiKey,
						apiSecret: apiSecret,
						mode: mode === 'test' ? 'test' : 'live',
						active: active,
					})
					.where(
						eq(GatewayConfigs.storeId, storeId && eq(GatewayConfigs.id, id))
					)
					.returning();

				response
					.status(201)
					.json(
						new ApiResponse(
							200,
							configs,
							'Stripe Payment Gateway Configured successfully'
						)
					);
			} else if (gateway.toLowerCase() === 'phonepe') {
				const [configs] = await db
					.update(GatewayConfigs)
					.set({
						apiKey: apiKey,
						apiSecret: apiSecret,
						mode: mode === 'test' ? 'test' : 'live',
						active: active,
					})
					.where(
						eq(GatewayConfigs.storeId, storeId && eq(GatewayConfigs.id, id))
					)
					.returning();

				response
					.status(201)
					.json(
						new ApiResponse(
							200,
							configs,
							'PhonePe Payment Gateway Configured successfully'
						)
					);
			} else if (gateway.toLowerCase() === 'paytm') {
				const [configs] = await db
					.update(GatewayConfigs)
					.set({
						apiKey: apiKey,
						apiSecret: apiSecret,
						mode: mode === 'test' ? 'test' : 'live',
						active: active,
					})
					.where(
						eq(GatewayConfigs.storeId, storeId && eq(GatewayConfigs.id, id))
					)
					.returning();

				response
					.status(201)
					.json(
						new ApiResponse(
							200,
							configs,
							'Paytm Payment Gateway Configured successfully'
						)
					);
			}
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiError(500, 'Error fetching product', error));
		}
	}
);
