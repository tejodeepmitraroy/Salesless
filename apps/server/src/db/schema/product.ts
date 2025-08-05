import { relations } from 'drizzle-orm';
import {
	boolean,
	integer,
	numeric,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { store } from './store';
// import { orderItems } from './order';
// import { cartItems } from './cart';
import { media } from './media';
import { productToCollection } from './collection';
import { category } from './category';
import { ulid } from 'ulid';
import { cartItems } from './cart';
import { orderItems } from './order';

export const statusEnum = pgEnum('status', ['active', 'draft', 'archive']);
export const product = pgTable('product', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	storeId: varchar('store_id')
		.notNull()
		.references(() => store.id),
	categoryId: varchar('category_id').references(() => category.id),
	title: varchar('title', { length: 255 }).notNull(),
	description: varchar('description', { length: 255 }),
	status: statusEnum(),
	isVariantEnabled: boolean('is_variant_enable').notNull().default(false),
	seoTitle: varchar('seo_title', { length: 255 }),
	seoDescription: varchar('seo_description', { length: 255 }),
	seoKeywords: varchar('seo_keywords', { length: 255 }),
	seoScore: integer('seo_score'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const productRelations = relations(product, ({ one, many }) => ({
	variant: many(productVariant),
	option: many(productOptions),
	store: one(store, {
		fields: [product.storeId],
		references: [store.id],
	}),
	collection: many(productToCollection),
	category: one(category, {
		fields: [product.categoryId],
		references: [category.id],
	}),
	metadata: one(productMetadata, {
		fields: [product.id],
		references: [productMetadata.productId],
	}),
	media: many(productMedia),
	cartItems: many(cartItems),
	orderItems: many(orderItems),
}));

export const productMedia = pgTable(
	'product_media',
	{
		index: serial('index').notNull(),
		productId: varchar('product_id')
			.notNull()
			.references(() => product.id),
		mediaId: varchar('media_id')
			.notNull()
			.references(() => media.id),
	},
	(table) => [primaryKey({ columns: [table.mediaId, table.productId] })]
);

export const productMediaRelation = relations(productMedia, ({ one }) => ({
	product: one(product, {
		fields: [productMedia.productId],
		references: [product.id],
	}),
	media: one(media, {
		fields: [productMedia.mediaId],
		references: [media.id],
	}),
}));

export const productOptions = pgTable('product_options', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	productId: varchar('product_id')
		.notNull()
		.references(() => product.id),

	name: varchar('name', { length: 255 }).notNull(), // e.g., Color, Size
	position: integer('position').notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const productOptionsRelations = relations(
	productOptions,
	({ one, many }) => ({
		product: one(product, {
			fields: [productOptions.productId],
			references: [product.id],
		}),
		values: many(productOptionsValues),
	})
);

export const productOptionsValues = pgTable('product_options_values', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	optionId: varchar('option_id')
		.notNull()
		.references(() => productOptions.id),
	value: varchar('value', { length: 255 }).notNull(), // Red, Blue, M, L
	position: integer('position').notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const productOptionsValuesRelations = relations(
	productOptionsValues,
	({ one }) => ({
		option: one(productOptions, {
			fields: [productOptionsValues.optionId],
			references: [productOptions.id],
		}),
	})
);

export const productVariant = pgTable('product_variant', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	productId: varchar('product_id')
		.notNull()
		.references(() => product.id),
	sku: varchar('sku'),
	barcode: varchar('barcode'),
	price: numeric('price', { mode: 'number' }),
	comparedAtPrice: numeric('compare_at_price', { mode: 'number' }),
	costPerItem: numeric('cost_per_item', { mode: 'number' }),
	manageInventory: boolean('manage_inventory').notNull().default(true),
	inventoryQuantity: integer('inventory_quantity').notNull().default(0),
	lowStockThreshold: integer('low_stock_threshold').notNull().default(5),
	requiresShipping: boolean('requires_shipping').notNull().default(true),
	inventoryPolicy: varchar('inventory_policy').notNull().default('Deny'),
	weight: numeric('weight', { mode: 'number' }),
	weightUnit: varchar('weight_unit').notNull().default('g'),
	option1: varchar('option1'),
	option2: varchar('option2'),
	option3: varchar('option3'),
	option4: varchar('option4'),
	fulfillmentService: varchar('fulfillment_service')
		.notNull()
		.default('manual'),
	isActive: boolean('is_active').notNull().default(true),
	position: varchar('position'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const productVariantRelations = relations(productVariant, ({ one }) => ({
	product: one(product, {
		fields: [productVariant.productId],
		references: [product.id],
	}),
	// orderItems: many(orderItems),
	// cartItems: many(cartItems),
}));

export const productMetadata = pgTable('product_metadata', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	productId: varchar('product_id')
		.notNull()
		.references(() => product.id)
		.unique(),
	namespace: varchar('namespace', { length: 255 }).notNull(),
	key: integer('key').notNull(),
	value: varchar('value', { length: 255 }),
	type: varchar('type'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const productMetadataRelations = relations(
	productMetadata,
	({ one }) => ({
		product: one(product, {
			fields: [productMetadata.productId],
			references: [product.id],
		}),
	})
);
