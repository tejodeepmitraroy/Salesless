import { Request, Response } from 'express';
import { db } from '../db';

import { eq, InferSelectModel } from 'drizzle-orm';
import asyncHandler from '../utils/asyncHandler';
import { store, user, userStore } from '../db/schema';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';

export const createStore = asyncHandler(
	async (request: Request, response: Response) => {
		const authUser = request.user as InferSelectModel<typeof user>;

		const { name, description, country, address, phone, timezone } =
			request.body;
		try {
			const storeExists = await db
				.select()
				.from(store)
				.where(eq(store.name, name));

			if (storeExists.length > 0) {
				response.status(400).json(new ApiError(400, 'Store already exists'));
			}
			const newStore = await db
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
				storeId: newStore[0].id,
				userId: authUser.id,
				roleId: 1,
			});

			response
				.status(201)
				.json(new ApiResponse(200, newStore[0], 'Store created successfully'));
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
				where: eq(store.id, parseInt(request.params.id)),
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
				where: eq(store.id, parseInt(request.params.id)),
			});

			if (!getStore) {
				response.status(200).json(new ApiError(400, 'Store not found'));
			}

			await db
				.delete(userStore)
				.where(eq(userStore.storeId, parseInt(request.params.id)))
				.execute();

			await db
				.delete(store)
				.where(eq(store.id, parseInt(request.params.id)))
				.execute();

			response
				.status(200)
				.json(new ApiResponse(200, {}, 'Store deleted successfully'));
		} catch (error) {
			// console.log(error);
			response.status(500).json({ message: 'Error deleting store', error });
		}
	}
);

export const getStoreSettings = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			const storeSettings = await db.query.store.findFirst({
				where: eq(store.id, parseInt(request.params.id)),
			});

			if (!storeSettings) {
				response.status(404).json(new ApiError(404, 'Store not found'));
			}
			response
				.status(200)
				.json(
					new ApiResponse(
						200,
						storeSettings,
						'Store settings fetched successfully'
					)
				);
		} catch (error) {
			response
				.status(500)
				.json(new ApiError(500, 'Error updating store settings', error));
		}
	}
);

// export const updateStoreSettings = async (
// 	req: Request<{ id: string }, {}, Partial<StoreSettings>>,
// 	res: Response
// ): Promise<void> => {
// 	try {
// 		const store = await db
// 			.update(stores)
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
