import {
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user, customer } from './user';
import { role } from './role';
import { product } from './product';
import { cart } from './cart';
import { media } from './media';
import { collection } from './collection';

export const store = pgTable('store', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	description: varchar('description'),
	country: varchar('country').notNull(),
	address1: varchar('address1').notNull(),
	address2: varchar('address2'),
	zip: integer('zip'),
	city: varchar('city'),
	phone: varchar('phone').notNull(),
	countryCode: varchar('country_code'),
	timezone: varchar('timezone'),
	moneyFormat: varchar('money_format'),
	domain: varchar('domain'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const storeRelations = relations(store, ({ many }) => ({
	products: many(product),
	collections: many(collection),
	carts: many(cart),
	customerStores: many(customerStore),
	userStore: many(userStore),

	roles: many(userStore, {
		relationName: 'storeRoles',
	}),
	media: many(media, {
		relationName: 'storeMedia',
	}),
	apiKeys: many(apiKey),
}));

export const userStore = pgTable(
	'user_store',
	{
		storeId: integer('store_id')
			.notNull()
			.references(() => store.id),
		userId: integer('user_id')
			.notNull()
			.references(() => user.id),
		roleId: integer('role_id')
			.notNull()
			.references(() => role.id),
		registerAt: timestamp('register_at', { mode: 'string' })
			.notNull()
			.defaultNow(),
	},
	(table) => [
		primaryKey({ columns: [table.storeId, table.userId, table.roleId] }),
	]
);

export const userStoreRelations = relations(userStore, ({ one }) => ({
	store: one(store, {
		fields: [userStore.storeId],
		references: [store.id],
	}),

	user: one(user, {
		fields: [userStore.userId],
		references: [user.id],
	}),

	role: one(role, {
		fields: [userStore.roleId],
		references: [role.id],
	}),
}));

export const customerStore = pgTable(
	'customer_store',
	{
		storeId: integer('store_id')
			.notNull()
			.references(() => store.id),
		customerId: integer('customer_id')
			.notNull()
			.references(() => customer.id),
		registerAt: timestamp('register_at', { mode: 'string' })
			.notNull()
			.defaultNow(),
	},
	(table) => [primaryKey({ columns: [table.storeId, table.customerId] })]
);

export const customerStoreRelations = relations(customerStore, ({ one }) => ({
	store: one(store, {
		fields: [customerStore.storeId],
		references: [store.id],
	}),
	customer: one(customer, {
		fields: [customerStore.customerId],
		references: [customer.id],
	}),
}));

export const apiKey = pgTable('api_keys', {
	id: serial('id').primaryKey(),
	store_id: integer('store_id')
		.references(() => store.id)
		.notNull(),
	key: text('key').unique().notNull(),
	secret_hash: text('secret_hash').notNull(),
	label: varchar('label', { length: 255 }),
	scopes: text('scopes').default('read:store,read:orders'),
	platform: varchar('platform', { length: 50 }),
	createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
	expiresAt: timestamp('expires_at', { mode: 'string' }),
	revokedAt: timestamp('revoked_at', { mode: 'string' }),
});

export const apiKeyRelations = relations(apiKey, ({ one }) => ({
	store: one(store, {
		fields: [apiKey.store_id],
		references: [store.id],
	}),
}));
