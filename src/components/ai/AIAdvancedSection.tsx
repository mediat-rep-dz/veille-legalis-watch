
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageSquare, TrendingUp, FileText, Lightbulb } from 'lucide-react';
import { ConversationalAIAssistant } from './ConversationalAIAssistant';
import { PredictiveAnalysis } from './PredictiveAnalysis';
import { AutomaticSummarizer } from './AutomaticSummarizer';
import { ContextualSuggestions } from './ContextualSuggestions';
import { SectionHeader } from '@/components/common/SectionHeader';

export function AIAdvancedSection() {
  const [activeTab, setActiveTab] = useState('assistant');

  const features = [
    {
      id: 'assistant',
      title: 'Assistant Conversationnel',
      description: 'IA pour l\'interprétation juridique',
      icon: MessageSquare,
      badge: 'IA Avancée',
      color: 'text-blue-600'
    },
    {
      id: 'analysis',
      title: 'Analyse Prédictive',
      description: 'Tendances législatives futures',
      icon: TrendingUp,
      badge: 'Nouveau',
      color: 'text-purple-600'
    },
    {
      id: 'summarizer',
      title: 'Résumeur Automatique',
      description: 'Résumés intelligents de documents',
      icon: FileText,
      badge: 'Beta',
      color: 'text-green-600'
    },
    {
      id: 'suggestions',
      title: 'Suggestions Contextuelles',
      description: 'Recommandations personnalisées',
      icon: Lightbulb,
      badge: 'Smart',
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Intelligence Artificielle Avancée"
        description="Exploitez la puissance de l'IA pour optimiser votre veille juridique"
        icon={Brain}
        iconColor="text-purple-600"
      />

      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Centre de Contrôle IA
          </CardTitle>
          <p className="text-gray-600">
            Accédez aux outils d'intelligence artificielle les plus avancés
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  activeTab === feature.id 
                    ? 'ring-2 ring-purple-500 shadow-md' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setActiveTab(feature.id)}
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
        {activeTab === 'assistant' && <ConversationalAIAssistant />}
        {activeTab === 'analysis' && <PredictiveAnalysis />}
        {activeTab === 'summarizer' && <AutomaticSummarizer />}
        {activeTab === 'suggestions' && <ContextualSuggestions />}
      </div>
    </div>
  );
}
