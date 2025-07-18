CREATE TYPE "public"."status" AS ENUM('active', 'draft', 'archive');--> statement-breakpoint
CREATE TABLE "cart" (
	"id" varchar PRIMARY KEY NOT NULL,
	"store_id" varchar,
	"customer_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" varchar PRIMARY KEY NOT NULL,
	"cart_id" varchar,
	"product_id" varchar,
	"quantity" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"slug" varchar,
	"description" varchar,
	"parent_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collection" (
	"id" varchar PRIMARY KEY NOT NULL,
	"store_id" varchar NOT NULL,
	"title" varchar,
	"description" varchar,
	"slug" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"id" varchar PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"phone" varchar(255),
	"phone_verified" boolean DEFAULT false NOT NULL,
	"password" varchar(255),
	"google_id" varchar,
	"avatar" varchar,
	"order_count" integer DEFAULT 0 NOT NULL,
	"total_spend" real DEFAULT 0 NOT NULL,
	"note" varchar(255),
	"tax_exempt" boolean DEFAULT false NOT NULL,
	"refresh_token" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customer_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "customer_address" (
	"id" varchar PRIMARY KEY NOT NULL,
	"customer_id" varchar NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"company" varchar,
	"address1" varchar NOT NULL,
	"address2" varchar,
	"city" varchar NOT NULL,
	"province" varchar NOT NULL,
	"province_code" varchar NOT NULL,
	"country" varchar NOT NULL,
	"country_code" varchar NOT NULL,
	"zipcode" integer NOT NULL,
	"phone" varchar(255) NOT NULL,
	"is_default" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_store" (
	"store_id" varchar NOT NULL,
	"customer_id" varchar NOT NULL,
	"register_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customer_store_store_id_customer_id_pk" PRIMARY KEY("store_id","customer_id")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" varchar PRIMARY KEY NOT NULL,
	"store_id" varchar NOT NULL,
	"fileName" varchar,
	"url" varchar,
	"key" varchar,
	"size" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" varchar PRIMARY KEY NOT NULL,
	"customer_id" integer,
	"cart_id" integer,
	"contact_id" integer,
	"name" varchar,
	"shipping_address_phone" varchar,
	"shipping_address_company" varchar,
	"shipping_address_name" varchar,
	"shipping_address_address1" varchar,
	"shipping_address_address2" varchar,
	"shipping_address_city" varchar,
	"shipping_address_province" varchar,
	"shipping_address_country" varchar,
	"shipping_address_zip" varchar,
	"billing_address_phone" varchar,
	"billing_address_company" varchar,
	"billing_address_name" varchar,
	"billing_address_address1" varchar,
	"billing_address_address2" varchar,
	"billing_address_city" varchar,
	"billing_address_province" varchar,
	"billing_address_country" varchar,
	"billing_address_zip" varchar,
	"tags" varchar,
	"note" varchar,
	"currency" varchar,
	"total_price" numeric,
	"subtotal_price" numeric,
	"cancelled_at" timestamp,
	"token" varchar,
	"order_number" integer,
	"processed_method" varchar,
	"additional_price" numeric,
	"total_discounts" numeric,
	"total_line_items_price" numeric,
	"total_tax" numeric,
	"total_tax_recovered" numeric,
	"total_weight" numeric,
	"current_total_discounts" numeric,
	"current_total_price" numeric,
	"current_subtotal_price" numeric,
	"current_total_tax" numeric,
	"processed_at" timestamp,
	"shipped_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"product_variant_id" integer,
	"quantity" integer,
	"price_at_purchase" numeric,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "permissions_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" varchar PRIMARY KEY NOT NULL,
	"store_id" varchar NOT NULL,
	"category_id" varchar,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"status" "status",
	"is_variant_enable" boolean DEFAULT false NOT NULL,
	"seo_title" varchar(255),
	"seo_description" varchar(255),
	"seo_keywords" varchar(255),
	"seo_score" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_media" (
	"index" serial NOT NULL,
	"product_id" varchar NOT NULL,
	"media_id" varchar NOT NULL,
	CONSTRAINT "product_media_media_id_product_id_pk" PRIMARY KEY("media_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "product_metadata" (
	"id" varchar PRIMARY KEY NOT NULL,
	"product_id" varchar NOT NULL,
	"namespace" varchar(255) NOT NULL,
	"key" integer NOT NULL,
	"value" varchar(255),
	"type" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_metadata_product_id_unique" UNIQUE("product_id")
);
--> statement-breakpoint
CREATE TABLE "product_options" (
	"id" varchar PRIMARY KEY NOT NULL,
	"product_id" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_options_values" (
	"id" varchar PRIMARY KEY NOT NULL,
	"option_id" varchar NOT NULL,
	"value" varchar(255) NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_to_collection" (
	"product_id" varchar NOT NULL,
	"collection_id" varchar NOT NULL,
	CONSTRAINT "product_to_collection_product_id_collection_id_pk" PRIMARY KEY("product_id","collection_id")
);
--> statement-breakpoint
CREATE TABLE "product_variant" (
	"id" varchar PRIMARY KEY NOT NULL,
	"product_id" varchar NOT NULL,
	"sku" varchar,
	"barcode" varchar,
	"price" numeric,
	"compare_at_price" numeric,
	"cost_per_item" numeric,
	"manage_inventory" boolean DEFAULT true NOT NULL,
	"inventory_quantity" integer DEFAULT 0 NOT NULL,
	"low_stock_threshold" integer DEFAULT 5 NOT NULL,
	"requires_shipping" boolean DEFAULT true NOT NULL,
	"inventory_policy" varchar DEFAULT 'Deny' NOT NULL,
	"weight" numeric,
	"weight_unit" varchar DEFAULT 'g' NOT NULL,
	"option1" varchar,
	"option2" varchar,
	"option3" varchar,
	"option4" varchar,
	"fulfillment_service" varchar DEFAULT 'manual' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"position" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"role_id" varchar NOT NULL,
	"permission_id" varchar NOT NULL,
	CONSTRAINT "role_permissions_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "store" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"country" varchar NOT NULL,
	"address1" varchar NOT NULL,
	"address2" varchar,
	"zip" integer,
	"city" varchar,
	"phone" varchar NOT NULL,
	"country_code" varchar,
	"timezone" varchar,
	"money_format" varchar,
	"domain" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transaction" (
	"id" varchar PRIMARY KEY NOT NULL,
	"order_id" varchar,
	"purchase" varchar,
	"customer_id" varchar,
	"amount" numeric,
	"authorization" varchar,
	"currency" varchar,
	"source_name" varchar,
	"status" varchar,
	"payment_details_avs_result_code" varchar,
	"payment_details_credit_card_bin" varchar,
	"payment_details_credit_card_company" varchar,
	"payment_details_credit_card_number" varchar,
	"payment_details_cvv_result_code" varchar,
	"gateway" varchar,
	"receipt_amount" numeric,
	"currency_exchange_id" integer,
	"currency_exchange_adjustment" numeric,
	"currency_exchange_original_amount" numeric,
	"currency_exchange_final_amount" numeric,
	"error_code" varchar,
	"authorization_expires_at" timestamp,
	"processed_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"phone" varchar(255),
	"phone_verified" boolean DEFAULT false NOT NULL,
	"password" varchar(255),
	"google_id" varchar,
	"avatar" varchar,
	"gender" varchar,
	"age" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_ban" boolean DEFAULT false NOT NULL,
	"refresh_token" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_store" (
	"store_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"register_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_store_store_id_user_id_pk" PRIMARY KEY("store_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection" ADD CONSTRAINT "collection_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_address" ADD CONSTRAINT "customer_address_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_store" ADD CONSTRAINT "customer_store_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_store" ADD CONSTRAINT "customer_store_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_variant_id_product_variant_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_media" ADD CONSTRAINT "product_media_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_media" ADD CONSTRAINT "product_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_metadata" ADD CONSTRAINT "product_metadata_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_options" ADD CONSTRAINT "product_options_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_options_values" ADD CONSTRAINT "product_options_values_option_id_product_options_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."product_options"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_to_collection" ADD CONSTRAINT "product_to_collection_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_to_collection" ADD CONSTRAINT "product_to_collection_collection_id_collection_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collection"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_store" ADD CONSTRAINT "user_store_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_store" ADD CONSTRAINT "user_store_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;