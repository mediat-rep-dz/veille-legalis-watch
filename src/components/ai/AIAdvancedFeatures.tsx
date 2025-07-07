
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, FileText, Sparkles, MessageSquare, Zap } from 'lucide-react';
import { IntelligentDocumentAnalyzer } from './IntelligentDocumentAnalyzer';
import { AIRecommendationEngine } from './AIRecommendationEngine';
import { ContextualSearchAssistant } from './ContextualSearchAssistant';
import { SectionHeader } from '@/components/common/SectionHeader';

export function AIAdvancedFeatures() {
  const [activeFeature, setActiveFeature] = useState('analyzer');

  const features = [
    {
      id: 'analyzer',
      title: 'Analyseur Intelligent',
      description: 'Analyse automatique de documents avec IA',
      icon: FileText,
      badge: 'Nouveau',
      color: 'text-purple-600'
    },
    {
      id: 'recommendations',
      title: 'Recommandations IA',
      description: 'Suggestions personnalisées basées sur vos activités',
      icon: Sparkles,
      badge: 'Populaire',
      color: 'text-blue-600'
    },
    {
      id: 'assistant',
      title: 'Assistant Contextuel',
      description: 'Recherche intelligente avec compréhension du contexte',
      icon: MessageSquare,
      badge: 'IA Avancée',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Fonctionnalités IA Avancées"
        description="Exploitez la puissance de l'intelligence artificielle pour optimiser votre travail juridique"
        icon={Brain}
        iconColor="text-purple-600"
      />

      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-600" />
            Centre de Contrôle IA
          </CardTitle>
          <p className="text-gray-600">
            Choisissez l'outil IA qui correspond à vos besoins actuels
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  activeFeature === feature.id 
                    ? 'ring-2 ring-purple-500 shadow-md' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <CardContent className="pt-4 text-center">
                  <feature.icon className={`w-8 h-8 mx-auto mb-3 ${feature.color}`} />
                  <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
                    {feature.title}
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {activeFeature === 'analyzer' && <IntelligentDocumentAnalyzer />}
        {activeFeature === 'recommendations' && <AIRecommendationEngine />}
        {activeFeature === 'assistant' && <ContextualSearchAssistant />}
      </div>
    </div>
  );
}
