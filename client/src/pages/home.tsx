import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import SearchBar from "@/components/search-bar";
import PromptCard from "@/components/prompt-card";
import PromptDetailModal from "@/components/prompt-detail-modal";
import AdminModal from "@/components/admin-modal";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Settings, Search } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState<number | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevant");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const { data: prompts = [], isLoading: isLoadingPrompts } = useQuery({
    queryKey: searchQuery ? ["/api/prompts/search", searchQuery] : ["/api/prompts"],
    queryFn: () => searchQuery ? api.searchPrompts(searchQuery) : api.getPrompts(),
  });

  const sortedPrompts = [...prompts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return (b.usageCount || 0) - (a.usageCount || 0);
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return (b.rating || 0) - (a.rating || 0);
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedPrompts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPrompts = sortedPrompts.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Search className="text-white h-5 w-5" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">PromptLang</span>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Search</a>
              <a href="/docs" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Documentation</a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdminModalOpen(true)}
                className="bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 border-slate-300 shadow-sm"
              >
                <Settings className="h-4 w-4 mr-1" />
                Admin
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <section className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Find the Perfect Prompt
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Discover, analyze, and test the best prompts for your AI projects
              </p>
              
              <SearchBar 
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for prompts... (e.g., 'resume PDF', 'Python code', 'email client')"
              />
              

            </div>
          </div>
        </section>

        {/* Search Results */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              {searchQuery ? "Search Results" : "All Prompts"}
            </h2>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1); // Reset to first page when sorting changes
                }}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevant">Most Relevant</option>
                <option value="popular">Most Popular</option>
                <option value="recent">Recently Added</option>
              </select>
              <span className="text-sm text-slate-500">
                {prompts.length} results found • Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
          
          {isLoadingPrompts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 animate-pulse shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                    <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-20"></div>
                  </div>
                  <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-2/3 mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-16"></div>
                    <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPrompts.map((prompt, index) => (
                <div
                  key={prompt.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PromptCard
                    prompt={prompt}
                    onSelect={() => setSelectedPromptId(prompt.id)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage = 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(page - currentPage) <= 1;
                    
                    const showEllipsis = 
                      (page === currentPage - 2 && currentPage > 3) ||
                      (page === currentPage + 2 && currentPage < totalPages - 2);

                    if (showEllipsis) {
                      return (
                        <PaginationItem key={`ellipsis-${page}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    if (!showPage) return null;

                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </section>
      </main>

      {/* Modals */}
      {selectedPromptId && (
        <PromptDetailModal
          promptId={selectedPromptId}
          onClose={() => setSelectedPromptId(null)}
        />
      )}

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
