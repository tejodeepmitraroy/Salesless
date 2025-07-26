import { relations } from 'drizzle-orm';
import {
	integer,
	numeric,
	pgTable,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { transaction } from './transaction';
import { product } from './product';
import { customer } from './customer';
import { ulid } from 'ulid';
import { store } from './store';

// Define enums with default values
// export const paymentMethodEnum = pgEnum('payment_method', [
// 	'cod',
// 	'upi',
// 	'card',
// 	'netbanking',
// ]);

// const statusEnum = pgEnum('status', [
// 	'pending',
// 	'paid',
// 	'shipped',
// 	'cancelled',
// 	'delivered',
// ]);

export const order = pgTable('order', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	storeId: varchar('store_id')
		.references(() => store.id, { onDelete: 'cascade' })
		.notNull(),
	customerId: varchar('customer_id')
		.references(() => customer.id, { onDelete: 'cascade' })
		.notNull(),
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
	status: varchar('status').default('pending'),
	currency: varchar('currency'),
	totalPrice: numeric('total_price'),
	subtotalPrice: numeric('subtotal_price'),
	paymentMethod: varchar('payment_method').default('cod'),
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
	cancelledAt: timestamp('cancelled_at', { mode: 'string' }),
	processedAt: timestamp('processed_at', { mode: 'string' }),
	shippedAt: timestamp('shipped_at', { mode: 'string' }),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' })
		.notNull()
		.$onUpdate(() => new Date().toISOString()),
});

export const orderRelations = relations(order, ({ one, many }) => ({
	customer: one(customer, {
		fields: [order.customerId],
		references: [customer.id],
	}),
	store: one(store, {
		fields: [order.storeId],
		references: [store.id],
	}),
	items: many(orderItems),
	transactions: many(transaction),
}));

export const orderItems = pgTable('order_items', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	orderId: varchar('order_id')
		.references(() => order.id)
		.notNull(),
	productId: varchar('product_id')
		.references(() => product.id)
		.notNull(),
	quantity: integer('quantity').notNull(),
	priceAtPurchase: integer('price_at_purchase').notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	order: one(order, {
		fields: [orderItems.orderId],
		references: [order.id],
	}),
	product: one(product, {
		fields: [orderItems.productId],
		references: [product.id],
	}),
}));
