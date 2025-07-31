ALTER TYPE "public"."payment_gateway" ADD VALUE 'phonepe';--> statement-breakpoint
ALTER TYPE "public"."payment_gateway" ADD VALUE 'paytm';--> statement-breakpoint
ALTER TABLE "gateway_configs" ADD COLUMN "api_url" varchar;