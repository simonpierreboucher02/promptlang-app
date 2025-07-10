import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Prompt } from "@/lib/api";

interface PromptCardProps {
  prompt: Prompt;
  onSelect: () => void;
}

// Couleurs prédéfinies avec des variations plus vibrantes
const colorPalette = [
  { bg: "bg-emerald-100", text: "text-emerald-700", accent: "bg-emerald-200" },
  { bg: "bg-blue-100", text: "text-blue-700", accent: "bg-blue-200" },
  { bg: "bg-purple-100", text: "text-purple-700", accent: "bg-purple-200" },
  { bg: "bg-pink-100", text: "text-pink-700", accent: "bg-pink-200" },
  { bg: "bg-orange-100", text: "text-orange-700", accent: "bg-orange-200" },
  { bg: "bg-cyan-100", text: "text-cyan-700", accent: "bg-cyan-200" },
  { bg: "bg-red-100", text: "text-red-700", accent: "bg-red-200" },
  { bg: "bg-indigo-100", text: "text-indigo-700", accent: "bg-indigo-200" },
  { bg: "bg-green-100", text: "text-green-700", accent: "bg-green-200" },
  { bg: "bg-teal-100", text: "text-teal-700", accent: "bg-teal-200" },
  { bg: "bg-amber-100", text: "text-amber-700", accent: "bg-amber-200" },
  { bg: "bg-rose-100", text: "text-rose-700", accent: "bg-rose-200" }
];

const getCategoryColor = (category: string) => {
  // Générer un hash simple à partir du nom de la catégorie
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    const char = category.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir en 32bit
  }
  
  // Utiliser le hash pour sélectionner une couleur de façon déterministe
  const colorIndex = Math.abs(hash) % colorPalette.length;
  return colorPalette[colorIndex];
};

export default function PromptCard({ prompt, onSelect }: PromptCardProps) {
  const rating = prompt.rating || 0;
  const usageCount = prompt.usageCount || 0;
  const categoryColors = getCategoryColor(prompt.category);

  return (
    <Card 
      className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border-0 shadow-md"
      onClick={onSelect}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Badge className={`${categoryColors.bg} ${categoryColors.text} text-xs rounded-full px-3 py-1 font-medium border-0`}>
              {prompt.category}
            </Badge>
          </div>
          <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-amber-400 fill-current" />
            <span className="text-sm text-amber-700 font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-tight">{prompt.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">{prompt.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-wrap gap-1">
            {prompt.modelCompatibility.slice(0, 2).map((model) => {
              const modelColor = model.toLowerCase().includes('claude') 
                ? 'bg-orange-50 border-orange-200 text-orange-700'
                : model.toLowerCase().includes('gpt')
                ? 'bg-green-50 border-green-200 text-green-700'
                : model.toLowerCase().includes('dall-e')
                ? 'bg-purple-50 border-purple-200 text-purple-700'
                : 'bg-blue-50 border-blue-200 text-blue-700';
              
              return (
                <Badge key={model} variant="outline" className={`text-xs ${modelColor} font-medium`}>
                  {model}
                </Badge>
              );
            })}
            {prompt.modelCompatibility.length > 2 && (
              <Badge variant="outline" className="text-xs bg-purple-50 border-purple-200 text-purple-700 font-medium">
                +{prompt.modelCompatibility.length - 2}
              </Badge>
            )}
          </div>
          <Button variant="link" className={`${categoryColors.text} text-sm font-medium p-0 hover:opacity-80 transition-opacity`}>
            View Details →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
