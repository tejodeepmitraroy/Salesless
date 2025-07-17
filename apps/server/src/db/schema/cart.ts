import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { store } from './store';
import { product } from './product';
import { relations } from 'drizzle-orm';
import { order } from './order';
import { customer } from './customer';

export const cart = pgTable('cart', {
	id: serial('id').primaryKey(),
	storeId: integer('store_id').references(() => store.id),
	customerId: integer('customer_id').references(() => customer.id),
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
	orders: many(order),
}));

export const cartItems = pgTable('cart_items', {
	id: serial('id').primaryKey(),
	cartId: integer('cart_id').references(() => cart.id),
	productId: integer('product_id').references(() => product.id),
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
