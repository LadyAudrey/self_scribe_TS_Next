// import { auth } from "@/auth";
// import { db } from "@/db";
// import { tasksTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { revalidatePath } from "next/cache";

import { Task } from "./Task";
import { Task as DBTask } from "@/app/dashboard/lists/page";
import { CompletedTask } from "./CompletedTask";

type TasksProps = {
  tasks: DBTask[];
  completed: boolean;
};

export async function Tasks({ tasks, completed }: TasksProps) {
  const filteredTasks = tasks.filter((task) => {
    const instance = task.instances[0];
    if (!instance) {
      return false;
    }
    return instance.completed === completed;
  });
  return (
    <ul>
      {!completed &&
        filteredTasks.map((task) => {
          return <Task task={task} key={task.taskId} />;
        })}
      {completed &&
        filteredTasks.map((task) => {
          return <CompletedTask task={task} key={task.taskId} />;
        })}
    </ul>
  );
}
