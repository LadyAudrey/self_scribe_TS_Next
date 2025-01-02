import { auth } from "@/auth";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default function Symptoms() {
  return (
    <div>Symptoms</div>
  )
}
