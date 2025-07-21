ALTER TABLE "order" ALTER COLUMN "status" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "payment_method" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "payment_method" SET DEFAULT 'cod';--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "payment_method" DROP NOT NULL;