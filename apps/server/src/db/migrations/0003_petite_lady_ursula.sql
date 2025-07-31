CREATE TABLE "api_keys" (
	"id" varchar PRIMARY KEY NOT NULL,
	"store_id" varchar NOT NULL,
	"key" text NOT NULL,
	"secret_hash" text NOT NULL,
	"label" varchar(255),
	"scopes" text DEFAULT 'read:store,read:orders',
	"platform" varchar(50),
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp,
	"revoked_at" timestamp,
	CONSTRAINT "api_keys_key_unique" UNIQUE("key")
);
--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_store_id_store_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;