
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, CalendarIcon, Filter, Download, Eye, Share } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function AdvancedSearchSection() {
  const [keywords, setKeywords] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [institution, setInstitution] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [showResults, setShowResults] = useState(false);

  const documentTypes = [
    'Tous les types',
    'Loi',
    'Décret',
    'Arrêté',
    'Circulaire',
    'Ordonnance',
    'Code',
    'Jurisprudence'
  ];

  const institutions = [
    'Ministère ou institution...',
    'Présidence de la République',
    'Premier Ministère',
    'Ministère de la Justice',
    'Ministère de l\'Intérieur et des Collectivités Locales',
    'Ministère des Finances',
    'Ministère de l\'Énergie',
    'Ministère de l\'Agriculture et du Développement Rural'
  ];

  const searchResults = [
    {
      id: 1,
      title: "Impact de la réforme du droit des sociétés sur les PME",
      type: "Analyse juridique",
      category: "Droit des affaires",
      author: "Dr. Marie Dubois",
      date: "12 janvier 2025",
      views: 2647,
      readTime: "15 min",
      downloads: 155,
      tags: ["réforme", "PME", "sociétés", "impact économique"]
    },
    {
      id: 2,
      title: "Évolution de la jurisprudence en matière environnementale",
      type: "Analyse juridique",
      category: "Droit de l'environnement",
      author: "Prof. Jean Martin",
      date: "8 janvier 2025",
      views: 1923,
      readTime: "22 min",
      downloads: 87,
      tags: ["jurisprudence", "environnement", "évolution", "comparative"]
    }
  ];

  const handleSearch = () => {
    console.log('Recherche avancée:', {
      keywords,
      documentType,
      institution,
      startDate,
      endDate
    });
    setShowResults(true);
  };

  const handleReset = () => {
    setKeywords('');
    setDocumentType('');
    setInstitution('');
    setStartDate(undefined);
    setEndDate(undefined);
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Recherche avancée</h1>
        <p className="text-muted-foreground">
          Utilisez des critères spécifiques pour affiner votre recherche
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Keywords */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="keywords">Mots-clés</Label>
              <Input
                id="keywords"
                placeholder="Rechercher dans le contenu..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document-type">Type de document</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Period */}
          <div className="space-y-2">
            <Label>Période</Label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-sm text-gray-600">Du</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy", { locale: fr }) : "jj/mm/aaaa"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-sm text-gray-600">Au</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy", { locale: fr }) : "jj/mm/aaaa"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Institution */}
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Select value={institution} onValueChange={setInstitution}>
              <SelectTrigger>
                <SelectValue placeholder="Ministère ou institution..." />
              </SelectTrigger>
              <SelectContent>
                {institutions.map((inst) => (
                  <SelectItem key={inst} value={inst}>
                    {inst}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={handleSearch}
              className="bg-emerald-600 hover:bg-emerald-700 gap-2"
            >
              <Search className="w-4 h-4" />
              Rechercher
            </Button>
            <Button 
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {showResults && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Résultats de la recherche</h2>
            <p className="text-muted-foreground">{searchResults.length} résultats trouvés</p>
          </div>

          <div className="space-y-4">
            {searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-yellow-500 text-yellow-900">
                          {result.type}
                        </Badge>
                        <Badge variant="outline">{result.category}</Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
                      
                      <p className="text-gray-600 mb-3">
                        Analyse approfondie des conséquences de la loi n° 2025-123 sur les petites et moyennes entreprises françaises.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>Par {result.author}</span>
                        <span>{result.date}</span>
                        <span>{result.views} vues</span>
                        <span>{result.readTime} de lecture</span>
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-500">
                        <span>{result.downloads} téléchargements</span>
                        <div className="flex items-center gap-1 mt-1">
                          <Eye className="w-3 h-3" />
                          <span>Aperçu</span>
                          <span className="mx-2">•</span>
                          <span>Partager</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-6">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                        <Eye className="w-4 h-4" />
                        Lire
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Share className="w-4 h-4" />
                        Partager
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
