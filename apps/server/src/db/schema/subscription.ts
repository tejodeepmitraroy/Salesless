import { pgTable, boolean, timestamp, varchar } from 'drizzle-orm/pg-core';
import { ulid } from 'ulid';
import { store } from './store';
import { relations } from 'drizzle-orm';

export const subscription = pgTable('subscription', {
	id: varchar('id')
		.primaryKey()
		.$defaultFn(() => ulid())
		.notNull(),
	storeId: varchar('store_id')
		.notNull()
		.references(() => store.id, { onDelete: 'cascade' }),
	stripeCustomerId: varchar('stripe_customer_id'),
	subscriptionId: varchar('subscription_id'),
	tier: varchar('tier'),
	status: varchar('status'), // active, canceled, past_due
	lastRenewalDate: timestamp('last_renewal_date', {
		mode: 'string',
		withTimezone: true,
	}).notNull(),
	currentPeriodEnd: timestamp('current_period_end', {
		mode: 'string',
		withTimezone: true,
	}).notNull(),
	cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const subscriptionRelations = relations(subscription, ({ one }) => ({
	store: one(store, {
		fields: [subscription.storeId],
		references: [store.id],
	}),
}));
