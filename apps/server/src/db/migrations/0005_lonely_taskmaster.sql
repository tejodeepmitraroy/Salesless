ALTER TABLE "product" RENAME COLUMN "product_type" TO "status";--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "compared_at_price" numeric;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "images" varchar(255)[];--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "category" varchar(255);--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "seo_title" varchar(255);--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "seo_description" varchar(255);--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "seo_keywords" varchar(255);--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "seo_score" integer;