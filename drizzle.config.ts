import assert from "assert";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.POSTGRES_URL;

assert(url, "environment variable POSTGRES_URL not set");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
