import { auth } from "@/auth";
import { db } from "@/db";
import { lists } from "@/db/schema";

export default async function AddList() {
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
    db.insert(lists).values({ name, userId });
  }
  return (
    <form action={addList}>
      <input type="text" name="name" />
      <button type="submit">Add List</button>
    </form>
  );
}
