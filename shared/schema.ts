import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const prompts = pgTable("prompts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  promptText: text("prompt_text").notNull(),
  role: text("role").notNull(),
  inputType: text("input_type").notNull(),
  objective: text("objective").notNull(),
  outputFormat: text("output_format").notNull(),
  modelCompatibility: text("model_compatibility").array().notNull(),
  inputFields: jsonb("input_fields").default([]),
  promptType: text("prompt_type").notNull().default("text"), // "text" or "image"
  rating: integer("rating").default(0),
  usageCount: integer("usage_count").default(0),
  tags: text("tags").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const promptTests = pgTable("prompt_tests", {
  id: serial("id").primaryKey(),
  promptId: integer("prompt_id").references(() => prompts.id),
  input: text("input").notNull(),
  output: text("output").notNull(),
  outputType: text("output_type").notNull().default("text"), // "text" or "image"
  model: text("model").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPromptSchema = createInsertSchema(prompts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPromptTestSchema = createInsertSchema(promptTests).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPrompt = z.infer<typeof insertPromptSchema>;
export type Prompt = typeof prompts.$inferSelect;
export type InsertPromptTest = z.infer<typeof insertPromptTestSchema>;
export type PromptTest = typeof promptTests.$inferSelect;
