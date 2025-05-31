import { relations } from 'drizzle-orm';
import {
	integer,
	numeric,
	pgTable,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { customer } from './user';
import { cart } from './cart';
import { transaction } from './transaction';
import { productVariant } from './product';

export const order = pgTable('order', {
	id: serial('id').primaryKey(),
	customer_id: integer('customer_id').references(() => customer.id),
	cart_id: integer('cart_id').references(() => cart.id),
	contact_id: integer('contact_id'),
	name: varchar('name'),
	shipping_address_phone: varchar('shipping_address_phone'),
	shipping_address_company: varchar('shipping_address_company'),
	shipping_address_name: varchar('shipping_address_name'),
	shipping_address_address1: varchar('shipping_address_address1'),
	shipping_address_address2: varchar('shipping_address_address2'),
	shipping_address_city: varchar('shipping_address_city'),
	shipping_address_province: varchar('shipping_address_province'),
	shipping_address_country: varchar('shipping_address_country'),
	shipping_address_zip: varchar('shipping_address_zip'),
	billing_address_phone: varchar('billing_address_phone'),
	billing_address_company: varchar('billing_address_company'),
	billing_address_name: varchar('billing_address_name'),
	billing_address_address1: varchar('billing_address_address1'),
	billing_address_address2: varchar('billing_address_address2'),
	billing_address_city: varchar('billing_address_city'),
	billing_address_province: varchar('billing_address_province'),
	billing_address_country: varchar('billing_address_country'),
	billing_address_zip: varchar('billing_address_zip'),
	tags: varchar('tags'),
	note: varchar('note'),
	currency: varchar('currency'),
	total_price: numeric('total_price'),
	subtotal_price: numeric('subtotal_price'),
	cancelled_at: timestamp('cancelled_at'),
	token: varchar('token'),
	order_number: integer('order_number'),
	processed_method: varchar('processed_method'),
	additional_price: numeric('additional_price'),
	total_discounts: numeric('total_discounts'),
	total_line_items_price: numeric('total_line_items_price'),
	total_tax: numeric('total_tax'),
	total_tax_recovered: numeric('total_tax_recovered'),
	total_weight: numeric('total_weight'),
	current_total_discounts: numeric('current_total_discounts'),
	current_total_price: numeric('current_total_price'),
	current_subtotal_price: numeric('current_subtotal_price'),
	current_total_tax: numeric('current_total_tax'),
	processed_at: timestamp('processed_at'),
	shipped_at: timestamp('shipped_at'),
});

export const orderRelations = relations(order, ({ one, many }) => ({
	customer: one(customer, {
		fields: [order.customer_id],
		references: [customer.id],
	}),
	cart: one(cart, {
		fields: [order.cart_id],
		references: [cart.id],
	}),
	items: many(orderItems),
	transactions: many(transaction),
}));

export const orderItems = pgTable('order_items', {
	id: serial('id').primaryKey(),
	orderId: integer('order_id').references(() => order.id),
	product_variant_id: integer('product_variant_id').references(
		() => productVariant.id
	),
	quantity: integer('quantity'),
	price_at_purchase: numeric('price_at_purchase'),
	created_at: timestamp('created_at'),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	order: one(order, {
		fields: [orderItems.orderId],
		references: [order.id],
	}),
	productVariant: one(productVariant, {
		fields: [orderItems.product_variant_id],
		references: [productVariant.id],
	}),
}));
