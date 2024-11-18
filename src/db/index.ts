import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema"

if (!process.env.POSTGRES_URL) {
  throw new Error("environment variable POSTGRES_URL not set");
}

export const db = drizzle(sql, { schema });

