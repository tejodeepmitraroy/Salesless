import { relations } from 'drizzle-orm';
import {
	boolean,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { ulid } from 'ulid';
import { store } from './store';

export const paymentGatewayEnum = pgEnum('payment_gateway', [
	'stripe',
	'razorpay',
]);

export const modeEnum = pgEnum('mode', ['test', 'live']);

export const GatewayConfigs = pgTable('gateway_configs', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	storeId: varchar('store_id')
		.references(() => store.id)
		.notNull(),
	gateway: paymentGatewayEnum(), // 'stripe' | 'razorpay' | etc
	apiKey: text('api_key').notNull(),
	apiSecret: text('api_secret').notNull(),
	mode: modeEnum(),
	active: boolean('active').notNull().default(true),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const GatewayConfigsRelations = relations(GatewayConfigs, ({ one }) => ({
	store: one(store, {
		fields: [GatewayConfigs.storeId],
		references: [store.id],
	}),
}));
