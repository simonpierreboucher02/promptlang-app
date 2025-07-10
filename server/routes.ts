import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPromptSchema, insertPromptTestSchema } from "@shared/schema";
import { testPromptWithOpenAI } from "./services/openai";
import { testPromptWithAnthropic } from "./services/anthropic";
import { testImagePromptWithDalle } from "./services/dalle";
import { z } from "zod";

const ADMIN_PASSWORD = "2509-1991";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all prompts
  app.get("/api/prompts", async (req, res) => {
    try {
      const prompts = await storage.getAllPrompts();
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prompts" });
    }
  });

  // Search prompts
  app.get("/api/prompts/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }
      
      const prompts = await storage.searchPrompts(query);
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ error: "Failed to search prompts" });
    }
  });

  // Get prompt by ID
  app.get("/api/prompts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const prompt = await storage.getPromptById(id);
      
      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }
      
      res.json(prompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prompt" });
    }
  });

  // Test prompt with AI models (OpenAI or Anthropic)
  app.post("/api/prompts/:id/test", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { inputs, model } = req.body;
      
      if (!inputs || !model) {
        return res.status(400).json({ error: "Inputs and model are required" });
      }
      
      const prompt = await storage.getPromptById(id);
      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }
      
      let result;
      let outputType = "text";
      
      // Determine which API to use based on model name
      if (model.startsWith('claude-')) {
        result = await testPromptWithAnthropic(prompt.promptText, inputs, model);
      } else if (model.startsWith('dall-e-')) {
        // Handle DALL-E image generation
        console.log("Testing image prompt with DALL-E:", { model, inputs });
        const imageResult = await testImagePromptWithDalle(prompt.promptText, inputs, model);
        console.log("DALL-E result:", imageResult);
        result = imageResult;
        outputType = "image";
      } else {
        result = await testPromptWithOpenAI(prompt.promptText, inputs, model);
      }
      
      // Save the test result
      const outputText = typeof result === 'string' ? result : result.output;
      await storage.createPromptTest({
        promptId: id,
        input: JSON.stringify(inputs),
        output: outputText,
        outputType,
        model
      });
      
      // Increment usage count
      await storage.incrementPromptUsage(id);
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to test prompt" });
    }
  });

  // Admin authentication middleware
  const requireAdmin = (req: any, res: any, next: any) => {
    const password = req.headers.authorization?.replace('Bearer ', '');
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };

  // Admin: Create prompt
  app.post("/api/admin/prompts", requireAdmin, async (req, res) => {
    try {
      const promptData = insertPromptSchema.parse(req.body);
      const prompt = await storage.createPrompt(promptData);
      res.json(prompt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid prompt data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create prompt" });
    }
  });

  // Admin: Update prompt
  app.put("/api/admin/prompts/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const promptData = insertPromptSchema.partial().parse(req.body);
      const prompt = await storage.updatePrompt(id, promptData);
      res.json(prompt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid prompt data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update prompt" });
    }
  });

  // Admin: Delete prompt
  app.delete("/api/admin/prompts/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePrompt(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete prompt" });
    }
  });

  // Admin: Get stats
  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const prompts = await storage.getAllPrompts();
      const totalPrompts = prompts.length;
      const totalSearches = prompts.reduce((sum, p) => sum + (p.usageCount || 0), 0);
      const totalTests = totalSearches; // Simplified for now
      
      res.json({
        totalPrompts,
        totalSearches,
        totalTests
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Get recent generations
  app.get("/api/recent-generations", async (req, res) => {
    try {
      const recentGenerations = await storage.getRecentGenerations();
      res.json(recentGenerations);
    } catch (error) {
      console.error("Error getting recent generations:", error);
      res.status(500).json({ error: "Failed to get recent generations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
