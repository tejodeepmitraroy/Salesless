import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	primaryKey,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { userStore } from './store';

export const role = pgTable('roles', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull().unique(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const roleRelations = relations(role, ({ many }) => ({
	userStore: many(userStore),
	rolePermissions: many(rolePermissions),
}));

export const permissions = pgTable('permissions', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull().unique(), // e.g., "edit_product"
});

export const permissionRelations = relations(role, ({ many }) => ({
	rolePermissions: many(rolePermissions),
}));

export const rolePermissions = pgTable(
	'role_permissions',
	{
		roleId: integer('role_id')
			.notNull()
			.references(() => role.id),
		permissionId: integer('permission_id')
			.notNull()
			.references(() => permissions.id),
	},
	(table) => [primaryKey({ columns: [table.roleId, table.permissionId] })]
);

export const rolePermissionRelations = relations(
	rolePermissions,
	({ one }) => ({
		role: one(role, {
			fields: [rolePermissions.roleId],
			references: [role.id],
		}),
		permission: one(permissions, {
			fields: [rolePermissions.permissionId],
			references: [permissions.id],
		}),
	})
);
