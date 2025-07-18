import { relations } from 'drizzle-orm';
import {
	integer,
	numeric,
	pgTable,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';

import { cart } from './cart';
import { transaction } from './transaction';
import { productVariant } from './product';
import { customer } from './customer';
import { ulid } from 'ulid';

export const order = pgTable('order', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	customerId: varchar('customer_id').references(() => customer.id),
	cartId: varchar('cart_id').references(() => cart.id),
	contactId: varchar('contact_id'),
	name: varchar('name'),
	shippingAddressPhone: varchar('shipping_address_phone'),
	shippingAddressCompany: varchar('shipping_address_company'),
	shippingAddressName: varchar('shipping_address_name'),
	shippingAddressAddress1: varchar('shipping_address_address1'),
	shippingAddressAddress2: varchar('shipping_address_address2'),
	shippingAddressCity: varchar('shipping_address_city'),
	shippingAddressProvince: varchar('shipping_address_province'),
	shippingAddressCountry: varchar('shipping_address_country'),
	shippingAddressZip: varchar('shipping_address_zip'),
	billingAddressPhone: varchar('billing_address_phone'),
	billingAddressCompany: varchar('billing_address_company'),
	billingAddressName: varchar('billing_address_name'),
	billingAddressAddress1: varchar('billing_address_address1'),
	billingAddressAddress2: varchar('billing_address_address2'),
	billingAddressCity: varchar('billing_address_city'),
	billingAddressProvince: varchar('billing_address_province'),
	billingAddressCountry: varchar('billing_address_country'),
	billingAddressZip: varchar('billing_address_zip'),
	tags: varchar('tags'),
	note: varchar('note'),
	currency: varchar('currency'),
	totalPrice: numeric('total_price'),
	subtotalPrice: numeric('subtotal_price'),
	cancelledAt: timestamp('cancelled_at'),
	token: varchar('token'),
	orderNumber: integer('order_number'),
	processedMethod: varchar('processed_method'),
	additionalPrice: numeric('additional_price'),
	totalDiscounts: numeric('total_discounts'),
	totalLineItemsPrice: numeric('total_line_items_price'),
	totalTax: numeric('total_tax'),
	totalTaxRecovered: numeric('total_tax_recovered'),
	totalWeight: numeric('total_weight'),
	currentTotalDiscounts: numeric('current_total_discounts'),
	currentTotalPrice: numeric('current_total_price'),
	currentSubtotalPrice: numeric('current_subtotal_price'),
	currentTotalTax: numeric('current_total_tax'),
	processedAt: timestamp('processed_at'),
	shippedAt: timestamp('shipped_at'),
});

export const orderRelations = relations(order, ({ one, many }) => ({
	customer: one(customer, {
		fields: [order.customerId],
		references: [customer.id],
	}),
	cart: one(cart, {
		fields: [order.cartId],
		references: [cart.id],
	}),
	items: many(orderItems),
	transactions: many(transaction),
}));

export const orderItems = pgTable('order_items', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	orderId: varchar('order_id').references(() => order.id),
	productVariantId: varchar('product_variant_id').references(
		() => productVariant.id
	),
	quantity: integer('quantity'),
	priceAtPurchase: numeric('price_at_purchase'),
	created_at: timestamp('created_at'),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	order: one(order, {
		fields: [orderItems.orderId],
		references: [order.id],
	}),
	productVariant: one(productVariant, {
		fields: [orderItems.productVariantId],
		references: [productVariant.id],
	}),
}));
