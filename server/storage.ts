import { users, prompts, promptTests, type User, type InsertUser, type Prompt, type InsertPrompt, type PromptTest, type InsertPromptTest } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, sql, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Prompt management
  getAllPrompts(): Promise<Prompt[]>;
  getPromptById(id: number): Promise<Prompt | undefined>;
  searchPrompts(query: string): Promise<Prompt[]>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
  updatePrompt(id: number, prompt: Partial<InsertPrompt>): Promise<Prompt>;
  deletePrompt(id: number): Promise<void>;
  incrementPromptUsage(id: number): Promise<void>;
  
  // Prompt tests
  getPromptTests(promptId: number): Promise<PromptTest[]>;
  createPromptTest(test: InsertPromptTest): Promise<PromptTest>;
  
  // Recent generations
  getRecentGenerations(): Promise<Array<PromptTest & { promptTitle: string }>>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllPrompts(): Promise<Prompt[]> {
    return await db.select().from(prompts).orderBy(sql`${prompts.rating} DESC, ${prompts.usageCount} DESC`);
  }

  async getPromptById(id: number): Promise<Prompt | undefined> {
    const [prompt] = await db.select().from(prompts).where(eq(prompts.id, id));
    return prompt || undefined;
  }

  async searchPrompts(query: string): Promise<Prompt[]> {
    const searchTerm = `%${query}%`;
    return await db
      .select()
      .from(prompts)
      .where(
        or(
          ilike(prompts.title, searchTerm),
          ilike(prompts.description, searchTerm),
          ilike(prompts.category, searchTerm),
          sql`${prompts.tags} && ARRAY[${query}]::text[]`
        )
      )
      .orderBy(sql`${prompts.rating} DESC, ${prompts.usageCount} DESC`);
  }

  async createPrompt(prompt: InsertPrompt): Promise<Prompt> {
    const [newPrompt] = await db
      .insert(prompts)
      .values(prompt)
      .returning();
    return newPrompt;
  }

  async updatePrompt(id: number, prompt: Partial<InsertPrompt>): Promise<Prompt> {
    const [updatedPrompt] = await db
      .update(prompts)
      .set({ ...prompt, updatedAt: new Date() })
      .where(eq(prompts.id, id))
      .returning();
    return updatedPrompt;
  }

  async deletePrompt(id: number): Promise<void> {
    try {
      // D'abord supprimer tous les tests associés à ce prompt
      await db.delete(promptTests).where(eq(promptTests.promptId, id));
      
      // Ensuite supprimer le prompt lui-même
      await db.delete(prompts).where(eq(prompts.id, id));
    } catch (error) {
      console.error(`Erreur lors de la suppression du prompt ${id}:`, error);
      throw error;
    }
  }

  async incrementPromptUsage(id: number): Promise<void> {
    await db
      .update(prompts)
      .set({ usageCount: sql`${prompts.usageCount} + 1` })
      .where(eq(prompts.id, id));
  }

  async getPromptTests(promptId: number): Promise<PromptTest[]> {
    return await db
      .select()
      .from(promptTests)
      .where(eq(promptTests.promptId, promptId))
      .orderBy(sql`${promptTests.createdAt} DESC`);
  }

  async createPromptTest(test: InsertPromptTest): Promise<PromptTest> {
    const [newTest] = await db
      .insert(promptTests)
      .values(test)
      .returning();
    return newTest;
  }

  async getRecentGenerations(): Promise<Array<PromptTest & { promptTitle: string }>> {
    const generations = await db
      .select({
        id: promptTests.id,
        promptId: promptTests.promptId,
        input: promptTests.input,
        output: promptTests.output,
        outputType: promptTests.outputType,
        model: promptTests.model,
        createdAt: promptTests.createdAt,
        promptTitle: prompts.title
      })
      .from(promptTests)
      .innerJoin(prompts, eq(promptTests.promptId, prompts.id))
      .where(eq(promptTests.outputType, 'image'))
      .orderBy(sql`${promptTests.createdAt} DESC`)
      .limit(20);
    
    return generations;
  }
}

export const storage = new DatabaseStorage();
