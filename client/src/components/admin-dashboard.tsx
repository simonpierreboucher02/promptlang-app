import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search, Play, Plus, Edit, Trash2, X, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    promptText: "",
    role: "",
    inputType: "",
    objective: "",
    outputFormat: "",
    modelCompatibility: [] as string[],
    inputFields: [] as any[],
    promptType: "text" as "text" | "image",
    rating: 0,
    tags: [] as string[],
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const adminPassword = localStorage.getItem("adminPassword") || "";
  
  // Template JSON pour l'exemple
  const promptTemplate = {
    title: "Exemple de Prompt",
    description: "Description détaillée du prompt",
    category: "Nouvelle Catégorie",
    promptText: "Vous êtes un expert en {domaine}. Votre tâche est de {tache} en tenant compte de {contexte}.",
    role: "Expert consultant",
    inputType: "Texte structuré",
    objective: "Fournir une analyse experte",
    outputFormat: "Réponse structurée avec points clés",
    modelCompatibility: ["claude-sonnet-4-20250514", "gpt-4o"],
    promptType: "text",
    inputFields: [
      {
        name: "domaine",
        label: "Domaine d'expertise",
        type: "text",
        placeholder: "ex: marketing digital, finance",
        required: true
      },
      {
        name: "tache",
        label: "Tâche à accomplir",
        type: "textarea",
        placeholder: "Décrivez la tâche à accomplir",
        required: true
      },
      {
        name: "contexte",
        label: "Contexte",
        type: "text",
        placeholder: "Contexte spécifique",
        required: false
      }
    ],
    rating: 4.5,
    tags: ["exemple", "template"]
  };

  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: () => api.getAdminStats(adminPassword),
  });

  const { data: prompts = [] } = useQuery({
    queryKey: ["/api/prompts"],
    queryFn: () => api.getPrompts(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.createPrompt(data, adminPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prompts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setIsAddModalOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Prompt created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create prompt.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: number; prompt: any }) => 
      api.updatePrompt(data.id, data.prompt, adminPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prompts"] });
      setEditingPrompt(null);
      resetForm();
      toast({
        title: "Success",
        description: "Prompt updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update prompt.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deletePrompt(id, adminPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prompts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Success",
        description: "Prompt deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete prompt.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      promptText: "",
      role: "",
      inputType: "",
      objective: "",
      outputFormat: "",
      modelCompatibility: [],
      inputFields: [],
      promptType: "text",
      rating: 0,
      tags: [],
    });
  };

  // Fonction pour télécharger le template JSON
  const downloadTemplate = () => {
    const dataStr = JSON.stringify(promptTemplate, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'prompt-template.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Template téléchargé",
      description: "Le template JSON a été téléchargé avec succès.",
    });
  };

  // Fonction pour importer un JSON (prompt unique)
  const importJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        console.log('JSON importé:', jsonData);
        
        // Validation des champs requis
        const requiredFields = ['title', 'description', 'category', 'promptText', 'role', 'inputType', 'objective', 'outputFormat'];
        const missingFields = requiredFields.filter(field => !jsonData[field]);
        
        if (missingFields.length > 0) {
          toast({
            title: "Erreur d'importation",
            description: `Champs manquants: ${missingFields.join(', ')}`,
            variant: "destructive",
          });
          return;
        }

        // D'abord vider le formulaire
        resetForm();
        
        // Ensuite remplir avec les nouvelles données (avec un petit délai pour laisser le DOM se mettre à jour)
        setTimeout(() => {
          const newFormData = {
            title: jsonData.title || "",
            description: jsonData.description || "",
            category: jsonData.category || "",
            promptText: jsonData.promptText || "",
            role: jsonData.role || "",
            inputType: jsonData.inputType || "",
            objective: jsonData.objective || "",
            outputFormat: jsonData.outputFormat || "",
            modelCompatibility: Array.isArray(jsonData.modelCompatibility) ? jsonData.modelCompatibility : [],
            inputFields: Array.isArray(jsonData.inputFields) ? jsonData.inputFields : [],
            promptType: jsonData.promptType || "text",
            rating: jsonData.rating || 0,
            tags: Array.isArray(jsonData.tags) ? jsonData.tags : [],
          };
          
          console.log('Nouvelles données du formulaire:', newFormData);
          setFormData(newFormData);
        }, 100);

        toast({
          title: "Import réussi",
          description: `Données importées: ${jsonData.title}`,
        });
      } catch (error) {
        console.error('Erreur lors de l\'import:', error);
        toast({
          title: "Erreur d'importation",
          description: "Le fichier JSON est invalide.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    
    // Reset l'input file
    event.target.value = '';
  };

  // Fonction pour importer plusieurs prompts en lot
  const importBatchJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let prompts: any[] = [];
        
        // Essayer d'abord de parser comme un tableau JSON
        try {
          const jsonData = JSON.parse(content);
          if (Array.isArray(jsonData)) {
            prompts = jsonData;
          } else {
            // Si c'est un objet unique, le mettre dans un tableau
            prompts = [jsonData];
          }
        } catch {
          // Si le parsing JSON échoue, essayer de séparer par des délimiteurs
          const delimiter = content.includes('---') ? '---' : 
                           content.includes('===') ? '===' : 
                           content.includes('###') ? '###' : null;
          
          if (delimiter) {
            const parts = content.split(delimiter);
            prompts = parts.map(part => {
              try {
                return JSON.parse(part.trim());
              } catch {
                return null;
              }
            }).filter(Boolean);
          } else {
            throw new Error('Format non reconnu');
          }
        }

        if (prompts.length === 0) {
          toast({
            title: "Erreur d'importation",
            description: "Aucun prompt valide trouvé dans le fichier.",
            variant: "destructive",
          });
          return;
        }

        // Valider chaque prompt
        const requiredFields = ['title', 'description', 'category', 'promptText', 'role', 'inputType', 'objective', 'outputFormat'];
        let validPrompts = 0;
        let invalidPrompts = 0;

        for (const prompt of prompts) {
          const missingFields = requiredFields.filter(field => !prompt[field]);
          if (missingFields.length === 0) {
            // Créer le prompt
            createMutation.mutate({
              title: prompt.title,
              description: prompt.description,
              category: prompt.category,
              promptText: prompt.promptText,
              role: prompt.role,
              inputType: prompt.inputType,
              objective: prompt.objective,
              outputFormat: prompt.outputFormat,
              modelCompatibility: Array.isArray(prompt.modelCompatibility) ? prompt.modelCompatibility : [],
              inputFields: Array.isArray(prompt.inputFields) ? prompt.inputFields : [],
              rating: prompt.rating || 0,
              tags: Array.isArray(prompt.tags) ? prompt.tags : [],
            });
            validPrompts++;
          } else {
            console.warn(`Prompt ignoré (${prompt.title || 'Sans titre'}): champs manquants - ${missingFields.join(', ')}`);
            invalidPrompts++;
          }
        }

        toast({
          title: "Import en lot terminé",
          description: `${validPrompts} prompts importés avec succès${invalidPrompts > 0 ? `, ${invalidPrompts} ignorés` : ''}.`,
        });

      } catch (error) {
        console.error('Erreur lors de l\'import en lot:', error);
        toast({
          title: "Erreur d'importation",
          description: "Le fichier n'est pas dans un format valide.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    
    // Reset l'input file
    event.target.value = '';
  };

  // Fonction pour télécharger un template JSON avec plusieurs prompts
  const downloadBatchTemplate = () => {
    const batchTemplate = [
      {
        title: "Exemple Prompt 1",
        description: "Premier prompt d'exemple",
        category: "Exemple",
        promptText: "Vous êtes un assistant expert en {domaine}. Analysez {sujet} et fournissez une réponse détaillée.",
        role: "Expert consultant",
        inputType: "Texte structuré",
        objective: "Fournir une analyse experte",
        outputFormat: "Réponse structurée",
        modelCompatibility: ["claude-sonnet-4-20250514", "gpt-4o"],
        inputFields: [
          {
            name: "domaine",
            label: "Domaine d'expertise",
            type: "text",
            placeholder: "ex: marketing, finance",
            required: true
          },
          {
            name: "sujet",
            label: "Sujet à analyser",
            type: "textarea",
            placeholder: "Décrivez le sujet à analyser",
            required: true
          }
        ],
        rating: 5,
        tags: ["exemple", "template", "analyse"]
      },
      {
        title: "Exemple Prompt 2",
        description: "Deuxième prompt d'exemple",
        category: "Nouvelle Catégorie",
        promptText: "En tant qu'expert en {specialite}, créez un plan d'action pour {objectif}.",
        role: "Planificateur stratégique",
        inputType: "Objectifs définis",
        objective: "Créer un plan d'action",
        outputFormat: "Plan étape par étape",
        modelCompatibility: ["gpt-4o", "claude-opus-4-20250514"],
        inputFields: [
          {
            name: "specialite",
            label: "Spécialité",
            type: "text",
            placeholder: "ex: gestion de projet, marketing",
            required: true
          },
          {
            name: "objectif",
            label: "Objectif à atteindre",
            type: "textarea",
            placeholder: "Décrivez l'objectif à atteindre",
            required: true
          }
        ],
        rating: 4,
        tags: ["planification", "stratégie", "exemple"]
      }
    ];
    
    const dataStr = JSON.stringify(batchTemplate, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'prompts-batch-template.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Template téléchargé",
      description: "Le template JSON pour l'import en lot a été téléchargé avec succès.",
    });
  };

  // Fonction pour télécharger un template avec délimiteurs
  const downloadDelimitedTemplate = () => {
    const delimitedTemplate = `{
  "title": "Exemple Prompt 1",
  "description": "Premier prompt d'exemple",
  "category": "Exemple",
  "promptText": "Vous êtes un assistant expert en {domaine}. Analysez {sujet} et fournissez une réponse détaillée.",
  "role": "Expert consultant",
  "inputType": "Texte structuré",
  "objective": "Fournir une analyse experte",
  "outputFormat": "Réponse structurée",
  "modelCompatibility": ["claude-sonnet-4-20250514", "gpt-4o"],
  "inputFields": [
    {
      "name": "domaine",
      "label": "Domaine d'expertise",
      "type": "text",
      "placeholder": "ex: marketing, finance",
      "required": true
    }
  ],
  "rating": 5,
  "tags": ["exemple", "template"]
}
---
{
  "title": "Exemple Prompt 2",
  "description": "Deuxième prompt d'exemple",
  "category": "Nouvelle Catégorie",
  "promptText": "En tant qu'expert en {specialite}, créez un plan d'action pour {objectif}.",
  "role": "Planificateur stratégique",
  "inputType": "Objectifs définis",
  "objective": "Créer un plan d'action",
  "outputFormat": "Plan étape par étape",
  "modelCompatibility": ["gpt-4o", "claude-opus-4-20250514"],
  "inputFields": [
    {
      "name": "specialite",
      "label": "Spécialité",
      "type": "text",
      "placeholder": "ex: gestion de projet, marketing",
      "required": true
    }
  ],
  "rating": 4,
  "tags": ["planification", "stratégie"]
}`;
    
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(delimitedTemplate);
    
    const exportFileDefaultName = 'prompts-delimited-template.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Template avec délimiteurs téléchargé",
      description: "Le template avec délimiteurs --- a été téléchargé avec succès.",
    });
  };

  // Fonction pour exporter un prompt existant en JSON
  const exportPrompt = (prompt: any) => {
    const exportData = {
      title: prompt.title,
      description: prompt.description,
      category: prompt.category,
      promptText: prompt.promptText,
      role: prompt.role,
      inputType: prompt.inputType,
      objective: prompt.objective,
      outputFormat: prompt.outputFormat,
      modelCompatibility: prompt.modelCompatibility,
      inputFields: prompt.inputFields,
      rating: prompt.rating,
      tags: prompt.tags,
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `prompt-${prompt.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Prompt exporté",
      description: "Le prompt a été exporté en JSON avec succès.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPrompt) {
      updateMutation.mutate({ id: editingPrompt, prompt: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (prompt: any) => {
    setFormData({
      title: prompt.title,
      description: prompt.description,
      category: prompt.category,
      promptText: prompt.promptText,
      role: prompt.role,
      inputType: prompt.inputType,
      objective: prompt.objective,
      outputFormat: prompt.outputFormat,
      modelCompatibility: prompt.modelCompatibility,
      inputFields: prompt.inputFields || [],
      promptType: prompt.promptType || "text",
      rating: prompt.rating,
      tags: prompt.tags,
    });
    setEditingPrompt(prompt.id);
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this prompt?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="h-full flex flex-col">
        {/* Admin Header */}
        <div className="bg-slate-900 text-white p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">PromptLang Admin</h1>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Admin Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Prompts</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {stats?.totalPrompts || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Total Searches</p>
                      <p className="text-2xl font-bold text-green-900">
                        {stats?.totalSearches || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Search className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Tests Run</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {stats?.totalTests || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Play className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          resetForm();
                          setEditingPrompt(null);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Prompt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <div className="flex items-center justify-between">
                          <DialogTitle>
                            {editingPrompt ? "Edit Prompt" : "Add New Prompt"}
                          </DialogTitle>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={downloadTemplate}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Template JSON
                            </Button>
                            <div>
                              <input
                                type="file"
                                accept=".json"
                                onChange={importJSON}
                                className="hidden"
                                id="json-import"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('json-import')?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Import JSON
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Import en lot */}
                        <div className="border-t pt-4">
                          <Label className="text-sm font-medium mb-2 block">Import en lot</Label>
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={downloadBatchTemplate}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Template Tableau
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={downloadDelimitedTemplate}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Template Délimiteurs
                            </Button>
                            <div>
                              <input
                                type="file"
                                accept=".json"
                                onChange={importBatchJSON}
                                className="hidden"
                                id="json-batch-import"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('json-batch-import')?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Import Lot
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Formats supportés: Tableau JSON ou prompts séparés par ---, ===, ou ###
                          </p>
                        </div>
                      </DialogHeader>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                              id="category"
                              value={formData.category}
                              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                              placeholder="Enter or select category"
                              list="categories"
                              required
                            />
                            <datalist id="categories">
                              <option value="Code Generation" />
                              <option value="Email Writing" />
                              <option value="Document Analysis" />
                              <option value="Content Creation" />
                              <option value="Debugging" />
                              <option value="Social Media" />
                              <option value="Image Generation" />
                            </datalist>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="promptType">Prompt Type</Label>
                            <Select
                              value={formData.promptType}
                              onValueChange={(value: "text" | "image") => setFormData({ ...formData, promptType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select prompt type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text Generation</SelectItem>
                                <SelectItem value="image">Image Generation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="modelCompatibility">Model Compatibility (comma-separated)</Label>
                            <Input
                              id="modelCompatibility"
                              value={formData.modelCompatibility.join(", ")}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                modelCompatibility: e.target.value.split(",").map(s => s.trim()) 
                              })}
                              placeholder={formData.promptType === "image" ? "dall-e-3, dall-e-2" : "claude-sonnet-4-20250514, gpt-4o"}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="promptText">Prompt Text</Label>
                          <Textarea
                            id="promptText"
                            value={formData.promptText}
                            onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
                            rows={6}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="role">Role</Label>
                            <Input
                              id="role"
                              value={formData.role}
                              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="inputType">Input Type</Label>
                            <Input
                              id="inputType"
                              value={formData.inputType}
                              onChange={(e) => setFormData({ ...formData, inputType: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="objective">Objective</Label>
                          <Textarea
                            id="objective"
                            value={formData.objective}
                            onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="outputFormat">Output Format</Label>
                          <Input
                            id="outputFormat"
                            value={formData.outputFormat}
                            onChange={(e) => setFormData({ ...formData, outputFormat: e.target.value })}
                            required
                          />
                        </div>



                        <div className="flex justify-end space-x-3">
                          <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={createMutation.isPending || updateMutation.isPending}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            {editingPrompt ? "Update" : "Create"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Prompts Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Uses</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prompts.map((prompt) => (
                      <TableRow key={prompt.id}>
                        <TableCell>
                          <div className="font-medium">{prompt.title}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{prompt.category}</Badge>
                        </TableCell>
                        <TableCell>{prompt.rating || 0}</TableCell>
                        <TableCell>{prompt.usageCount || 0}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => exportPrompt(prompt)}
                              className="text-green-600 hover:text-green-700"
                              title="Export JSON"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(prompt)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(prompt.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
