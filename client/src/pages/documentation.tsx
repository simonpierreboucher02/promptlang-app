import { useState } from "react";
import { Link } from "wouter";
import { 
  Search, 
  ArrowLeft, 
  BookOpen, 
  Zap, 
  Users, 
  Settings, 
  FileText,
  Play,
  Database,
  Upload,
  Edit,
  Trash2,
  Eye,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/footer";

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const navigationItems = [
    { id: "getting-started", label: "Getting Started", icon: BookOpen },
    { id: "search", label: "Search", icon: Search },
    { id: "testing", label: "Prompt Testing", icon: Play },
    { id: "admin", label: "Administration", icon: Settings },
    { id: "api", label: "API", icon: Database },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="text-white h-5 w-5" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Documentation
                </span>
              </div>
            </div>
            <Link href="/">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Search className="text-white h-4 w-4" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  PromptLang
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 sticky top-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Navigation</h2>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              
              {/* Getting Started */}
              {activeSection === "getting-started" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                      Welcome to PromptLang
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                      PromptLang is your reference platform for discovering, analyzing and testing the best prompts for your artificial intelligence projects.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Search className="h-5 w-5 text-blue-600" />
                          Advanced Search
                        </CardTitle>
                        <CardDescription>
                          Quickly find the perfect prompts for your needs
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">
                          Use keywords, filter by category, and explore our carefully curated collection of prompts.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-purple-600" />
                          Integrated Testing
                        </CardTitle>
                        <CardDescription>
                          Test your prompts directly in the interface
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">
                          Connect to OpenAI and Claude APIs to test your prompts in real-time.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-emerald-600" />
                          Collaborative Management
                        </CardTitle>
                        <CardDescription>
                          Manage your prompts with powerful tools
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">
                          Create, edit and organize your prompts with our intuitive administration interface.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-orange-600" />
                          Import/Export
                        </CardTitle>
                        <CardDescription>
                          Manage your prompts in bulk easily
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">
                          Import and export your prompts in JSON format for efficient management.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Search Section */}
              {activeSection === "search" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                      Prompt Search
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                      Learn how to effectively use our search system to find the perfect prompts.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Keyword Search</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600">
                          Type keywords in the search bar to find relevant prompts:
                        </p>
                        <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm">
                          <div className="space-y-2">
                            <div>• "Python code" → Prompts for generating Python code</div>
                            <div>• "professional email" → Prompts for writing emails</div>
                            <div>• "document summary" → Prompts for summarizing documents</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Filters and Sorting</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600">
                          Use sorting options to organize your results:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900">Most Relevant</h4>
                            <p className="text-sm text-blue-700">Based on keywords and quality</p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-900">Most Popular</h4>
                            <p className="text-sm text-purple-700">Based on usage count</p>
                          </div>
                          <div className="bg-emerald-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-emerald-900">Most Recent</h4>
                            <p className="text-sm text-emerald-700">Recently added prompts</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Testing Section */}
              {activeSection === "testing" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                      Prompt Testing
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                      Test your prompts directly with OpenAI and Claude models to validate their effectiveness.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Play className="h-5 w-5 text-blue-600" />
                          How to test a prompt
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <h4 className="font-semibold">Select a prompt</h4>
                              <p className="text-sm text-slate-600">Click on a prompt to open its details</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <h4 className="font-semibold">Fill the fields</h4>
                              <p className="text-sm text-slate-600">Complete the input fields required by the prompt</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <h4 className="font-semibold">Choose the model</h4>
                              <p className="text-sm text-slate-600">Select GPT-4, Claude, or another compatible model</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <h4 className="font-semibold">Run the test</h4>
                              <p className="text-sm text-slate-600">Click "Test" to see the result</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Supported Models</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-green-700">OpenAI Models</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                GPT-4o
                              </div>
                              <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                GPT-4o-mini
                              </div>
                              <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                GPT-4.1
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-semibold text-orange-700">Claude Models</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-orange-500" />
                                Claude Sonnet 4
                              </div>
                              <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-orange-500" />
                                Claude Opus 4
                              </div>
                              <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-orange-500" />
                                Claude Haiku 3.5
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-semibold text-blue-700">DALL-E Models</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-500" />
                                DALL-E 3
                              </div>
                              <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-500" />
                                DALL-E 2
                              </div>
                              <p className="text-xs text-slate-500">For image generation</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardHeader>
                        <CardTitle className="text-purple-800">Image Generation with DALL-E</CardTitle>
                        <CardDescription>
                          Understanding how DALL-E image generation works
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <h4 className="font-semibold text-purple-800 mb-2">How Image URLs Work</h4>
                            <p className="text-sm text-slate-600 mb-3">
                              DALL-E generates images and provides secure, temporary URLs that expire after 2 hours for security reasons.
                            </p>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                <div>
                                  <strong>Temporary URLs:</strong> Images are hosted on OpenAI's servers with expiring links
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                <div>
                                  <strong>2-Hour Expiry:</strong> Save images locally if you want to keep them permanently
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                <div>
                                  <strong>Right-click to save:</strong> Use "Save image as..." to download the generated image
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                            <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tips</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              <li>• Click "Open in new tab" to view the full-size image</li>
                              <li>• Save images immediately after generation</li>
                              <li>• Use specific, detailed prompts for better results</li>
                              <li>• DALL-E 3 provides higher quality than DALL-E 2</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Admin Section */}
              {activeSection === "admin" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                      Administration
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                      Manage your prompts, import content in bulk and administer your collection with powerful tools.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="h-5 w-5 text-slate-600" />
                          Administrator Access
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 mb-4">
                          Click the "Admin" button in the navigation bar to access the administration panel.
                          A password is required to protect access.
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <p className="text-amber-800 text-sm">
                            <strong>Note:</strong> Only authorized administrators can modify prompts.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-0 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5 text-blue-600" />
                            Prompt Management
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Create new prompts
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Edit existing prompts
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Organize by categories
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Add tags and metadata
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Upload className="h-5 w-5 text-purple-600" />
                            Import/Export JSON
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Import en lot via JSON
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Support des délimiteurs (---, ===, ###)
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Télécharger des templates
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            Création automatique de catégories
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trash2 className="h-5 w-5 text-red-600" />
                          Suppression sécurisée
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 mb-4">
                          Les prompts peuvent être supprimés en toute sécurité, même s'ils ont des données de test associées.
                          Le système supprime automatiquement tous les tests liés avant de supprimer le prompt.
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-red-800 text-sm">
                            <strong>Attention :</strong> La suppression est irréversible. Assurez-vous d'avoir une sauvegarde si nécessaire.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* API Section */}
              {activeSection === "api" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                      API Reference
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                      Documentation des endpoints API pour intégrer PromptLang dans vos applications.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Endpoints disponibles</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="bg-slate-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono">GET</span>
                              <code className="text-sm">/api/prompts</code>
                            </div>
                            <p className="text-sm text-slate-600">Récupère tous les prompts disponibles</p>
                          </div>
                          
                          <div className="bg-slate-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono">GET</span>
                              <code className="text-sm">/api/prompts/search?q=:query</code>
                            </div>
                            <p className="text-sm text-slate-600">Recherche des prompts par mots-clés</p>
                          </div>
                          
                          <div className="bg-slate-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono">GET</span>
                              <code className="text-sm">/api/prompts/:id</code>
                            </div>
                            <p className="text-sm text-slate-600">Récupère un prompt spécifique par ID</p>
                          </div>
                          
                          <div className="bg-slate-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-mono">POST</span>
                              <code className="text-sm">/api/prompts/:id/test</code>
                            </div>
                            <p className="text-sm text-slate-600">Teste un prompt avec un modèle d'IA</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Format des données</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-slate-100 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-slate-800">
{`{
  "id": 1,
  "title": "Générateur de code Python",
  "description": "Génère du code Python optimisé",
  "category": "Code Generation",
  "promptText": "Écris du code Python pour...",
  "role": "Expert en programmation Python",
  "inputType": "text",
  "objective": "Générer du code propre et efficace",
  "outputFormat": "Code Python commenté",
  "modelCompatibility": ["gpt-4o", "claude-sonnet-4"],
  "inputFields": [
    {
      "name": "task",
      "label": "Tâche à accomplir",
      "type": "textarea",
      "required": true
    }
  ],
  "rating": 4.8,
  "usageCount": 42,
  "tags": ["python", "code", "programming"],
  "createdAt": "2025-01-04T10:00:00Z",
  "updatedAt": "2025-01-04T10:00:00Z"
}`}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}