import {
	integer,
	numeric,
	pgTable,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { order } from './order';
import { customer } from './customer';
import { ulid } from 'ulid';

export const transaction = pgTable('transaction', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	order_id: varchar('order_id').references(() => order.id),
	purchase: varchar('purchase'),
	customer_id: varchar('customer_id').references(() => customer.id),
	amount: numeric('amount'),
	authorization: varchar('authorization'),
	currency: varchar('currency'),
	source_name: varchar('source_name'),
	status: varchar('status'),
	payment_details_avs_result_code: varchar('payment_details_avs_result_code'),
	payment_details_credit_card_bin: varchar('payment_details_credit_card_bin'),
	payment_details_credit_card_company: varchar(
		'payment_details_credit_card_company'
	),
	payment_details_credit_card_number: varchar(
		'payment_details_credit_card_number'
	),
	payment_details_cvv_result_code: varchar('payment_details_cvv_result_code'),
	gateway: varchar('gateway'),
	receipt_amount: numeric('receipt_amount'),
	currency_exchange_id: integer('currency_exchange_id'),
	currency_exchange_adjustment: numeric('currency_exchange_adjustment'),
	currency_exchange_original_amount: numeric(
		'currency_exchange_original_amount'
	),
	currency_exchange_final_amount: numeric('currency_exchange_final_amount'),
	error_code: varchar('error_code'),
	authorization_expires_at: timestamp('authorization_expires_at'),
	processed_at: timestamp('processed_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
	created_at: timestamp('created_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
});

export const transactionRelations = relations(transaction, ({ one }) => ({
	order: one(order, {
		fields: [transaction.order_id],
		references: [order.id],
	}),
	customer: one(customer, {
		fields: [transaction.customer_id],
		references: [customer.id],
	}),
}));
