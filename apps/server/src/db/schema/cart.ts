import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { store } from './store';
import { productVariant } from './product';
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
	productVariantId: integer('product_variant_id').references(
		() => productVariant.id
	),
	quantity: integer('quantity'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
	cart: one(cart, {
		fields: [cartItems.cartId],
		references: [cart.id],
	}),
	productVariant: one(productVariant, {
		fields: [cartItems.productVariantId],
		references: [productVariant.id],
	}),
}));
