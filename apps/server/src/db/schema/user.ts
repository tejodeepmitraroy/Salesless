import { relations } from 'drizzle-orm';
import {
	boolean,
	integer,
	pgTable,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { userStore } from './store';
import { ulid } from 'ulid';

export const user = pgTable('user', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	emailVerified: boolean('email_verified').notNull().default(false),
	phone: varchar({ length: 255 }),
	phoneVerified: boolean('phone_verified').notNull().default(false),
	password: varchar({ length: 255 }),
	googleId: varchar('google_id'),
	avatar: varchar('avatar'),
	gender: varchar('gender'),
	age: integer('age'),
	isActive: boolean('is_active').notNull().default(true),
	isBan: boolean('is_ban').notNull().default(false),
	refreshToken: varchar('refresh_token'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});
export const userRelations = relations(user, ({ many }) => ({
	userStore: many(userStore),
}));
