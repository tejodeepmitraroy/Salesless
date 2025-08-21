ALTER TABLE "store" ADD COLUMN "is_subscripted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "store" DROP COLUMN "plan";