import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { product } from './product';

// Category table
export const category = pgTable('category', {
	id: serial('id').primaryKey(),
	name: varchar('name'),
	slug: varchar('slug'),
	description: varchar('description'),
	parentId: integer('parent_id'),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const categoryRelations = relations(category, ({ one, many }) => ({
	product: many(product),
	parentCategory: one(category, {
		fields: [category.parentId],
		references: [category.id],
	}),
}));
