ALTER TABLE "order" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "payment_method" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "payment_method" DROP NOT NULL;