
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, GitCompareArrows, Download, Bot } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'comparative' | 'performance' | 'trends';
  data?: any[];
}

export function AnalysisModal({ isOpen, onClose, type, data = [] }: AnalysisModalProps) {
  const [analysisConfig, setAnalysisConfig] = useState({
    period: 'month',
    metrics: 'all',
    format: 'visual',
    includeAI: true
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const getAnalysisConfig = () => {
    switch (type) {
      case 'comparative':
        return {
          title: 'Analyse comparative',
          icon: <GitCompareArrows className="w-5 h-5" />,
          description: 'Comparez les performances et tendances entre différents éléments'
        };
      case 'performance':
        return {
          title: 'Analyse de performance',
          icon: <BarChart3 className="w-5 h-5" />,
          description: 'Analysez les performances et métriques clés'
        };
      case 'trends':
        return {
          title: 'Analyse des tendances',
          icon: <TrendingUp className="w-5 h-5" />,
          description: 'Identifiez les tendances et évolutions temporelles'
        };
      default:
        return {
          title: 'Analyse',
          icon: <BarChart3 className="w-5 h-5" />,
          description: 'Analyse des données'
        };
    }
  };

  const config = getAnalysisConfig();

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulation de l'analyse
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Résultats simulés
    setAnalysisResults({
      summary: `Analyse ${type} terminée avec succès`,
      metrics: {
        totalItems: data.length,
        avgPerformance: 87.5,
        trend: '+12.3%',
        score: 8.7
      },
      recommendations: [
        'Optimiser les processus les moins performants',
        'Maintenir les bonnes pratiques identifiées',
        'Surveiller les tendances émergentes'
      ]
    });
    
    setIsAnalyzing(false);
  };

  const handleExportAnalysis = () => {
    const exportData = {
      type,
      config: analysisConfig,
      results: analysisResults,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analyse-${type}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
          <p className="text-sm text-gray-600">{config.description}</p>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {!analysisResults && !isAnalyzing && (
            <>
              {/* Configuration de l'analyse */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Période d'analyse</label>
                      <Select value={analysisConfig.period} onValueChange={(value) => setAnalysisConfig({...analysisConfig, period: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Cette semaine</SelectItem>
                          <SelectItem value="month">Ce mois</SelectItem>
                          <SelectItem value="quarter">Ce trimestre</SelectItem>
                          <SelectItem value="year">Cette année</SelectItem>
                          <SelectItem value="all">Toute la période</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Métriques</label>
                      <Select value={analysisConfig.metrics} onValueChange={(value) => setAnalysisConfig({...analysisConfig, metrics: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les métriques</SelectItem>
                          <SelectItem value="performance">Performance uniquement</SelectItem>
                          <SelectItem value="usage">Utilisation uniquement</SelectItem>
                          <SelectItem value="trends">Tendances uniquement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="includeAI"
                        checked={analysisConfig.includeAI}
                        onChange={(e) => setAnalysisConfig({...analysisConfig, includeAI: e.target.checked})}
                      />
                      <label htmlFor="includeAI" className="text-sm flex items-center gap-1">
                        <Bot className="w-4 h-4" />
                        Utiliser l'IA pour l'analyse
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Données à analyser */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Données sélectionnées</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {data.length} éléments sélectionnés pour l'analyse
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.slice(0, 5).map((item, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {item.title || item.name || `Élément ${index + 1}`}
                      </span>
                    ))}
                    {data.length > 5 && (
                      <span className="text-xs text-gray-500">+{data.length - 5} autres</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* État d'analyse en cours */}
          {isAnalyzing && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <Bot className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-semibold">Analyse en cours...</h3>
                  <p className="text-sm text-gray-600">
                    L'IA traite vos données et génère l'analyse
                  </p>
                  <Progress value={75} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Résultats de l'analyse */}
          {analysisResults && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Analyse terminée</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{analysisResults.summary}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{analysisResults.metrics.totalItems}</div>
                      <div className="text-xs text-gray-600">Éléments analysés</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{analysisResults.metrics.avgPerformance}%</div>
                      <div className="text-xs text-gray-600">Performance moyenne</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{analysisResults.metrics.trend}</div>
                      <div className="text-xs text-gray-600">Évolution</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{analysisResults.metrics.score}/10</div>
                      <div className="text-xs text-gray-600">Score global</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommandations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          {!isAnalyzing && !analysisResults && (
            <>
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button onClick={handleStartAnalysis} className="bg-blue-600 hover:bg-blue-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                Lancer l'analyse
              </Button>
            </>
          )}
          
          {analysisResults && (
            <>
              <Button variant="outline" onClick={handleExportAnalysis}>
                <Download className="w-4 h-4 mr-2" />
                Exporter l'analyse
              </Button>
              <Button onClick={onClose}>
                Fermer
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
