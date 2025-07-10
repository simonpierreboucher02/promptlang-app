import { apiRequest } from "./queryClient";

export interface InputField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface Prompt {
  id: number;
  title: string;
  description: string;
  category: string;
  promptText: string;
  role: string;
  inputType: string;
  objective: string;
  outputFormat: string;
  modelCompatibility: string[];
  inputFields: InputField[];
  promptType: "text" | "image";
  rating: number;
  usageCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalPrompts: number;
  totalSearches: number;
  totalTests: number;
}

export interface RecentGeneration {
  id: number;
  promptId: number;
  promptTitle: string;
  input: string;
  output: string;
  model: string;
  createdAt: string;
}

export const api = {
  // Public API
  async getPrompts(): Promise<Prompt[]> {
    const response = await apiRequest("GET", "/api/prompts");
    return response.json();
  },

  async searchPrompts(query: string): Promise<Prompt[]> {
    const response = await apiRequest("GET", `/api/prompts/search?q=${encodeURIComponent(query)}`);
    return response.json();
  },

  async getPrompt(id: number): Promise<Prompt> {
    const response = await apiRequest("GET", `/api/prompts/${id}`);
    return response.json();
  },

  async testPrompt(id: number, inputs: Record<string, any>, model: string): Promise<{ output: string }> {
    const response = await apiRequest("POST", `/api/prompts/${id}/test`, { inputs, model });
    return response.json();
  },

  // Admin API
  async createPrompt(prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>, password: string): Promise<Prompt> {
    const response = await fetch("/api/admin/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${password}`
      },
      body: JSON.stringify(prompt)
    });
    
    if (!response.ok) {
      throw new Error("Failed to create prompt");
    }
    
    return response.json();
  },

  async updatePrompt(id: number, prompt: Partial<Prompt>, password: string): Promise<Prompt> {
    const response = await fetch(`/api/admin/prompts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${password}`
      },
      body: JSON.stringify(prompt)
    });
    
    if (!response.ok) {
      throw new Error("Failed to update prompt");
    }
    
    return response.json();
  },

  async deletePrompt(id: number, password: string): Promise<void> {
    const response = await fetch(`/api/admin/prompts/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${password}`
      }
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete prompt");
    }
  },

  async getAdminStats(password: string): Promise<AdminStats> {
    const response = await fetch("/api/admin/stats", {
      headers: {
        "Authorization": `Bearer ${password}`
      }
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch admin stats");
    }
    
    return response.json();
  },

  async getRecentGenerations(): Promise<RecentGeneration[]> {
    const response = await fetch('/api/recent-generations');

    if (!response.ok) {
      throw new Error('Failed to fetch recent generations');
    }

    return response.json();
  }
};
