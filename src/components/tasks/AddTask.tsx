import { auth } from "@/auth";
import { db } from "@/db";
import { tasksTable, taskInstancesTable } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { AddTaskForm } from "./AddTaskForm";

type AddTaskProps = {
  listId: string;
};

export async function AddTask({ listId }: AddTaskProps) {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;
  async function addTask(_prevState: { message: string }, formData: FormData) {
    "use server";
    const name = formData.get("name") as string | null;
    if (!name) {
      return { message: "Failed to create task" };
    }
    try {
      const result = await db
        .insert(tasksTable)
        .values({ name, userId, listId })
        .returning({ taskId: tasksTable.taskId });
      const { taskId } = result[0];
      await db.insert(taskInstancesTable).values({ taskId, listId, userId });

      revalidatePath("/dashboard/lists");
      return { message: "" };
    } catch (error) {
      console.error(error);
      return { message: "Failed to create task" };
    }
  }
  return <AddTaskForm addTask={addTask} />;
}
