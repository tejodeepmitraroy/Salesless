ALTER TABLE "category" ADD COLUMN "name" varchar;--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN "slug" varchar;--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN "parent_id" integer;--> statement-breakpoint
ALTER TABLE "category" DROP COLUMN "title";