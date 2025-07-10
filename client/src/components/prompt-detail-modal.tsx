import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Play, Star, User, ArrowRight, Target, FileCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface PromptDetailModalProps {
  promptId: number;
  onClose: () => void;
}

export default function PromptDetailModal({ promptId, onClose }: PromptDetailModalProps) {
  const [testInputs, setTestInputs] = useState<Record<string, any>>({});
  const [selectedModel, setSelectedModel] = useState("claude-sonnet-4-20250514");
  const [testResult, setTestResult] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: prompt, isLoading } = useQuery({
    queryKey: [`/api/prompts/${promptId}`],
    queryFn: () => api.getPrompt(promptId),
  });

  const testMutation = useMutation({
    mutationFn: (data: { inputs: Record<string, any>; model: string }) => 
      api.testPrompt(promptId, data.inputs, data.model),
    onSuccess: (data) => {
      setTestResult(data.output);
      queryClient.invalidateQueries({ queryKey: [`/api/prompts/${promptId}`] });
      toast({
        title: "Test completed",
        description: "Your prompt has been tested successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Test failed",
        description: "There was an error testing your prompt.",
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard.",
    });
  };

  const handleTest = () => {
    const inputFields = prompt?.inputFields || [];
    const hasEmptyRequired = inputFields.some(field => 
      field.required && !testInputs[field.name]?.toString().trim()
    );
    
    if (hasEmptyRequired) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields to test the prompt.",
        variant: "destructive",
      });
      return;
    }
    
    testMutation.mutate({ inputs: testInputs, model: selectedModel });
  };

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-slate-200 rounded"></div>
              <div className="h-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!prompt) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <div className="text-center py-8">
            <p className="text-slate-500">Prompt not found</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-slate-200 pb-6">
          <DialogTitle className="text-2xl font-bold text-slate-900">
            {prompt.title}
          </DialogTitle>
          <div className="flex items-center space-x-4 mt-4">
            <Badge className="bg-purple-100 text-purple-700">
              {prompt.category}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-slate-500">
                {prompt.rating?.toFixed(1) || "0.0"} ({prompt.usageCount || 0} uses)
              </span>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
          {/* Left Column: Prompt Details */}
          <div className="space-y-6">
            <Tabs defaultValue="prompt" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="prompt">Prompt</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="prompt" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Complete Prompt</h3>
                  <Card>
                    <CardContent className="p-4 relative">
                      <pre className="text-sm text-slate-700 whitespace-pre-wrap">
                        {prompt.promptText}
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(prompt.promptText)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Prompt Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Role</h4>
                        <p className="text-slate-600 text-sm">{prompt.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Input Type</h4>
                        <p className="text-slate-600 text-sm">{prompt.inputType}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Objective</h4>
                        <p className="text-slate-600 text-sm">{prompt.objective}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileCode className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Output Format</h4>
                        <p className="text-slate-600 text-sm">{prompt.outputFormat}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Model Compatibility</h3>
                  <div className="flex flex-wrap gap-2">
                    {prompt.modelCompatibility.map((model) => (
                      <Badge key={model} className="bg-green-100 text-green-700">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Playground */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Test Playground</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Model
                  </label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claude-sonnet-4-20250514">Claude Sonnet 4 (Latest)</SelectItem>
                      <SelectItem value="claude-opus-4-20250514">Claude Opus 4</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                      <SelectItem value="gpt-4.1">GPT-4.1</SelectItem>
                      <SelectItem value="gpt-4.1-mini">GPT-4.1 Mini</SelectItem>
                      <SelectItem value="gpt-4.1-nano">GPT-4.1 Nano</SelectItem>
                      <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                      <SelectItem value="dall-e-2">DALL-E 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dynamic Input Fields */}
                {prompt?.inputFields && prompt.inputFields.length > 0 ? (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Input Fields</h4>
                    {prompt.inputFields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <Textarea
                            value={testInputs[field.name] || ''}
                            onChange={(e) => setTestInputs(prev => ({ ...prev, [field.name]: e.target.value }))}
                            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
                            rows={4}
                            className="w-full"
                          />
                        ) : field.type === 'select' ? (
                          <Select
                            value={testInputs[field.name] || ''}
                            onValueChange={(value) => setTestInputs(prev => ({ ...prev, [field.name]: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <input
                            type={field.type}
                            value={testInputs[field.name] || ''}
                            onChange={(e) => setTestInputs(prev => ({ ...prev, [field.name]: e.target.value }))}
                            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Your Input
                    </label>
                    <Textarea
                      value={testInputs.user_input || ''}
                      onChange={(e) => setTestInputs(prev => ({ ...prev, user_input: e.target.value }))}
                      placeholder="Enter your input here..."
                      rows={4}
                      className="w-full"
                    />
                  </div>
                )}

                <Button
                  onClick={handleTest}
                  disabled={testMutation.isPending}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  {testMutation.isPending ? (
                    "Testing..."
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Test Prompt
                    </>
                  )}
                </Button>
              </div>
            </div>

            {testResult && (
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Results</h4>
                <Card>
                  <CardContent className="p-4">
                    {testResult && selectedModel?.startsWith('dall-e-') ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">Generated Image</span>
                          <a 
                            href={typeof testResult === 'object' ? (testResult as any).output : testResult}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                          >
                            Open in new tab
                          </a>
                        </div>
                        <div className="relative">
                          <img 
                            src={typeof testResult === 'object' ? (testResult as any).output : testResult} 
                            alt="Generated image" 
                            className="w-full max-w-md rounded-lg shadow-md border border-slate-200"
                            onLoad={() => {
                              console.log('Image loaded successfully');
                            }}
                            onError={(e) => {
                              const target = e.currentTarget as HTMLImageElement;
                              const errorDiv = target.nextElementSibling as HTMLDivElement;
                              target.style.display = 'none';
                              if (errorDiv) errorDiv.style.display = 'block';
                            }}
                          />
                          <div style={{ display: 'none' }} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800 mb-2">
                              <strong>Image Loading Issue</strong>
                            </p>
                            <p className="text-sm text-yellow-700 mb-3">
                              The image URL is temporary and may expire. Click the link above to open it in a new tab.
                            </p>
                            <div className="text-xs text-yellow-600 break-all">
                              URL: {typeof testResult === 'object' ? (testResult as any).output : testResult}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500">
                          💡 Note: DALL-E image URLs are temporary and expire after 2 hours. Save the image if you want to keep it.
                        </div>
                      </div>
                    ) : (
                      <div className="prose prose-sm max-w-none text-slate-700">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                          components={{
                            code: ({ className, children, ...props }: any) => {
                              return (
                                <code 
                                  className="bg-slate-200 text-slate-900 px-2 py-1 rounded text-sm font-mono font-semibold border"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                            pre: ({ children, ...props }: any) => {
                              return (
                                <pre 
                                  className="bg-slate-100 border-2 border-slate-300 rounded-lg p-4 overflow-x-auto my-4 text-slate-900 font-mono text-sm leading-relaxed"
                                  {...props}
                                >
                                  {children}
                                </pre>
                              );
                            }
                          }}
                        >
                          {typeof testResult === 'object' ? JSON.stringify(testResult, null, 2) : testResult}
                        </ReactMarkdown>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
