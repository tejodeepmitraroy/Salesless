import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { store } from './store';
import { product } from './product';
import { relations } from 'drizzle-orm';

import { customer } from './customer';
import { ulid } from 'ulid';

export const cart = pgTable('cart', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	storeId: varchar('store_id').references(() => store.id),
	customerId: varchar('customer_id').references(() => customer.id),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const cartRelations = relations(cart, ({ one, many }) => ({
	store: one(store, {
		fields: [cart.storeId],
		references: [store.id],
	}),
	customer: one(customer, {
		fields: [cart.customerId],
		references: [customer.id],
	}),
	items: many(cartItems),
}));

export const cartItems = pgTable('cart_items', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	cartId: varchar('cart_id').references(() => cart.id),
	productId: varchar('product_id').references(() => product.id),
	quantity: integer('quantity'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
	cart: one(cart, {
		fields: [cartItems.cartId],
		references: [cart.id],
	}),
	product: one(product, {
		fields: [cartItems.productId],
		references: [product.id],
	}),
}));
