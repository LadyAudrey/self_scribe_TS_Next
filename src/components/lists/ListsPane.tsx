import { revalidatePath } from "next/cache";
import { DeleteBtn } from "../UI/DeleteBtn";
import { listsTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { EditItem } from "../UI/EditItem";
import { Tasks } from "../tasks/Tasks";
import { AddTask } from "../tasks/AddTask";
import { Lists } from "@/app/dashboard/lists/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../UI/Accordion";

type ListsProps = {
  toDoLists: Lists;
};

export async function ListsPane({ toDoLists }: ListsProps) {
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
              <EditItem name={list.name} updateItem={updateList} />
              <Accordion type={"single"} collapsible>
                <AccordionItem value={"ddfaa"}>
                  <AccordionTrigger className="flex grow justify-between items-center gap-2"></AccordionTrigger>
                  <AccordionContent className="flex justify-between">
                    <div className="flex flex-col gap-2 ps-4">
                      <Tasks tasks={list.tasks} completed={false} />
                      <AddTask listId={list.listId} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <DeleteBtn
                deleteFn={deleteList}
                confirmationTxt="Are you sure you want to delete this list? All of your tasks will be permanently removed. This action cannot be undone."
                modalTitle="Delete List"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
