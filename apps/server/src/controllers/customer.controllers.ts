import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import { db } from '../db';
import { eq, InferSelectModel } from 'drizzle-orm';
import ApiResponse from '../utils/ApiResponse';
import { passwordHashed } from '../helper/hasher';
import { customer, customerStore, user } from '../db/schema';
import {
	generateResetPasswordToken,
	verifyResetPasswordJwtToken,
} from '../helper/token';
import { forgotPasswordEmail } from '../helper/sendEmail';

export const registerCustomer = asyncHandler(
	async (request: Request, response: Response) => {
		const { storeId, firstName, lastName, email, password } = request.body;

		console.log(request.body);

		try {
			const existedUser = await db.query.customer.findFirst({
				where: eq(customer.email, email),
			});
			if (existedUser) {
				response.status(200).json(new ApiError(409, 'User already exists'));
			} else {
				const hashedPassword = await passwordHashed(password);
				const createdCustomer = await db
					.insert(customer)
					.values({
						firstName,
						lastName,
						email,
						password: hashedPassword,
					})
					.returning();
				console.log('Existed Not User', createdCustomer);

				const registerStore = await db.insert(customerStore).values({
					customerId: createdCustomer[0].id,
					storeId: storeId,
				});

				console.log('Register Store', registerStore);
				console.log('Register User', createdCustomer);
				response
					.status(200)
					.json(new ApiResponse(200, createdCustomer[0], 'New User Created'));
			}
		} catch (error) {
			console.log(error);
			response.status(500).json(new ApiError(500, 'Error Happens', error));
		}
	}
);

export const customerProfile = asyncHandler(
	async (request: Request, response: Response) => {
		const authUser = request.user as InferSelectModel<typeof user>;

		try {
			const userprofile = await db.query.user.findFirst({
				where: eq(user.id, authUser.id),
				columns: {
					password: false,
					refreshToken: false,
				},
			});

			response
				.status(200)
				.json(new ApiResponse(200, userprofile, 'Fetch User Details'));
		} catch (error) {
			response.status(400).json(new ApiError(400, 'Error Happened', error));
		}
	}
);

export const updateCustomerProfile = asyncHandler(
	async (request: Request, response: Response) => {
		const authUser = request.user as InferSelectModel<typeof user>;

		const { firstName, lastName, email, password, avatar, gender, age, phone } =
			request.body;

		try {
			const userProfile = await db
				.update(user)
				.set({
					firstName,
					lastName,
					email,
					password,
					avatar,
					gender,
					age,
					phone,
				})
				.where(eq(user.id, authUser.id))
				.returning();

			response
				.status(200)
				.json(new ApiResponse(200, userProfile[0], 'Profile is Updated'));
		} catch (error) {
			response.status(400).json(new ApiError(400, 'Error Happened', error));
		}
	}
);

export const deleteCustomerProfile = asyncHandler(
	async (request: Request, response: Response) => {
		const authUser = request.user as InferSelectModel<typeof user>;

		try {
			await db.delete(user).where(eq(user.id, authUser.id));
			response
				.status(200)
				.json(new ApiResponse(200, user, 'Profile is Updated'));
		} catch (error) {
			response.status(400).json(new ApiError(400, 'Error Happened', error));
		}
	}
);

// Users settings
export const getCustomerSettings = asyncHandler(
	async (request: Request, response: Response) => {
		const authUser = request.user as InferSelectModel<typeof user>;

		try {
			const userSettings = await db.query.user.findFirst({
				where: eq(user.id, authUser.id),
			});

			response.json(
				new ApiResponse(200, userSettings, 'User Account Settings fetched')
			);
		} catch (error) {
			response.status(400).json(new ApiError(400, 'Error Happened', error));
		}
	}
);
export const updateCustomerSettings = asyncHandler(
	async (request: Request, response: Response) => {
		const authUser = request.user as InferSelectModel<typeof user>;

		const { email, password, avatar, gender, age, phone } = request.body;

		try {
			const userSettings = await db
				.update(user)
				.set({
					email,
					password,
					avatar,
					gender,
					age,
					phone,
				})
				.where(eq(user.id, authUser.id))
				.returning();

			response.json(
				new ApiResponse(200, userSettings[0], 'Update User Settings')
			);
		} catch (error) {
			response.status(400).json(new ApiError(400, 'Error Happened', error));
		}
	}
);

// Users notifications
export const getCustomerNotification = asyncHandler(
	async (request: Request, response: Response) => {
		const authUser = request.user as InferSelectModel<typeof user>;

		const { email, password, avatar, gender, age, phone } = request.body;

		try {
			const userSettings = await db
				.update(user)
				.set({
					email,
					password,
					avatar,
					gender,
					age,
					phone,
				})
				.where(eq(user.id, authUser.id))
				.returning();

			response.json(
				new ApiResponse(200, userSettings[0], 'Update User Settings')
			);
		} catch (error) {
			response.status(400).json(new ApiError(400, 'Error Happened', error));
		}
	}
);

// //Forget Password
export const forgetPassword = asyncHandler(
	async (request: Request, response: Response) => {
		const { email } = request.body;

		if (!email) {
			response.status(400).json({ error: 'Please Enter field' });
		}

		try {
			const userProfile = await db.query.user.findFirst({
				where: eq(user.email, email),
			});

			if (!userProfile) {
				response.status(400).json({ error: 'Email is not registered' });
			} else {
				// console.log("User Profile", userProfile);
				const token = generateResetPasswordToken(userProfile.id);
				console.log('Token', token);

				const emailInfo = await forgotPasswordEmail({
					receiverEmail: email,
					userFirstName: userProfile.firstName,
					token,
				});

				response
					.status(200)
					.json(new ApiResponse(200, emailInfo, 'New Password Updated'));
			}
		} catch (error) {
			response.status(400).json(new ApiError(400, 'error Happens', error));
		}
	}
);

// //Reset Password Link
export const resetLink = asyncHandler(
	async (request: Request, response: Response) => {
		const { token, confirmPassword, newPassword } = request.body;

		if (confirmPassword !== newPassword && !token) {
			response.status(400).json({
				error: 'Confirm and New password is not matched or token is getting.',
			});
		}

		if (typeof newPassword === 'string') {
			const { id } = (await verifyResetPasswordJwtToken(token)) as {
				id: string;
			};

			try {
				const userProfile = await db
					.update(user)
					.set({
						password: await passwordHashed(newPassword),
					})
					.where(eq(user.id, parseInt(id)))
					.returning();

				response
					.status(200)
					.json(new ApiResponse(200, userProfile[0], 'New Password Updated'));
			} catch (error) {
				console.log(error);
				response
					.status(400)
					.json(new ApiError(400, 'Password not Updated', error));
			}
		} else {
			response
				.status(400)
				.json(new ApiError(400, 'Please give only string value'));
		}
	}
);
