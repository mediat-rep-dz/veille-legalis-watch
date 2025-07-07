import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnalyticsDashboardsSection } from '@/components/analytics/AnalyticsDashboardsSection';
import { PersonalizedDashboards } from '@/components/analytics/PersonalizedDashboards';
import { DocumentUsageMetrics } from '@/components/analytics/DocumentUsageMetrics';
import { LegislativeImpactReports } from '@/components/analytics/LegislativeImpactReports';
import { SearchTrendsAnalysis } from '@/components/analytics/SearchTrendsAnalysis';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Search, 
  Download, 
  Calendar,
  Users,
  Activity,
  Target,
  PieChart,
  LineChart,
  Filter,
  Eye,
  Star,
  AlertTriangle,
  Clock,
  Bot,
  Sparkles,
  GitCompareArrows,
  Zap,
  Settings,
  Shield,
  Play,
  MoreHorizontal,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';

interface AnalysisReportsSectionsProps {
  section: string;
  language: string;
}

export function AnalysisReportsSections({ section, language }: AnalysisReportsSectionsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getSectionTitle = () => {
    switch (section) {
      case 'dashboards':
        return 'Tableaux de bord';
      case 'analytics-dashboards':
        return 'Tableaux de bord analytiques';
      case 'analysis':
        return 'Analyses';
      case 'reports':
        return 'Rapports';
      case 'assisted-writing':
        return 'Rédaction assistée';
      default:
        return 'Analyse & Rapports';
    }
  };

  const getSectionDescription = () => {
    switch (section) {
      case 'dashboards':
        return 'Visualisez vos données avec des tableaux de bord interactifs et personnalisables';
      case 'analytics-dashboards':
        return 'Tableaux de bord analytiques avancés pour une analyse approfondie des données';
      case 'analysis':
        return 'Outils d\'analyse avancés pour examiner les tendances et les métriques';
      case 'reports':
        return 'Générez des rapports détaillés sur l\'utilisation et les performances';
      case 'assisted-writing':
        return 'Outils d\'aide à la rédaction de documents juridiques';
      default:
        return 'Outils d\'analyse et de reporting pour optimiser vos processus juridiques';
    }
  };

  const dashboardStats = [
    { label: "Tableaux actifs", value: "24", icon: BarChart3, color: "text-blue-600" },
    { label: "Rapports générés", value: "156", icon: FileText, color: "text-green-600" },
    { label: "Analyses en cours", value: "8", icon: Activity, color: "text-purple-600" },
    { label: "Utilisateurs actifs", value: "47", icon: Users, color: "text-orange-600" }
  ];

  const recentReports = [
    {
      id: 1,
      title: "Rapport mensuel d'activité - Décembre 2024",
      type: "Activité",
      generated: "Il y a 2 heures",
      size: "2.4 MB",
      status: "Terminé",
      downloads: 23
    },
    {
      id: 2,
      title: "Analyse des tendances législatives Q4 2024",
      type: "Analyse",
      generated: "Il y a 1 jour",
      size: "5.1 MB",
      status: "Terminé",
      downloads: 67
    },
    {
      id: 3,
      title: "Performance des recherches - Novembre 2024",
      type: "Performance",
      generated: "Il y a 3 jours",
      size: "1.8 MB",
      status: "En cours",
      downloads: 0
    }
  ];

  const renderCustomReportGeneration = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Générateur de Rapport Personnalisé
          </CardTitle>
          <CardDescription>
            Créez des rapports sur mesure avec l'assistance de l'IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Configuration du rapport */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Configuration du Rapport</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Titre du rapport</label>
                <Input placeholder="Entrez le titre de votre rapport" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Source de données</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner la source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="legal-texts">Textes juridiques</SelectItem>
                    <SelectItem value="procedures">Procédures administratives</SelectItem>
                    <SelectItem value="all">Toutes les données</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Décrivez les objectifs et le contenu souhaité du rapport..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Période</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">7 derniers jours</SelectItem>
                      <SelectItem value="month">30 derniers jours</SelectItem>
                      <SelectItem value="quarter">3 derniers mois</SelectItem>
                      <SelectItem value="year">12 derniers mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="word">Word</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Actions</h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Génération Intelligente
                </h4>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-3">
                  <Bot className="w-4 h-4 mr-2" />
                  Générer avec IA
                </Button>
                
                <div className="text-sm text-gray-600 mb-3">
                  Options d'export rapide :
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileSpreadsheet className="w-4 h-4 mr-1" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileImage className="w-4 h-4 mr-1" />
                    Word
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Suggestions IA</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Inclure les tendances récentes</li>
                  <li>• Ajouter des graphiques comparatifs</li>
                  <li>• Intégrer une analyse prédictive</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPredefinedTemplates = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Modèles de Rapports Prédéfinis
          </CardTitle>
          <CardDescription>
            Sélectionnez parmi nos modèles de rapports préconçus optimisés par IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { 
                title: "Rapport d'Activité Mensuel", 
                description: "Synthèse complète des activités du mois avec métriques clés",
                category: "Performance",
                frequency: "Mensuel",
                lastUpdate: "Mis à jour",
                level: "IA",
                levelColor: "bg-blue-100 text-blue-800"
              },
              { 
                title: "Analyse de Conformité Réglementaire", 
                description: "Évaluation détaillée du respect des réglementations",
                category: "Conformité",
                frequency: "Trimestriel",
                lastUpdate: "Mis à jour",
                level: "Expert",
                levelColor: "bg-purple-100 text-purple-800"
              },
              { 
                title: "Rapport de Performance Système", 
                description: "Analyse des performances techniques et opérationnelles",
                category: "Technique",
                frequency: "Hebdomadaire",
                lastUpdate: "Mis à jour",
                level: "Avancé",
                levelColor: "bg-orange-100 text-orange-800"
              },
              { 
                title: "Synthèse Exécutive", 
                description: "Résumé stratégique pour la direction",
                category: "Direction",
                frequency: "Mensuel",
                lastUpdate: "Mis à jour",
                level: "Simple",
                levelColor: "bg-green-100 text-green-800"
              }
            ].map((template, index) => (
              <Card key={index} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Badge className={template.levelColor}>
                      {template.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span><strong>Catégorie:</strong> {template.category}</span>
                    <span><strong>Fréquence:</strong> {template.frequency}</span>
                    <span className="text-green-600"><strong>{template.lastUpdate}</strong></span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Aperçu
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Configurer
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Bot className="w-4 h-4 mr-1" />
                      Générer
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPerformanceAnalysis = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Analyse de Performance
          </CardTitle>
          <CardDescription>
            Analysez vos performances détaillées avec l'assistance IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contrôles */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Select defaultValue="month">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="quarter">Ce trimestre</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les métriques</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="usage">Utilisation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Bot className="w-4 h-4 mr-2" />
              Analyse IA
            </Button>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Évolution des Performances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600">Graphique des performances</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Répartition par Domaine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm text-gray-600">Graphique de répartition</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export et Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export et Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  const renderComparativeAnalysis = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompareArrows className="w-5 h-5 text-purple-600" />
            Analyse Comparative
          </CardTitle>
          <CardDescription>
            Comparez les performances entre différentes périodes avec l'aide de l'IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration de la comparaison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de comparaison</label>
              <Select defaultValue="periods">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="periods">Périodes</SelectItem>
                  <SelectItem value="departments">Départements</SelectItem>
                  <SelectItem value="metrics">Métriques</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Période 1</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner période 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="q4-2024">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Période 2</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner période 2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="q4-2024">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bouton de lancement */}
          <div className="text-center">
            <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Lancer la comparaison
            </Button>
          </div>

          {/* Métriques à comparer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Métriques à comparer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Performance", "Utilisation", "Satisfaction", "Conformité", "Efficacité", "Qualité", "Temps de réponse", "Taux de succès"].map((metric) => (
                  <div key={metric} className="flex items-center gap-2">
                    <input type="checkbox" id={metric} defaultChecked className="rounded" />
                    <label htmlFor={metric} className="text-sm">{metric}</label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  const renderAIInsights = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            Insights IA et Recommandations
          </CardTitle>
          <CardDescription>
            Découvrez des insights automatiques et des recommandations personnalisées générées par l'IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recommandations Intelligentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                Recommandations Intelligentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Optimisations Suggérées</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>Automatiser 3 processus répétitifs pour gagner 15% d'efficacité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Réorganiser les workflows pour réduire les délais de 20%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                    <span>Renforcer la formation sur 2 modules critiques</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tendances Prédictives */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Tendances Prédictives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">+23%</div>
                  <div className="text-sm text-gray-600">Croissance prévue</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <div className="text-sm text-gray-600">Taux de réussite</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">-12%</div>
                  <div className="text-sm text-gray-600">Réduction des coûts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Recommandées par l'IA */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                Actions Recommandées par l'IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Optimiser le processus de validation",
                  description: "Réduire les étapes de validation de 5 à 3",
                  priority: "Haute",
                  impact: "Élevé"
                },
                {
                  title: "Mettre à jour la base de connaissances",
                  description: "Ajouter 15 nouvelles procédures identifiées",
                  priority: "Moyenne",
                  impact: "Moyen"
                },
                {
                  title: "Automatiser les rapports hebdomadaires",
                  description: "Générer automatiquement les rapports récurrents",
                  priority: "Moyenne",
                  impact: "Élevé"
                }
              ].map((action, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{action.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Priorité: {action.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Impact: {action.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Appliquer
                    </Button>
                    <Button size="sm" variant="outline">
                      Plus tard
                    </Button>
                    <Button size="sm" variant="outline">
                      Créer maintenant
                    </Button>
                    <Button size="sm" variant="outline">
                      Voir détails
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboards = () => (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
        <TabsTrigger value="personalized">Tableaux Personnalisés</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tableaux de Bord Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Tableau Principal</div>
                      <div className="text-sm text-gray-500">Vue d'ensemble générale</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ouvrir</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <PieChart className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Statistiques d'Usage</div>
                      <div className="text-sm text-gray-500">Métriques d'utilisation</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ouvrir</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <LineChart className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Tendances Temporelles</div>
                      <div className="text-sm text-gray-500">Évolution dans le temps</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ouvrir</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rapports Récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{report.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{report.type}</Badge>
                          <span className="text-xs text-gray-500">{report.generated}</span>
                        </div>
                      </div>
                      <Badge className={
                        report.status === 'Terminé' ? 'bg-green-100 text-green-800' :
                        report.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{report.size}</span>
                      <span>{report.downloads} téléchargements</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="personalized">
        <PersonalizedDashboards />
      </TabsContent>
    </Tabs>
  );

  const renderAnalytics = () => (
    <AnalyticsDashboardsSection language={language} />
  );

  const renderAnalysis = () => (
    <Tabs defaultValue="performance" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="performance">Analyse de Performance</TabsTrigger>
        <TabsTrigger value="comparative">Analyse Comparative</TabsTrigger>
        <TabsTrigger value="insights">Insights IA et Recommandations</TabsTrigger>
        <TabsTrigger value="usage">Métriques d'utilisation</TabsTrigger>
      </TabsList>

      <TabsContent value="performance">
        {renderPerformanceAnalysis()}
      </TabsContent>

      <TabsContent value="comparative">
        {renderComparativeAnalysis()}
      </TabsContent>

      <TabsContent value="insights">
        {renderAIInsights()}
      </TabsContent>

      <TabsContent value="usage">
        <DocumentUsageMetrics />
      </TabsContent>
    </Tabs>
  );

  const renderReports = () => (
    <Tabs defaultValue="custom" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="custom">Génération de Rapport Personnalisé</TabsTrigger>
        <TabsTrigger value="templates">Modèles de Rapports Prédéfinis</TabsTrigger>
        <TabsTrigger value="legislative-impact">Impact Législatif</TabsTrigger>
        <TabsTrigger value="trends">Analyse des tendances</TabsTrigger>
      </TabsList>

      <TabsContent value="custom">
        {renderCustomReportGeneration()}
      </TabsContent>

      <TabsContent value="templates">
        {renderPredefinedTemplates()}
      </TabsContent>

      <TabsContent value="legislative-impact">
        <LegislativeImpactReports />
      </TabsContent>

      <TabsContent value="trends">
        <SearchTrendsAnalysis />
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          {section === 'dashboards' && <BarChart3 className="w-6 h-6 text-emerald-600" />}
          {section === 'analytics-dashboards' && <Activity className="w-6 h-6 text-emerald-600" />}
          {section === 'analysis' && <TrendingUp className="w-6 h-6 text-emerald-600" />}
          {section === 'reports' && <FileText className="w-6 h-6 text-emerald-600" />}
          {getSectionTitle()}
        </h2>
        <p className="text-gray-600">
          {getSectionDescription()}
        </p>
      </div>

      {section === 'dashboards' && renderDashboards()}
      {section === 'analytics-dashboards' && renderAnalytics()}
      {section === 'analysis' && renderAnalysis()}
      {section === 'reports' && renderReports()}
    </div>
  );
}
