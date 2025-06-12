import { Request, Response } from 'express';
import { db } from '../db';
import { product } from '../db/schema';
import { eq } from 'drizzle-orm';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';
import {
	productMedia,
	productOptions,
	productOptionsValues,
	productVariant,
} from '../db/schema/product';

// Get all products
export const getAllProducts = asyncHandler(
	async (request: Request, response: Response) => {
		const storeId = request.query.storeId as string;

		if (!storeId) {
			response.status(400).json(new ApiError(400, 'storeId is required'));
		}
		try {
			const products = await db.query.product.findMany({
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
				},
			});
			if (!products) {
				response.status(404).json(new ApiError(404, 'Products not found'));
			}

			const simplifiedProducts = products.map((product) => ({
				...product,
				media: product.media.map((m) => ({
					index: m.index,
					mediaId: m.media.id,
					...m.media,
				})), // Extract only media objects
			}));

			console.log(simplifiedProducts);

			response
				.status(201)
				.json(
					new ApiResponse(
						200,
						simplifiedProducts,
						'Products fetched successfully'
					)
				);
		} catch (error) {
			response.status(500).json(new ApiError(500, 'Error Happens', error));
		}
	}
);

// Get single product by ID
export const getProductById = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			const productId = parseInt(request.params.productId);
			const productDetails = await db.query.product.findFirst({
				where: eq(product.id, productId),
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
				},
			});

			if (!productDetails) {
				response.status(404).json(new ApiError(404, 'Product not found'));
			}

			const media = await db.query.productMedia.findMany({
				where: eq(productMedia.productId, productId),
			});

			console.log(media);
			if (!productDetails) {
				response.status(404).json(new ApiError(404, 'Product not found'));
			}
			const simplifiedProduct = {
				...productDetails,
				media: productDetails?.media?.map((m) => ({
					index: m.index,
					mediaId: m.media.id,
					...m.media,
				})), // Extract only media objects
			};
			response.status(200).json(
				new ApiResponse(
					200,
					simplifiedProduct,

					'Product fetched successfully'
				)
			);
		} catch (error) {
			response
				.status(500)
				.json(new ApiError(500, 'Error fetching product', error));
		}
	}
);

// Create new product
export const createProduct = asyncHandler(
	async (request: Request, response: Response) => {
		const {
			storeId,
			title,
			description,
			status,
			isVariantEnabled,
			categoryId,
			media,
			seoTitle,
			seoDescription,
			seoKeywords,
			options,
			variants,
		}: {
			storeId: number;
			title: string;
			description: string;
			status: string;
			categoryId: number;
			isVariantEnabled: boolean;
			media: { mediaId: number }[];
			seoTitle: string;
			seoDescription: string;
			seoKeywords: string;
			options: {
				name: string;
				position: number;
				values: {
					value: string;
					position: number;
				}[];
			}[];
			variants: {
				sku: string;
				barcode: string;
				price: string;
				comparedAtPrice: string;
				manageInventory: boolean;
				inventoryQuantity: number;
				weight: number;
				weightUnit: 'kg' | 'g' | 'oz' | 'lb';
				requiredShipping: boolean;
				option1: string | null;
				option2: string | null;
				option3: string | null;
				costPrice: string;
			}[];
			singleVariant: {
				sku: string;
				barcode: string;
				price: string;
				comparedAtPrice: string;
				manageInventory: boolean;
				inventoryQuantity: number;
				weight: number;
				weightUnit: 'kg' | 'g' | 'oz' | 'lb';
				requiredShipping: boolean;
				option1: string | null;
				option2: string | null;
				option3: string | null;
				costPrice: string;
			};
		} = request.body;
		try {
			db.transaction(async (trx) => {
				const [productResult] = await trx
					.insert(product)
					.values({
						storeId,
						categoryId,
						title,
						description,
						status: status.toLowerCase() === 'active' ? 'active' : 'draft',
						isVariantEnabled,
						seoTitle,
						seoDescription,
						seoKeywords,
					})
					.returning();

				const productId = productResult.id;

				if (media.length > 0) {
					await trx.insert(productMedia).values(
						media.map((media, index) => {
							return {
								index: index,
								productId,
								mediaId: media.mediaId,
							};
						})
					);
				}

				const mediaResult = await trx.query.productMedia.findMany({
					where: eq(productMedia.productId, productId),
					with: {
						media: true,
					},
					columns: {
						index: false,
						productId: false,
						mediaId: false,
					},
				});

				const mediaData = mediaResult.map((media) => ({
					id: media.media.id,
					storeId: media.media.storeId,
					fileName: media.media.fileName,
					url: media.media.url,
					key: media.media.key,
					size: media.media.size,
					createdAt: media.media.createdAt,
					lastModified: media.media.lastModified,
				}));

				if (!isVariantEnabled) {
					const variantResult = await trx
						.insert(productVariant)
						.values(
							variants.map((variant) => {
								return {
									productId: productId,
									sku: variant.sku,
									barcode: variant.barcode,
									price: variant.price,
									comparedAtPrice: variant.comparedAtPrice,
									costPrice: variant.costPrice,
									manageInventory: variant.manageInventory,
									inventoryQuantity: variant.inventoryQuantity,
									requiredShipping: variant.requiredShipping,
									option1: null,
									option2: null,
									option3: null,
								};
							})
						)
						.returning();

					response.status(201).json(
						new ApiResponse(
							200,
							{
								...productResult,
								media: mediaData,
								variant: variantResult,
							},
							'Product created successfully'
						)
					);
				} else {
					// 🔴 Insert options
					const optionsResult = await trx
						.insert(productOptions)
						.values(
							options.map((option) => {
								return {
									productId: productId,
									name: option.name,
									position: option.position,
								};
							})
						)
						.returning();

					console.log('Options Result--->', optionsResult);
					const flatOptions = optionsResult.flat();

					// 🔴 Insert option values
					await Promise.all(
						options.flatMap((option, i) => {
							const optionId = flatOptions[i].id;
							return option.values.map((value) =>
								trx.insert(productOptionsValues).values({
									optionId,
									value: value.value,
									position: value.position,
								})
							);
						})
					);

					const variantResult = await trx
						.insert(productVariant)
						.values(
							variants.map((variant) => {
								return {
									productId: productId,
									sku: variant.sku,
									barcode: variant.barcode,
									price: variant.price,
									comparedAtPrice: variant.comparedAtPrice,
									manageInventory: variant.manageInventory,
									inventoryQuantity: variant.inventoryQuantity,
									requiredShipping: variant.requiredShipping,
									option1: variant.option1 ?? null,
									option2: variant.option2 ?? null,
									option3: variant.option3 ?? null,
								};
							})
						)
						.returning();
					response.status(201).json(
						new ApiResponse(
							200,
							{
								...productResult,
								media: mediaData,
								variant: variantResult,
								options: optionsResult,
							},
							'Product created successfully'
						)
					);
				}
			});
		} catch (error) {
			response
				.status(400)
				.json(new ApiError(400, 'Error creating product', error));
		}
	}
);

