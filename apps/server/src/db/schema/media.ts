import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const media = pgTable('media', {
	id: serial('id').primaryKey(),
	name: varchar('name'),
	type: varchar('type'),
	publicUrl: varchar('public_url'),
	key: varchar('key'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});
