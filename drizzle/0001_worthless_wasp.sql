CREATE TABLE IF NOT EXISTS "symptoms" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"userId" text NOT NULL,
	"description" text,
	"createdOn" timestamp DEFAULT now(),
	"lastUpdated" timestamp DEFAULT now(),
	"categories" text[] DEFAULT '{}'::text[]
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "symptoms" ADD CONSTRAINT "symptoms_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
