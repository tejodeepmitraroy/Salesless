import { Request, Response } from 'express';
import { db } from '../db';
import { product } from '../db/schema';
import { eq } from 'drizzle-orm';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';

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
			});
			response
				.status(201)
				.json(new ApiResponse(200, products, 'Products fetched successfully'));
		} catch (error) {
			response.status(500).json(new ApiError(500, 'Error Happens', error));
		}
	}
);

// Get single product by ID
export const getProductById = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			const productId = parseInt(request.params.id);
			const productDetails = await db.query.product.findFirst({
				where: eq(product.id, productId),
				with:{
					productVariant: true,
				}
			});
			if (!productDetails) {
				response.status(404).json(new ApiError(404, 'Product not found'));
			}
			response
				.status(200)
				.json(
					new ApiResponse(200, productDetails, 'Product fetched successfully')
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
		const { storeId, title, description, price, product_type, stock_quantity } =
			request.body;
		try {
			const [result] = await db
				.insert(product)
				.values({
					storeId,
					title,
					description,
					price,
					product_type,
					stock_quantity,
				})
				.returning();
			response
				.status(201)
				.json(new ApiResponse(200, result, 'Product created successfully'));
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
		try {
			const productId = parseInt(request.params.id);
			const [result] = await db
				.update(product)
				.set({
					storeId: request.body.storeId,
					title: request.body.title,
					description: request.body.description,
					price: request.body.price,
					product_type: request.body.product_type,
					stock_quantity: request.body.stock_quantity,
				})
				.where(eq(product.id, productId))
				.returning();

			if (!result) {
				response.status(404).json({ message: 'Product not found' });
			}
			response.json(result);
		} catch (error) {
			response.status(400).json({ message: 'Error updating product', error });
		}
	}
);

// Delete product
export const deleteProduct = asyncHandler(
	async (req: Request, res: Response) => {
		try {
			const productId = parseInt(req.params.id);
			const [result] = await db
				.delete(product)
				.where(eq(product.id, productId))
				.returning();

			if (!result) {
				res.status(404).json({ message: 'Product not found' });
			}
			res.json({ message: 'Product deleted successfully' });
		} catch (error) {
			res.status(500).json({ message: 'Error deleting product', error });
		}
	}
);
