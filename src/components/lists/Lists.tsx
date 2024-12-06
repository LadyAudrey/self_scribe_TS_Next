import { auth } from "@/auth";
import { db } from "@/db";
import { lists } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import EditList from "./EditList";
import DeleteBtn from "./DeleteBtn";

export async function Lists() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;

  const toDoLists = await db
    .select()
    .from(lists)
    .where(eq(lists.userId, userId));

  return (
    <ul>
      {toDoLists.map((list) => {
        async function deleteList() {
          "use server";
          await db.delete(lists).where(eq(lists.listId, list.listId));
          revalidatePath("/dashboard/lists");
        }
        async function updateList(title: string) {
          "use server";
          await db
            .update(lists)
            .set({ name: title })
            .where(eq(lists.listId, list.listId));
          revalidatePath("/dashboard/lists");
        }
        return (
          <li key={list.listId} className="flex justify-between gap-2">
            <EditList name={list.name} updateList={updateList} />
            <DeleteBtn deleteFn={deleteList} />
          </li>
        );
      })}
    </ul>
  );
}
