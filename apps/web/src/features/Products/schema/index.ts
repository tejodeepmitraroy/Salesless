import { z } from 'zod';

export const productMediaSchema = z.object({
	mediaId: z.string(),
	index: z.number(),
	url: z.string(),
	key: z.string(),
});

export const productVariantSchema = z.object({
	variantId: z.number(),
	sku: z.string().optional(),
	barcode: z.string().optional(),
	price: z.coerce.number().optional(),
	comparedAtPrice: z.coerce.number().optional(),
	costPerItem: z.coerce.number().optional(),
	profit: z.string().optional(),
	margin: z.string().optional(),
	inventoryQuantity: z.coerce.number().optional(),
	weight: z.coerce.number().optional(),
	weightUnit: z.enum(['kg', 'g', 'oz', 'lb']).optional(),
	requiredShipping: z.boolean().optional(),
	option1: z.string().optional().or(z.null()),
	option2: z.string().optional().or(z.null()),
	option3: z.string().optional().or(z.null()),
});

export const productVariantOptionSchema = z.object({
	name: z.string(),
	position: z.number(),
	values: z.array(
		z.object({
			value: z.string(),
			position: z.number(),
		})
	),
});

export const productFormSchema = z.object({
	id: z.number().optional(),
	storeId: z.number(),
	title: z.string().min(2).max(50),
	description: z.string().optional(),
	media: z.array(productMediaSchema).optional(),
	categoryId: z.string(),

	//Pricing
	price: z.coerce.number().optional(),
	comparedAtPrice: z.coerce.number().optional(),
	costPerItem: z.coerce.number().optional(),
	profit: z.string().optional(),
	margin: z.string().optional(),

	//Inventory
	isVariantEnabled: z.boolean(),
	isSkuEnabled: z.boolean().optional(),
	sku: z.string().optional(),
	barcode: z.string().optional(),
	inventoryQuantity: z.coerce.number().optional(),

	//Shipping
	requiredShipping: z.boolean().optional(),
	weight: z.coerce.number().optional(),
	weightUnit: z.enum(['kg', 'g', 'oz', 'lb']).optional(),
	status: z.string(),

	//Multi Variants
	options: z.array(productVariantOptionSchema).optional(),
	variants: z.array(productVariantSchema).optional(),

	//SEO
	seoTitle: z.string().optional(),
	seoDescription: z.string().optional(),
	seoKeywords: z.string().optional(),
	seoScore: z.number().optional().or(z.null()),
});

export type ProductImage = z.infer<typeof productMediaSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type ProductVariantOption = z.infer<typeof productVariantOptionSchema>;
