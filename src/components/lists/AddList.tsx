import { auth } from "@/auth";
import { db } from "@/db";
import { listsTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function AddList() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const userId = session.user.id!;
  async function addList(formData: FormData) {
    "use server";
    const name = formData.get("name") as string | null;
    if (!name) {
      return;
    }
    try {
      await db.insert(listsTable).values({ name, userId });
      revalidatePath("/dashboard/lists");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form action={addList} className="flex gap-2">
      <input type="text" name="name" className="text-black" />
      <button type="submit">Add List</button>
    </form>
  );
}
