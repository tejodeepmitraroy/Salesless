import { z } from 'zod';

export const productImageSchema = z.object({
	id: z.string(),
	url: z.string().url(),
	name: z.string(),
	isFeatured: z.boolean().default(false),
});

export const productVariantSchema = z.object({
	id: z.string(),
	attributes: z.record(z.string()),
	price: z.number().optional(),
	stock: z.number().optional(),
	sku: z.string().optional(),
});

export const productSchema = z.object({
	name: z.string().min(2).max(50),
	category: z.string().min(2).max(50),
	vendor: z.string().min(2).max(50),
	price: z.string(),
	stock: z.string(),
	description: z.string().optional(),
	images: z.array(productImageSchema).optional().default([]),
	variants: z.array(productVariantSchema).optional().default([]),
	seoTitle: z.string().optional(),
	seoDescription: z.string().optional(),
	seoKeywords: z.string().optional(),
	seoScore: z.number().optional(),
	id: z.number().optional(),
	status: z.string().optional(),
});

export type ProductImage = z.infer<typeof productImageSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
