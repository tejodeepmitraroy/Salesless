import { Request, Response } from 'express';
import { db } from '../db';

import { eq, InferSelectModel } from 'drizzle-orm';
import asyncHandler from '../utils/asyncHandler';
import { customerStore, order, store, user, userStore } from '../db/schema';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';

export const createStore = asyncHandler(
	async (request: Request, response: Response) => {
		const authUser = request.user as InferSelectModel<typeof user>;

		const { name, description, country, address, phone, timezone } =
			request.body;
		try {
			const storeExists = await db.query.userStore.findMany({
				where: eq(userStore.userId, authUser.id),
				with: {
					store: true,
				},
			});
			const storeName = storeExists.find((store) => store.store.name === name);

			if (storeName) {
				response.status(400).json(new ApiError(400, 'Store already exists'));
			}
			const [newStore] = await db
				.insert(store)
				.values({
					name,
					description,
					country,
					address1: address,
					phone,
					timezone,
				})
				.returning();

			await db.insert(userStore).values({
				storeId: newStore.id,
				userId: authUser.id,
				// roleId: 1,
			});

			response
				.status(201)
				.json(new ApiResponse(200, newStore, 'Store created successfully'));
		} catch (error) {
			response.status(400).json(new ApiError(400, 'Error Happens', error));
		}
	}
);

export const getStores = asyncHandler(
	async (request: Request, response: Response): Promise<void> => {
		const authUser = request.user as InferSelectModel<typeof user>;
		try {
			const userStores = await db.query.userStore.findMany({
				where: eq(userStore.userId, authUser.id),
				with: {
					store: true,
				},
			});

			const allStores = userStores.map((entry) => ({
				...entry.store,
			}));
			response
				.status(200)
				.json(new ApiResponse(200, allStores, 'Fetch all stores'));
		} catch (error) {
			response
				.status(500)
				.json(new ApiError(500, 'Error fetching stores', error));
		}
	}
);

export const getStoreById = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			const getStore = await db.query.store.findFirst({
				where: eq(store.id, request.params.storeId),
			});
			if (!getStore) {
				response.status(200).json(new ApiError(400, 'Store not found'));
			}
			response
				.status(200)
				.json(new ApiResponse(200, getStore, 'Fetch all stores'));
		} catch (error) {
			response
				.status(400)
				.json(new ApiError(400, 'Error fetching store', error));
		}
	}
);

export const updateStore = asyncHandler(
	async (request: Request, response: Response) => {
		const { id, name, description, country, address, phone, timezone } =
			request.body;
		try {
			const updatedStore = await db
				.update(store)
				.set({
					name,
					description,
					country,
					address1: address,
					phone,
					timezone,
				})
				.where(eq(store.id, id))
				.returning();

			if (!updatedStore.length) {
				response.status(404).json(new ApiError(404, 'Store not found'));
			}

			response
				.status(200)
				.json(new ApiResponse(200, updatedStore, 'Store updated successfully'));
		} catch (error) {
			response
				.status(500)
				.json(new ApiError(500, 'Error updating store', error));
		}
	}
);

export const deleteStore = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			const getStore = await db.query.store.findFirst({
				where: eq(store.id, request.params.storeId),
			});

			if (!getStore) {
				response.status(200).json(new ApiError(400, 'Store not found'));
			}

			await db
				.delete(userStore)
				.where(eq(userStore.storeId, request.params.id))
				.execute();

			await db.delete(store).where(eq(store.id, request.params.id)).execute();

			response
				.status(200)
				.json(new ApiResponse(200, {}, 'Store deleted successfully'));
		} catch (error) {
			// console.log(error);
			response.status(500).json({ message: 'Error deleting store', error });
		}
	}
);

// export const updateStoreSettings = async (
// 	req: Request,
// 	res: Response
// ): Promise<void> => {
// 	try {
// 		const storeData = await db
// 			.update(store)
// 			.set({ settings: req.body })
// 			.where(eq(stores.id, parseInt(req.params.id)))
// 			.returning();

// 		if (!store.length) {
// 			return res.status(404).json({ message: 'Store not found' });
// 		}

// 		res.json({
// 			message: 'Store settings updated successfully',
// 			store: store[0],
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: 'Error updating store settings', error });
// 	}
// };

////Store Orders

export const getStoreOrders = asyncHandler(
	async (request: Request, response: Response) => {
		const storeId = request.storeId!;
		const orderId = request.params.orderId;
		try {
			if (orderId) {
				const storeOrder = await db.query.order.findFirst({
					where: eq(order.storeId, storeId),
				});
				response
					.status(200)
					.json(
						new ApiResponse(200, storeOrder, 'Store order fetched successfully')
					);
			} else {
				const storeOrders = await db.query.order.findMany({
					where: eq(order.storeId, storeId),
				});
				response
					.status(200)
					.json(
						new ApiResponse(
							200,
							storeOrders,
							'Store orders fetched successfully'
						)
					);
			}
		} catch (error) {
			response
				.status(500)
				.json(new ApiError(500, 'Error fetching store orders', error));
		}
	}
);

//Store Customers
export const getStoreCustomers = asyncHandler(
	async (request: Request, response: Response) => {
		const storeId = request.storeId!;
		const customerId = request.params.customerId;

		try {
			if (customerId) {
				const customer = await db.query.customerStore.findFirst({
					where:
						eq(customerStore.storeId, storeId) &&
						eq(customerStore.customerId, customerId),
					with: {
						customer: {
							columns: {
								password: false,
								refreshToken: false,
							},
						},
					},
					columns: {
						customerId: false,
						storeId: false,
						registerAt: false,
					},
				});
				if (!customer) {
					response.status(404).json(new ApiError(404, 'Customer not found'));
				}
				response
					.status(200)
					.json(
						new ApiResponse(
							200,
							customer?.customer,
							'Customer Details fetched successfully'
						)
					);
			} else {
				const customers = await db.query.customerStore.findMany({
					where: eq(customerStore.storeId, storeId),
					with: {
						customer: {
							columns: {
								password: false,
								refreshToken: false,
							},
						},
					},
					columns: {
						customerId: false,
						storeId: false,
						registerAt: false,
					},
				});

				if (!customers) {
					response.status(404).json(new ApiError(404, 'Customers not found'));
				}

				const customerData = customers.map((customer) => ({
					id: customer.customer.id,
					firstName: customer.customer.firstName,
					lastName: customer.customer.lastName,
					email: customer.customer.email,
					phone: customer.customer.phone,
					avatar: customer.customer.avatar,
					orderCount: customer.customer.orderCount,
					totalSpend: customer.customer.totalSpend,
					taxExempt: customer.customer.taxExempt,
					createdAt: customer.customer.createdAt,
					updatedAt: customer.customer.updatedAt,
				}));

				response
					.status(200)
					.json(
						new ApiResponse(
							200,
							customerData,
							'All Customers fetched successfully'
						)
					);
			}
		} catch (error) {
			response
				.status(500)
				.json(new ApiError(500, 'Error updating store settings', error));
		}
	}
);
