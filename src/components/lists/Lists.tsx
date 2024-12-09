import { revalidatePath } from "next/cache";
import EditList from "./EditList";
import DeleteBtn from "./DeleteBtn";
import { listsTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { AddTask } from "../tasks/AddTask";

type ToDoLists = {
  name: string;
  userId: string;
  listId: string;
  description: string | null;
  createdOn: Date | null;
  lastUpdated: Date | null;
}[];

type ListsProps = {
  toDoLists: ToDoLists;
};

export async function Lists({ toDoLists }: ListsProps) {
  return (
    <ul>
      {toDoLists.map((list) => {
        async function deleteList() {
          "use server";
          await db.delete(listsTable).where(eq(listsTable.listId, list.listId));
          revalidatePath("/dashboard/lists");
        }
        async function updateList(title: string) {
          "use server";
          await db
            .update(listsTable)
            .set({ name: title })
            .where(eq(listsTable.listId, list.listId));
          revalidatePath("/dashboard/lists");
        }
        return (
          <li key={list.listId} className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <EditList name={list.name} updateList={updateList} />
              <DeleteBtn deleteFn={deleteList} />
            </div>
            <div className="flex flex-col gap-2 ps-4">
              <ul>
                <li>Dummy task</li>
              </ul>
              <AddTask />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
