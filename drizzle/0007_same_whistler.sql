ALTER TABLE "taskInstances" DROP CONSTRAINT "taskInstances_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "taskInstances" DROP CONSTRAINT "taskInstances_listId_lists_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "taskInstances" ADD CONSTRAINT "taskInstances_userId_tasks_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."tasks"("userId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "taskInstances" ADD CONSTRAINT "taskInstances_listId_tasks_listId_fk" FOREIGN KEY ("listId") REFERENCES "public"."tasks"("listId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
