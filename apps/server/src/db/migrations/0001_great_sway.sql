CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"type" varchar,
	"public_url" varchar,
	"key" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
