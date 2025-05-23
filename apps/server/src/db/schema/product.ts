import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  real,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { store } from "./store";
import {  productToCategory } from "./category";
import { orderItems } from "./order";
import { cartItems } from "./cart";

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id")
    .notNull()
    .references(() => store.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  price: numeric("price"),
  product_type: varchar("product_type"),
  stock_quantity: integer("stock_quantity"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const productRelations = relations(product, ({ one, many }) => ({
  productVariant: many(productVariant),
  store: one(store, {
    fields: [product.storeId],
    references: [store.id],
  }),
  productToCategory: many(productToCategory),
  metadata: one(productMetadata, {
    fields: [product.id],
    references: [productMetadata.productId],
  }),
}));

export const productVariant = pgTable("product_variant", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  inventoryItemId: varchar("inventory_item_id", { length: 255 }).notNull(),
  imageId: varchar("image_id", { length: 255 }).notNull(),
  sku: varchar("sku").notNull(),
  barcode: varchar("barcode"),
  title: varchar("title"),
  compareAtPrice: numeric("compare_at_price"),
  price: numeric("price"),
  weight: numeric("weight"),
  option1: varchar("option1"),
  option2: varchar("option2"),
  option3: varchar("option3"),
  option4: varchar("option4"),
  position: varchar("position"),
  weightUnit: real("weight_real"),
  inventoryPolicy: varchar("inventory_policy"),
  requiresShipping: boolean("requires_shipping"),
  taxable: boolean("taxable"),
  fulfillmentService: varchar("fulfillment_service"),
  inventory_management: varchar("inventory_management"),
  inventoryQuantity: integer("inventory_quantity"),
  oldInventoryQuantity: integer("old_inventory_quantity"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const productVariantRelations = relations(
  productVariant,
  ({ one, many }) => ({
    product: one(product, {
      fields: [productVariant.productId],
      references: [product.id],
    }),
    orderItems: many(orderItems),
    cartItems: many(cartItems),
  })
);

export const productMetadata = pgTable("product_metadata", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id)
    .unique(),
  namespace: varchar("namespace", { length: 255 }).notNull(),
  key: integer("key").notNull(),
  value: varchar("value", { length: 255 }),
  type: varchar("type"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const productMetadataRelations = relations(
  productMetadata,
  ({ one }) => ({
    product: one(product, {
      fields: [productMetadata.productId],
      references: [product.id],
    }),
  })
);
