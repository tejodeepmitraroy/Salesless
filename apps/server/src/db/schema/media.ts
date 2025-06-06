import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { store } from './store';

export const media = pgTable('media', {
	id: serial('id').primaryKey(),
	storeId: integer('store_id')
		.references(() => store.id)
		.notNull(),
	fileName: varchar('fileName'),
	url: varchar('url'),
	key: varchar('key'),
	size: varchar('size'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	lastModified: timestamp('updated_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
});

export const mediaRelations = relations(media, ({ one }) => ({
	store: one(store, {
		fields: [media.storeId],
		references: [store.id],
	}),
}));
