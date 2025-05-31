import {
	integer,
	pgTable,
	primaryKey,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { store } from './store';
import { relations } from 'drizzle-orm';
import { product } from './product';

// Category table
export const category = pgTable('category', {
	id: serial('id').primaryKey(),
	storeId: integer('store_id')
		.notNull()
		.references(() => store.id),
	title: varchar('title'),
	description: varchar('description'),
	slug: varchar('slug'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const categoryRelations = relations(category, ({ one, many }) => ({
	store: one(store, {
		fields: [category.storeId],
		references: [store.id],
	}),
	productToCategory: many(productToCategory),
}));

export const productToCategory = pgTable(
	'product_to_category',
	{
		productId: integer('product_id')
			.notNull()
			.references(() => product.id),
		categoryId: integer('category_id')
			.notNull()
			.references(() => category.id),
	},
	(table) => [primaryKey({ columns: [table.productId, table.categoryId] })]
);

export const productToCategoryRelations = relations(
	productToCategory,
	({ one }) => ({
		product: one(product, {
			fields: [productToCategory.productId],
			references: [product.id],
		}),
		category: one(category, {
			fields: [productToCategory.categoryId],
			references: [category.id],
		}),
	})
);
