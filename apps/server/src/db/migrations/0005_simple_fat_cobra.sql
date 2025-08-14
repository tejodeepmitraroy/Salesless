ALTER TABLE "subscription" ALTER COLUMN "cancel_at_period_end" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription" ALTER COLUMN "updated_at" SET NOT NULL;