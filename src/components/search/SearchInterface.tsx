
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, Eye, Download, Share } from "lucide-react";
import { SearchService, SearchResult } from './SearchService';
import { AdvancedAutocomplete } from '@/components/common/AdvancedAutocomplete';

interface SearchInterfaceProps {
  placeholder?: string;
  title?: string;
  description?: string;
}

export function SearchInterface({ 
  placeholder = "Rechercher dans tous les contenus...",
  title = "Recherche",
  description = "Trouvez rapidement les informations dont vous avez besoin"
}: SearchInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const searchResults = await SearchService.searchAll(searchQuery.trim());
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Search className="w-8 h-8 text-emerald-600" />
          {title}
        </h2>
        <p className="text-gray-600 text-lg">
          {description}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <AdvancedAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={placeholder}
              context="search"
              className="flex-1"
              onKeyPress={handleKeyPress}
              withVoiceRecognition={true}
            />
            <Button 
              onClick={handleSearch}
              disabled={loading || !searchQuery.trim()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              {loading ? "Recherche..." : "Rechercher"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Résultats de recherche */}
      {hasSearched && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {loading ? "Recherche en cours..." : `Résultats de recherche (${results.length})`}
          </h3>
          
          {!loading && results.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Aucun résultat trouvé</p>
                  <p className="text-sm">Essayez avec d'autres mots-clés ou utilisez la recherche avancée</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {results.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={result.type === 'legal_text' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}>
                        {result.type === 'legal_text' ? 'Texte juridique' : 'Procédure'}
                      </Badge>
                      <Badge variant="outline">{result.category}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(result.relevance * 100)}% pertinent
                      </Badge>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {result.title}
                    </h4>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {result.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {result.institution && (
                        <span>{result.institution}</span>
                      )}
                      <span>Mis à jour: {new Date(result.lastUpdate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Consulter
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Download className="w-4 h-4 mr-1" />
                      Utiliser
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
