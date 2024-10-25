import { sql, SQL } from "drizzle-orm";
import { AnyPgColumn, integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull()
},
  (table) => {
    // Enforces both, lowcasing and unique contraint
    return { emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(lower(table.email)) }
  }
);

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`
}
