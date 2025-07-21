ALTER TABLE "order" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "payment_method" "payment_method" DEFAULT 'cod' NOT NULL;