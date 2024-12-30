import { taskInstancesTable, tasksTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { EditTask } from "./EditTask";
import { DeleteBtn } from "../lists/DeleteBtn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../UI/Accordion";
import { Checkbox } from "./Checkbox";
import { Task as DBTask } from "@/app/dashboard/lists/page";

type TaskProps = {
  task: DBTask;
};

export function Task({ task }: TaskProps) {
  if (task.instances.length < 1) {
    return null;
  }
  const completed = task.instances[0].completed ?? false;
  async function updateTask(title: string) {
    "use server";
    await db
      .update(tasksTable)
      .set({ name: title })
      .where(eq(tasksTable.taskId, task.taskId));
    revalidatePath("/dashboard/lists");
  }
  async function deleteTask() {
    "use server";
    await db.delete(tasksTable).where(eq(tasksTable.taskId, task.taskId));
    revalidatePath("/dashboard/lists");
  }
  async function completeTask(value: boolean) {
    "use server";
    const instanceId = task.instances[0].instanceId;
    await db
      .update(taskInstancesTable)
      .set({ completed: value })
      .where(eq(taskInstancesTable.instanceId, instanceId));
    revalidatePath("/dashboard/lists");
  }
  return (
    <li className="my-2">
      <Accordion type={"single"} collapsible>
        <AccordionItem value={task.taskId}>
          <AccordionTrigger className="flex grow justify-between items-center gap-2">
            <Checkbox checked={completed} onChange={completeTask} />
            <EditTask name={task.name} updateTask={updateTask} />
            <DeleteBtn
              deleteFn={deleteTask}
              confirmationTxt="Are you sure you want to delete this task?"
              modalTitle="Delete Task"
            />
          </AccordionTrigger>
          <AccordionContent>
            <h1>hi</h1>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
}
