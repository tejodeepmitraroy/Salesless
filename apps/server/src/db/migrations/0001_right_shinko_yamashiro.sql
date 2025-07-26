CREATE TYPE "public"."mode" AS ENUM('test', 'live');--> statement-breakpoint
CREATE TYPE "public"."payment_gateway" AS ENUM('stripe', 'razorpay');