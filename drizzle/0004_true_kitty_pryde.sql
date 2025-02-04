CREATE TABLE IF NOT EXISTS "taskInstances" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"listId" text NOT NULL,
	"taskId" text NOT NULL,
	"createdOn" timestamp DEFAULT now(),
	"lastUpdated" timestamp DEFAULT now(),
	"completed" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "repeats" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "frequency" text DEFAULT '1:0';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "taskInstances" ADD CONSTRAINT "taskInstances_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "taskInstances" ADD CONSTRAINT "taskInstances_listId_lists_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."lists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "taskInstances" ADD CONSTRAINT "taskInstances_taskId_tasks_id_fk" FOREIGN KEY ("taskId") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
