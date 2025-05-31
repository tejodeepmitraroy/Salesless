import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { store } from './store';
import { customer } from './user';
import { productVariant } from './product';
import { relations } from 'drizzle-orm';
import { order } from './order';

export const cart = pgTable('cart', {
	id: serial('id').primaryKey(),
	store_id: integer('store_id').references(() => store.id),
	customer_id: integer('customer_id').references(() => customer.id),
	created_at: timestamp('created_at'),
	updated_at: timestamp('updated_at'),
});

export const cartRelations = relations(cart, ({ one, many }) => ({
	store: one(store, {
		fields: [cart.store_id],
		references: [store.id],
	}),
	customer: one(customer, {
		fields: [cart.customer_id],
		references: [customer.id],
	}),
	items: many(cartItems),
	orders: many(order),
}));

export const cartItems = pgTable('cart_items', {
	id: serial('id').primaryKey(),
	cart_id: integer('cart_id').references(() => cart.id),
	productVariantId: integer('product_variant_id').references(
		() => productVariant.id
	),
	quantity: integer('quantity'),
	created_at: timestamp('created_at'),
	updated_at: timestamp('updated_at'),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
	cart: one(cart, {
		fields: [cartItems.cart_id],
		references: [cart.id],
	}),
	productVariant: one(productVariant, {
		fields: [cartItems.productVariantId],
		references: [productVariant.id],
	}),
}));
