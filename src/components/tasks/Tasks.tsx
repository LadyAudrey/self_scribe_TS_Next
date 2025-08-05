// import { auth } from "@/auth";
// import { db } from "@/db";
// import { tasksTable } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { revalidatePath } from "next/cache";

import { Task } from "./Task";
import { Task as DBTask } from "@/app/dashboard/lists/page";
import { CompletedTask } from "./CompletedTask";
import { double, year } from "drizzle-orm/mysql-core";
import { bigint } from "drizzle-orm/pg-core";

type TasksProps = {
  tasks: DBTask[];
  completed: boolean;
};

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

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
          console.log("in ! completed tasks");
          return <Task task={task} key={task.taskId} />;
        })}
      {completed &&
        filteredTasks.map((task) => {
          return <CompletedTask task={task} key={task.taskId} />;
        })}
    </ul>
  );
}
