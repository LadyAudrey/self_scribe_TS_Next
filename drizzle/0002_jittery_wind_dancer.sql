CREATE TABLE IF NOT EXISTS "symptomInstances" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"symptomId" text NOT NULL,
	"createdOn" timestamp DEFAULT now() NOT NULL,
	"severity" smallint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "symptomInstances" ADD CONSTRAINT "symptomInstances_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "symptomInstances" ADD CONSTRAINT "symptomInstances_symptomId_symptoms_id_fk" FOREIGN KEY ("symptomId") REFERENCES "public"."symptoms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
