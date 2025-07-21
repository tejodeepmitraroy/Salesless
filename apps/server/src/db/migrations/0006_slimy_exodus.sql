ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."status";--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "payment_method" SET DATA TYPE "public"."payment_method";--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "payment_method" SET DEFAULT 'cod';