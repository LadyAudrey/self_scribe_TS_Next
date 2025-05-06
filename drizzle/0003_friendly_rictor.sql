ALTER TABLE "symptoms" ALTER COLUMN "categories" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "categories" text[] DEFAULT '{}'::text[] NOT NULL;