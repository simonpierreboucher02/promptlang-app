import { useQuery } from "@tanstack/react-query";
import { api, type RecentGeneration } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link } from "wouter";

export default function RecentGenerations() {
  const { data: recentGenerations = [], isLoading } = useQuery({
    queryKey: ["/api/recent-generations"],
    queryFn: () => api.getRecentGenerations(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-700 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Générations Récentes
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent className="p-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Générations Récentes
          </h1>
        </div>
        
        <div className="mb-6">
          <p className="text-slate-600">
            Découvrez les {recentGenerations.length} dernières images générées par notre communauté
          </p>
        </div>

        {recentGenerations.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              Aucune génération récente
            </h3>
            <p className="text-slate-500">
              Les images générées par les utilisateurs apparaîtront ici
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentGenerations.map((generation: RecentGeneration, index: number) => (
              <Card key={generation.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-700 truncate">
                      {generation.promptTitle}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {generation.model}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(generation.createdAt), { 
                      addSuffix: true, 
                      locale: fr 
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                    <img
                      src={generation.output}
                      alt={generation.input}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {generation.input}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}