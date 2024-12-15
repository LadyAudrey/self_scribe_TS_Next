import { auth } from "@/auth";
import { db } from "@/db";
import { tasksTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

type AddTaskProps = {
  listId: string;
};

export async function AddTask({ listId }: AddTaskProps) {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;
  async function addTask(formData: FormData) {
    "use server";
    const name = formData.get("name") as string | null;
    if (!name) {
      return;
    }
    try {
      await db.insert(tasksTable).values({ name, userId, listId });
      revalidatePath("/dashboard/lists");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form action={addTask} className="flex gap-2">
      <input type="text" name="name" className="text-black" />
      <button type="submit">Add Task</button>
    </form>
  );
}
