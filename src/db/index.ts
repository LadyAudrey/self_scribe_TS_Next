import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

if (!process.env.POSTGRES_URL) {
  throw new Error("environment variable POSTGRES_URL not set");
}

const db = drizzle(sql);

export { db };
