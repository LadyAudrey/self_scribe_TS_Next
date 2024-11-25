import { auth } from "@/auth";
import { db } from "@/db";
import { lists } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// logic for the end points of CRUD ops
export const GET = auth(async function GET(req) {
  if (!req.auth || !req.auth.user) {
    return NextResponse.json({ message: "not authenticated" }, { status: 401 });
  }
  const id = req.auth.user.id!;
  //   should be an array of obj
  const result = await db.select().from(lists).where(eq(lists.userId, id));
  return NextResponse.json({ lists: result });
});
