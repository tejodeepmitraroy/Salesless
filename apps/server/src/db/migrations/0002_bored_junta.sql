ALTER TABLE "store" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "store" ADD COLUMN "is_test_mode" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "store" ADD COLUMN "plan" varchar DEFAULT 'free' NOT NULL;