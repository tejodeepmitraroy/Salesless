import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { product } from './product';
import { ulid } from 'ulid';

// Category table
export const category = pgTable('category', {
	id: varchar('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => ulid()),
	name: varchar('name'),
	slug: varchar('slug'),
	description: varchar('description'),
	parentId: varchar('parent_id'),
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
