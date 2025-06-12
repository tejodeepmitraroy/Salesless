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

// Collection table
export const collection = pgTable('collection', {
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

export const collectionRelations = relations(collection, ({ one, many }) => ({
	store: one(store, {
		fields: [collection.storeId],
		references: [store.id],
	}),
	productToCollection: many(productToCollection),
}));

export const productToCollection = pgTable(
	'product_to_collection',
	{
		productId: integer('product_id')
			.notNull()
			.references(() => product.id),
		collectionId: integer('collection_id')
			.notNull()
			.references(() => collection.id),
	},
	(table) => [primaryKey({ columns: [table.productId, table.collectionId] })]
);

export const productToCollectionRelations = relations(
	productToCollection,
	({ one }) => ({
		product: one(product, {
			fields: [productToCollection.productId],
			references: [product.id],
		}),
		collection: one(collection, {
			fields: [productToCollection.collectionId],
			references: [collection.id],
		}),
	})
);
