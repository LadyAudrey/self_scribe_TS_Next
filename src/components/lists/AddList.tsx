import { auth } from "@/auth";
import { db } from "@/db";
import { listsTable } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { AddListForm } from "./AddListForm";

export async function AddList() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;
  async function addList(_prevState: { message: string }, formData: FormData) {
    "use server";
    const name = formData.get("name") as string | null;
    if (!name) {
      return { message: "Failed to create list" };
    }
    try {
      await db.insert(listsTable).values({ name, userId });
      revalidatePath("/dashboard/lists");
      return { message: "" };
    } catch (error) {
      console.error(error);
      return { message: "Failed to create list" };
    }
  }
  return <AddListForm addList={addList} />;
}
