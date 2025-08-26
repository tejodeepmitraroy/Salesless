CREATE TABLE "subscription" (
	"id" varchar(26) PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"store_id" varchar NOT NULL,
	"customer_id" varchar(255) NOT NULL,
	"subscription_id" varchar(255) NOT NULL,
	"tier" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'inactive' NOT NULL,
	"last_renewal_date" timestamp with time zone NOT NULL,
	"current_period_end" timestamp with time zone NOT NULL,
	"cancel_at_period_end" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE cascade ON UPDATE no action;