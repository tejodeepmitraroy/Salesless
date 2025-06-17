import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { db } from '../db';
import { product } from '../db/schema';
import { eq } from 'drizzle-orm';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

export const getInventory = asyncHandler(
	async (request: Request, response: Response) => {
		const storeId = request.query.storeId as string;
		if (!storeId) {
			response.status(400).json(new ApiError(400, 'storeId is required'));
		}
		try {
			const productData = await db.query.product.findMany({
				where: eq(product.storeId, parseInt(storeId)),
				with: {
					media: {
						with: {
							media: true,
						},
						columns: {
							productId: false,
							mediaId: false,
						},
					},
					category: true,
					variant: true,
				},
			});

			const inventory = await productData.map((product, index) => {
				const variant = product.variant;
				const media = product.media[0].media;
				const category = product.category;
				const isVariantEnabled = product.isVariantEnabled;

				if (isVariantEnabled) {
					variant.map((variant) => {
						return {
							id: index,
							productId: variant.productId,
							productName: product.title,
							media: media.url,
							sku: variant.sku,
							category: category?.name,
							inStock: variant.inventoryQuantity,
							// reorderPoint: variant.reorderPoint,
							// onOrder: variant.onOrder,
							lastUpdated: variant.updatedAt,
							price: variant.price,
							comparedAtPrice: variant.comparedAtPrice,
						};
					});
				} else {
					return {
						id: index,
						productId: product.id,
						productName: product.title,
						media: media.url,
						sku: product.variant[0].sku,
						category: category?.name,
						inStock: product.variant[0].inventoryQuantity,
						lastUpdated: product.updatedAt,
						price: product.variant[0].price,
						comparedAtPrice: product.variant[0].comparedAtPrice,
					};
				}
			});

			// const InventoryData = [
			// 	{
			// 		id: 1,
			// 		productId: productData[0].id,
			// 		productName: productData[0].name,
			// 		sku: 'WEP-101',
			// 		category: 'Electronics',
			// 		inStock: 45,
			// 		reorderPoint: 15,
			// 		onOrder: 0,
			// 		lastUpdated: '2024-06-08',
			// 		status: 'In Stock',
			// 		vendorName: 'TechGadgets Inc.',
			// 		location: 'Warehouse A',
			// 		costPrice: 28.5,
			// 		retailPrice: 59.99,
			// 	},
			// ];
			response
				.status(200)
				.json(new ApiResponse(200, inventory, 'Product fetched successfully'));
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiError(500, 'Error fetching product', error));
		}
	}
);

// const createInventory = asyncHandler(
// 	async (request: Request, response: Response) => {}
// );

// const updateInventory = asyncHandler(
// 	async (request: Request, response: Response) => {}
// );

// const deleteInventory = asyncHandler(
// 	async (request: Request, response: Response) => {}
// );