// Update product
export const updateProduct = asyncHandler(
	async (request: Request, response: Response) => {
		const {
			storeId,
			title,
			description,
			category,
			price,
			comparedAtPrice,
			stockQuantity,
			status,
			media,
			seoTitle,
			seoDescription,
			seoKeywords,
		} = request.body;
		try {
			const productId = parseInt(request.params.productId);
			console.log('productId', productId, media);

			const productDetails = await db.query.product.findFirst({
				where: eq(product.id, productId),
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
				},
			});
			if (!productDetails) {
				response.status(404).json(new ApiError(404, 'Product not found'));
			}
			const simplifiedProduct = {
				...productDetails,
				media: productDetails?.media?.map((m) => ({
					index: m.index,
					mediaId: m.media.id,
					...m.media,
				})), // Extract only media objects
			};

			const updateProductData = {
				storeId,
				title,
				description,
				category,
				price,
				comparedAtPrice,
				stockQuantity,
				status,
				seoTitle,
				seoDescription,
				seoKeywords,
				media,
			};

			if (!simplifiedProduct) {
				response.status(404).json(new ApiError(404, 'Product not found'));
			}

			if (
				JSON.stringify(simplifiedProduct) === JSON.stringify(updateProductData)
			) {
				response
					.status(404)
					.json(new ApiError(404, 'Product no need to update'));
			} else {
				await db.transaction(async (trx) => {
					const [result] = await trx
						.update(product)
						.set({
							storeId,
							title,
							description,
							status,
							seoTitle,
							seoDescription,
							seoKeywords,
						})
						.where(eq(product.id, productId))
						.returning();

					if (!result) {
						response.status(404).json({ message: 'Product not found' });
					}

					// const mediaData = [];

					await trx
						.delete(productMedia)
						.where(eq(productMedia.productId, productId));

					for (const { index, mediaId } of media) {
						await trx
							.insert(productMedia)
							.values({ index, mediaId, productId })
							.returning()
							.then((result) => {
								console.log('mediaId===>', result);
								// mediaData.push(...result);
							});
					}

					// console.log('mediaData===>', mediaData);

					response.json(
						new ApiResponse(
							200,

							{ ...result },
							'Product updated successfully'
						)
					);
				});
			}
		} catch (error) {
			console.log(error);
			response.status(400).json({ message: 'Error updating product', error });
		}
	}
);

// Delete product
export const deleteProduct = asyncHandler(
	async (req: Request, res: Response) => {
		try {
			const productId = parseInt(req.params.productId);

			db.transaction(async (trx) => {
				await trx
					.delete(productMedia)
					.where(eq(productMedia.productId, productId));

				const [result] = await trx
					.delete(product)
					.where(eq(product.id, productId))
					.returning();

				if (!result) {
					res.status(404).json(new ApiError(404, 'Product not found'));
				}
				res
					.status(200)
					.json(new ApiResponse(200, result, 'Product deleted successfully'));
			});
		} catch (error) {
			res.status(500).json(new ApiError(500, 'Error deleting product', error));
		}
	}
);
