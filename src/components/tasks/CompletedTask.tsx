import { taskInstancesTable, tasksTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { DeleteBtn } from "../lists/DeleteBtn";
import { Checkbox } from "./Checkbox";
import { Task as DBTask } from "@/app/dashboard/lists/page";

type TaskProps = {
  task: DBTask;
};

export function CompletedTask({ task }: TaskProps) {
  if (task.instances.length < 1) {
    return null;
  }
  const completed = task.instances[0].completed ?? false;
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
    <li className="flex justify-between items-center gap-2">
      <Checkbox checked={completed} onChange={completeTask} />
      <div className="grow">{task.name}</div>
      <DeleteBtn
        deleteFn={deleteTask}
        confirmationTxt="Are you sure you want to delete this task?"
        modalTitle="Delete Task"
      />
    </li>
  );
}
