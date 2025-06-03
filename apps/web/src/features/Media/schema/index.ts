import { z } from 'zod';

export const productImageSchema = z.object({
	id: z.string(),
	url: z.string().url(),
	name: z.string(),
	isFeatured: z.boolean(),
});

export const productVariantSchema = z.object({
	id: z.string(),
	attributes: z.record(z.string()),
	price: z.number().optional(),
	stock: z.number().optional(),
	sku: z.string().optional(),
});

export const productFormSchema = z.object({
	id: z.number().optional(),
	storeId: z.number(),
	title: z.string().min(2).max(50),
	description: z.string().optional(),
	price: z.number(),
	comparedAtPrice: z.number(),
	status: z.string(),
	images: z.array(productImageSchema).optional(),
	categoryId: z.string(),
	stockQuantity: z.number(),
	variants: z.array(productVariantSchema).optional(),
	seoTitle: z.string().optional(),
	seoDescription: z.string().optional(),
	seoKeywords: z.string().optional(),
	seoScore: z.number().optional(),
});

export type ProductImage = z.infer<typeof productImageSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
