import Side from "@/components/UI/Side";
import { Lists } from "@/components/lists/Lists";
import { AddList } from "@/components/lists/AddList";
import { auth } from "@/auth";
import { listsTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { AddTask } from "@/components/tasks/AddTask";
export default async function page() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;

  const toDoLists = await db
    .select()
    .from(listsTable)
    .where(eq(listsTable.userId, userId));
  //TODO: update to import taskInstances as well
  return (
    <div className="flex flex-col md:flex-row justify-around min-h-full gap-4">
      <Side>
        <div className="flex flex-col">
          <div className="text-2xl">To Do List</div>
          <Lists toDoLists={toDoLists} />
          <AddList />
        </div>{" "}
      </Side>
      <Side>
        <p>placeholder for completed tasks</p>
      </Side>
    </div>
  );
}
