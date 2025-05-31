import { z } from 'zod';

export const createStoreSchema = z.object({
	storeName: z
		.string()
		.min(1, 'Store name is required')
		.min(3, 'Store name must be at least 3 characters')
		.max(50, 'Store name must be less than 50 characters'),
	storeDescription: z.string().optional(),
	storeType: z.string().optional(),
});
