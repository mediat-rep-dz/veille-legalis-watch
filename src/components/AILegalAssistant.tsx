
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Search, Clock, FileText, BarChart3, Users, Sparkles, History } from 'lucide-react';
import { SectionHeader } from './common/SectionHeader';

export function AILegalAssistant() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    "Quelles sont les conditions de création d'une entreprise en Algérie ?",
    "Comment calculer les congés payés selon le code du travail ?",
    "Procédure d'obtention d'un permis de construire",
    "Droits et obligations du locataire et du propriétaire"
  ];

  const recentSearches = [
    { query: "Procédure de divorce", time: "Il y a 2 heures", results: 15 },
    { query: "Code du commerce article 544", time: "Hier", results: 8 },
    { query: "Loi sur l'investissement 2023", time: "Il y a 2 jours", results: 23 }
  ];

  const insights = [
    {
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      title: "Tendance détectée",
      description: "Augmentation des recherches sur les marchés publics (+45% cette semaine)"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      title: "Nouveau texte pertinent",
      description: "Décret exécutif n° 24-15 pourrait intéresser vos recherches récentes"
    }
  ];

  const quickActions = [
    { icon: <FileText className="w-5 h-5" />, title: "Analyser un document", desc: "Extractez les points clés" },
    { icon: <BarChart3 className="w-5 h-5" />, title: "Comparer des textes", desc: "Identifiez les différences" },
    { icon: <Users className="w-5 h-5" />, title: "Résumer une procédure", desc: "Obtenez un guide simplifié" },
    { icon: <Bot className="w-5 h-5" />, title: "Générer un modèle", desc: "Créez des documents types" }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simuler une recherche IA
    setTimeout(() => {
      setIsLoading(false);
      // Ici on afficherait les résultats
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <SectionHeader
        title="Assistant IA Juridique"
        description="Posez vos questions juridiques en langage naturel et obtenez des réponses précises et contextualisées"
        icon={Bot}
        iconColor="text-green-600"
      />

      {/* Search Section */}
      <Card className="border-2 border-green-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-700 font-medium">
              <Sparkles className="w-5 h-5" />
              Recherche Intelligente
            </div>
            <p className="text-gray-600 text-sm">
              Décrivez votre situation ou posez votre question juridique
            </p>
            
            <div className="relative">
              <Input
                placeholder="Ex: Je souhaite créer une SARL, quelles sont les étapes à suivre et quels documents sont nécessaires ?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-32 text-base py-6"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading || !query.trim()}
                className="absolute right-2 top-2 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Rechercher avec l'IA
                  </>
                )}
              </Button>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-500">Alimenté par l'IA</span>
              <Sparkles className="w-3 h-3 inline ml-1 text-yellow-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Suggestions de recherche :</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 text-left justify-start hover:bg-green-50 hover:border-green-300"
              onClick={() => setQuery(suggestion)}
            >
              <div className="text-sm text-gray-700">{suggestion}</div>
            </Button>
          ))}
        </div>
      </div>

      {/* Three column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Searches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Recherches Récentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSearches.map((search, index) => (
              <div key={index} className="space-y-2">
                <div className="font-medium text-sm cursor-pointer hover:text-green-600">
                  {search.query}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{search.time}</span>
                  <Badge variant="secondary" className="text-xs">
                    {search.results} résultats
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Insights IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {insight.icon}
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-sm">{insight.title}</div>
                  <div className="text-xs text-gray-600">{insight.description}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Actions Rapides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full h-auto p-3 flex items-start gap-3 hover:bg-green-50"
              >
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  {action.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-gray-500">{action.desc}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
