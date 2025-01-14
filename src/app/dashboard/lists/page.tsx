import Side from "@/components/UI/Side";
import { ListsPane } from "@/components/lists/ListsPane";
import { AddList } from "@/components/lists/AddList";
import { auth } from "@/auth";
import { listsTable, taskInstancesTable, tasksTable } from "@/db/schema";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { AddTask } from "@/components/tasks/AddTask";
import { CompletedPane } from "@/components/lists/CompletedPane";

export type Lists = List[];

export type List = {
  name: string;
  userId: string;
  listId: string;
  description: string | null;
  createdOn: Date | null;
  lastUpdated: Date | null;
  tasks: Task[];
};

export type Task = {
  name: string;
  userId: string;
  listId: string;
  description: string | null;
  createdOn: Date | null;
  lastUpdated: Date | null;
  taskId: string;
  repeats: boolean | null;
  frequency: string | null;
  instances: TaskInstance[];
};

export type TaskInstance = {
  userId: string;
  listId: string;
  createdOn: Date | null;
  lastUpdated: Date | null;
  taskId: string;
  instanceId: string;
  completed: boolean | null;
};

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export default async function page() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;

  const toDoLists = await compileLists(userId);
  return (
    <div className="flex flex-col md:flex-row justify-around min-h-full gap-4">
      <Side>
        <div className="flex flex-col">
          <div className="text-2xl">To Do List</div>
          <ListsPane toDoLists={toDoLists} />
          <AddList />
        </div>
      </Side>
      <Side>
        <div className="flex flex-col">
          <div className="text-2xl">Completed</div>
          <CompletedPane toDoLists={toDoLists} />
        </div>
      </Side>
    </div>
  );
}

async function compileLists(userId: string) {
  const toDoLists = await db
    .select()
    .from(listsTable)
    .where(eq(listsTable.userId, userId))
    .orderBy(listsTable.createdOn);
  const newLists = await Promise.all(
    toDoLists.map(async (list) => {
      const tasks = await db
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.listId, list.listId))
        .orderBy(tasksTable.createdOn);
      const newTasks = await Promise.all(
        tasks.map(async (task) => {
          const newTask: Task = {
            name: task.name,
            userId: task.userId,
            listId: task.listId,
            description: task.description,
            createdOn: task.createdOn,
            lastUpdated: task.lastUpdated,
            taskId: task.taskId,
            repeats: task.repeats,
            frequency: task.frequency,
            instances: [],
          };
          const taskInstances = await db
            .select()
            .from(taskInstancesTable)
            .where(eq(taskInstancesTable.taskId, task.taskId))
            .orderBy(desc(taskInstancesTable.createdOn))
            .limit(31);
          newTask.instances = taskInstances;
          const lastPopulated = task.lastPopulated!;
          const dayNumber = Math.floor(
            lastPopulated.getTime() / DAY_IN_MILLISECONDS
          );
          const todayNumber = Math.floor(Date.now() / DAY_IN_MILLISECONDS);
          if (dayNumber === todayNumber) {
            return newTask;
          }
          const [activeString, inactiveString] = task.frequency.split(":");
          const active = parseInt(activeString);
          const inactive = parseInt(inactiveString);
          if (isNaN(active) || isNaN(inactive)) {
            return newTask;
          }

          return newTask;
        })
      );
      return {
        name: list.name,
        userId: list.userId,
        listId: list.listId,
        description: list.description,
        createdOn: list.createdOn,
        lastUpdated: list.lastUpdated,
        tasks: newTasks,
      };
    })
  );
  return newLists;
}

function generateFrequencyGraph(
  taskInstances: TaskInstance[],
  active: number,
  inactive: number
) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = 0;
  const previousFrequencies = taskInstances.map((instance) => {
    const dayNumber = Math.floor(
      instance.createdOn!.getTime() / DAY_IN_MILLISECONDS
    );
    min = Math.min(min, dayNumber);
    max = Math.max(max, dayNumber);
    return {
      dayNumber,
      active: true,
    };
  });
  // create variable to store the day of the last completed frequency
  // use variable to create an [{}] that tell us what to populate in the DB
  return [];
}
