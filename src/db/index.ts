import { sql } from "@vercel/postgres";
import postgres from "postgres";
import {
  drizzle as VercelDrizzle,
  VercelPgDatabase,
} from "drizzle-orm/vercel-postgres";
import {
  drizzle as LocalDrizzle,
  PostgresJsDatabase,
} from "drizzle-orm/postgres-js";

if (!process.env.POSTGRES_URL) {
  throw new Error("environment variable POSTGRES_URL not set");
}
let db: VercelPgDatabase | PostgresJsDatabase;

if (process.env.NODE_ENV === "production") {
  db = VercelDrizzle(sql);
} else {
  const migrationClient = postgres(process.env.POSTGRES_URL!);
  db = LocalDrizzle(migrationClient);
}

export { db };
