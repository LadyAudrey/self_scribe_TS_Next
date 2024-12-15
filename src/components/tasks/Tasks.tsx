import { auth } from "@/auth";
import { db } from "@/db";
import { tasksTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { Task } from "./Task";

type TasksProps = {
  listId: string;
};

export async function Tasks({ listId }: TasksProps) {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;

  const tasks = await db
    .select()
    .from(tasksTable)
    .where(and(eq(tasksTable.userId, userId), eq(tasksTable.listId, listId)));

  return (
    <ul>
      {tasks.map((task) => {
        return <Task task={task} />;
      })}
    </ul>
  );
}
