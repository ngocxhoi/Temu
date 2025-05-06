import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar").notNull(),
  timestamp: text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("authorId")
    .notNull()
    .references(() => users.id),
  // createdAt: integer("createdAt", {
  //   mode: "timestamp",
  // }).notNull(),
  // updatedAt: integer("updatedAt", {
  //   mode: "timestamp",
  // }),
  timestamp: text().default(sql`(CURRENT_TIMESTAMP)`),
});
