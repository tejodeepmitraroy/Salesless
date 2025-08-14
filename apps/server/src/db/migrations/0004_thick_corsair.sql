ALTER TABLE "subscription" ALTER COLUMN "user_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "subscription" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "subscription" ADD COLUMN "stripe_customer_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription" DROP COLUMN "customer_id";