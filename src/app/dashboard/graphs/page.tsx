import { auth } from "@/auth";
import {
  listsTable,
  taskInstancesTable,
  tasksTable,
  symptomsTable,
  symptomInstancesTable,
} from "@/db/schema";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";

import { compileLists } from "../lists/page";
import { compileSymptoms } from "../symptoms/page";
import { getUserCategories } from "../symptoms/page";

import Side from "@/components/UI/Side";
import { ChooseItems } from "@/components/graphs/ChooseItems";

// types?

export default async function page() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;

  const symptomLists = await compileSymptoms(userId);
  const toDoLists = await compileLists(userId);
  const categories = await getUserCategories(userId);
  console.log(categories);

  return (
    <div className="flex flex-col md:flex-row justify-around min-h-full gap-4">
      <Side>
        <ChooseItems />
      </Side>
      <Side>Graphs will be over here</Side>
    </div>
  );
}
