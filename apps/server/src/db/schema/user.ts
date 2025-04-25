import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  real,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status",["offline"])



export const employee = pgTable("employee", {
  id: integer().notNull().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 20 }),
  googleId: varchar("google_id"),
  avatar: varchar(),
  age: integer().notNull(),
  phone: varchar({ length: 14 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  isBan: boolean("is_ban").notNull().default(false),
  joinDate: timestamp("join_date", { mode: "string" }).notNull().defaultNow(),
  note: varchar({ length: 200 }),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});


export const customer = pgTable("customer", {
  id: integer().notNull().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 20 }),
  googleId: varchar("google_id"),
  avatar: varchar(),
  age: integer().notNull(),
  phone: varchar({ length: 14 }).notNull(),
  currency: varchar({length:5}),
  orderCount: serial("order_count").notNull(),
  verifiedEmail:boolean("verified_email").notNull().default(false),
  totalSpend: real("total_spend").notNull().default(0.0),
  note :varchar("note", { length: 255 }),
  taxExempt:boolean("tax_exempt").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const customer2 = pgTable("customer2", {
  id: integer().notNull().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
 
  
});

