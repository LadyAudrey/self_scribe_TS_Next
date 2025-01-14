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
import { RepeatBtn } from "../lists/RepeatBtn";
import { TaskFrequency } from "./TaskFrequency";

type TaskProps = {
  task: DBTask;
};

export function Task({ task }: TaskProps) {
  if (task.instances.length < 1) {
    return null;
  }
  const completed = task.instances[0].completed ?? false;
  const frequency = task.frequency as string;

  const [activeString, inactiveString] = frequency.split(":");
  let active = parseInt(activeString);
  if (isNaN(active)) {
    active = 1;
  }
  let inactive = parseInt(inactiveString);
  if (isNaN(inactive)) {
    inactive = 0;
  }

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
  async function updateTaskRepeats(repeats: boolean) {
    "use server";
    await db
      .update(tasksTable)
      .set({ repeats: repeats })
      .where(eq(tasksTable.taskId, task.taskId));
    revalidatePath("/dashboard/lists");
  }
  async function updateFrequency(active: number, inactive: number) {
    "use server";
    if (active > 30) {
      return;
    }
    const frequency = active + ":" + inactive;
    await db
      .update(tasksTable)
      .set({ frequency: frequency })
      .where(eq(tasksTable.taskId, task.taskId));
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
          <AccordionContent className="flex justify-between text-black">
            <RepeatBtn
              repeats={!!task.repeats}
              updateRepeats={updateTaskRepeats}
            />
            <TaskFrequency
              active={active}
              inactive={inactive}
              updateFrequency={updateFrequency}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
}
