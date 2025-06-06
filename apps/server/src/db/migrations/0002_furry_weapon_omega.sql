ALTER TABLE "media" ADD COLUMN "fileName" varchar;--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "size" varchar;--> statement-breakpoint
ALTER TABLE "media" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "media" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "media" DROP COLUMN "public_url";