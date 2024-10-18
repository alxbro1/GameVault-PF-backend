ALTER TABLE "orders" RENAME COLUMN "time_stamp" TO "created_at";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "stock" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "name" varchar(15) NOT NULL;