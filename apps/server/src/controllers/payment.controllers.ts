import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';

import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import { razorpayCard, RazorPayGateway } from '../gateways/RazorpayGateway';

export const initiatePayment = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			// const { storeId, amount, currency, orderId, customerId } = request.body;

			const razorpayApiKey = process.env.RAZORPAY_API_KEY!;
			const razorpayApiSecret = process.env.RAZORPAY_API_SECRET!;

			const razorpay = new RazorPayGateway(razorpayApiKey, razorpayApiSecret);

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
					apiKey: razorpayApiKey,
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
