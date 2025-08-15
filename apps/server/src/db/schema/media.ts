import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { store } from './store';
import { productMedia } from './product';
import { ulid } from 'ulid';

export const media = pgTable('media', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	storeId: varchar('store_id')
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
	productMedia: one(productMedia, {
		fields: [media.id],
		references: [productMedia.mediaId],
	}),
}));
