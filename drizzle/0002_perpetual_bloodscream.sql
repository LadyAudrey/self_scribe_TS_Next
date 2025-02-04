ALTER TABLE "lists" RENAME COLUMN "listId" TO "id";--> statement-breakpoint
ALTER TABLE "lists" ALTER COLUMN "id" SET DATA TYPE text;