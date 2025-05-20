import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { customerStore, userStore } from "./store";
import { order } from "./order";
import { transaction } from "./transaction";
import { cart } from "./cart";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  phone: varchar({ length: 255 }),
  phoneVerified: boolean("phone_verified").notNull().default(false),
  password: varchar(),
  googleId: varchar("google_id"),
  avatar: varchar("avatar"),
  gender: varchar("gender"),
  age: integer("age"),
  isActive: boolean("is_active").notNull().default(true),
  isBan: boolean("is_ban").notNull().default(false),
  refreshToken: varchar("refresh_token"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
export const userRelations = relations(user, ({ many }) => ({
  userStore: many(userStore),
}));

export const customer = pgTable("customer", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  phone: varchar({ length: 255 }),
  phoneVerified: boolean("phone_verified").notNull().default(false),
  password: varchar({ length: 20 }),
  googleId: varchar("google_id"),
  avatar: varchar("avatar"),
  age: integer("age"),
  orderCount: integer("order_count").notNull().default(0),
  totalSpend: real("total_spend").notNull().default(0.0),
  note: varchar("note", { length: 255 }),
  taxExempt: boolean("tax_exempt").notNull().default(false),
  refreshToken: varchar("refresh_token"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const customerRelations = relations(customer, ({ many }) => ({
  address: many(customerAddress),
  orders: many(order),
  transactions: many(transaction),
  customerStores: many(customerStore),
  carts: many(cart),
}));

export const customerAddress = pgTable("customer_address", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customer.id),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  company: varchar("company"),
  address1: varchar("address1").notNull(),
  address2: varchar("address2"),
  city: varchar("city").notNull(),
  province: varchar("province").notNull(),
  provinceCode: varchar("province_code").notNull(),
  country: varchar("country").notNull(),
  countryCode: varchar("country_code").notNull(),
  zipcode: integer("zipcode").notNull(),
  phone: varchar({ length: 255 }).notNull(),
  isDefault: boolean("is_default").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const customerAddressRelations = relations(
  customerAddress,
  ({ one }) => ({
    customer: one(customer, {
      fields: [customerAddress.customerId],
      references: [customer.id],
    }),
  })
);
