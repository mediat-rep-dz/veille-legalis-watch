import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  PieChart, 
  LineChart,
  Users,
  Calendar,
  Download,
  Eye,
  Star,
  Building2,
  Scale,
  Clock,
  Target,
  Award,
  Activity,
  Bot,
  Sparkles,
  Settings,
  RefreshCw,
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Monitor,
  Server,
  Wifi,
  Database,
  Shield,
  Gauge,
  Grid3X3,
  Filter,
  SortDesc,
  Share2,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  MoreHorizontal,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  WifiOff,
  AlertCircle,
  FileSpreadsheet,
  FileType,
  Printer,
  Mail,
  Cloud,
  HardDrive,
  Calendar as CalendarIcon,
  ChevronDown,
  Layout,
  BarChart,
  TrendingUpIcon,
  PieChartIcon
} from 'lucide-react';

interface AnalysisReportsSectionsProps {
  section: string;
  language: string;
}

interface Widget {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'alert' | 'activity' | 'system';
  enabled: boolean;
  position: number;
  size: 'small' | 'medium' | 'large';
}

interface SystemMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  dismissed: boolean;
}

export function AnalysisReportsSections({ section, language }: AnalysisReportsSectionsProps) {
  const [activeTab, setActiveTab] = useState(() => {
    switch (section) {
      case 'analysis':
        return 'juridiques';
      case 'reports':
        return 'juridiques';
      default:
        return 'overview';
    }
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [customizationMode, setCustomizationMode] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showSystemDetails, setShowSystemDetails] = useState(false);

  // Widget management state
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'performance', title: 'Performance globale', type: 'metric', enabled: true, position: 1, size: 'large' },
    { id: 'activity', title: 'Activité récente', type: 'activity', enabled: true, position: 2, size: 'medium' },
    { id: 'alerts', title: 'Alertes importantes', type: 'alert', enabled: true, position: 3, size: 'medium' },
    { id: 'trends', title: 'Tendances et insights', type: 'chart', enabled: true, position: 4, size: 'large' },
    { id: 'system', title: 'Monitoring système', type: 'system', enabled: true, position: 5, size: 'medium' },
    { id: 'users', title: 'Utilisateurs connectés', type: 'metric', enabled: true, position: 6, size: 'small' },
  ]);

  // Real-time data simulation
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 1247,
    systemLoad: 67,
    responseTime: 2.3,
    successRate: 98.7,
    lastUpdate: new Date().toLocaleTimeString()
  });

  // System metrics
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 45, status: 'healthy', trend: 'stable', unit: '%' },
    { name: 'Memory Usage', value: 67, status: 'warning', trend: 'up', unit: '%' },
    { name: 'Disk Usage', value: 82, status: 'warning', trend: 'up', unit: '%' },
    { name: 'Network I/O', value: 156, status: 'healthy', trend: 'stable', unit: 'MB/s' },
    { name: 'Database Load', value: 34, status: 'healthy', trend: 'down', unit: '%' },
    { name: 'API Response Time', value: 2.3, status: 'healthy', trend: 'stable', unit: 's' }
  ]);

  // Alerts and notifications
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Utilisation mémoire élevée',
      message: 'L\'utilisation mémoire dépasse 80% sur le serveur principal',
      timestamp: '2025-01-20 14:30',
      priority: 'high',
      category: 'Système',
      dismissed: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Nouvelle mise à jour disponible',
      message: 'Version 2.1.3 disponible avec corrections de sécurité',
      timestamp: '2025-01-20 12:15',
      priority: 'medium',
      category: 'Maintenance',
      dismissed: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Sauvegarde terminée',
      message: 'Sauvegarde automatique effectuée avec succès',
      timestamp: '2025-01-20 10:00',
      priority: 'low',
      category: 'Système',
      dismissed: false
    },
    {
      id: '4',
      type: 'error',
      title: 'Échec de synchronisation',
      message: 'Erreur lors de la synchronisation avec le serveur externe',
      timestamp: '2025-01-20 09:45',
      priority: 'critical',
      category: 'Intégration',
      dismissed: false
    }
  ]);

  // Auto-refresh mechanism
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setRealTimeData(prev => ({
          ...prev,
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
          systemLoad: Math.max(20, Math.min(90, prev.systemLoad + Math.floor(Math.random() * 10 - 5))),
          responseTime: Math.max(1, Math.min(5, prev.responseTime + (Math.random() * 0.4 - 0.2))),
          successRate: Math.max(95, Math.min(100, prev.successRate + (Math.random() * 2 - 1))),
          lastUpdate: new Date().toLocaleTimeString()
        }));
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleExportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting data in ${format} format...`);
    // Implementation for export functionality
  };

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, enabled: !w.enabled } : w
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'info': return AlertCircle;
      default: return AlertCircle;
    }
  };

  // Enhanced dashboard statistics
  const dashboardStats = [
    { 
      label: "Textes juridiques", 
      value: "1,247", 
      change: "+12%", 
      icon: FileText, 
      color: "text-blue-600",
      trend: "up",
      details: "156 ajoutés ce mois",
      category: "Contenu"
    },
    { 
      label: "Procédures actives", 
      value: "589", 
      change: "+8%", 
      icon: Scale, 
      color: "text-green-600",
      trend: "up",
      details: "47 nouvelles procédures",
      category: "Procédures"
    },
    { 
      label: "Utilisateurs actifs", 
      value: realTimeData.activeUsers.toLocaleString(), 
      change: "+15%", 
      icon: Users, 
      color: "text-purple-600",
      trend: "up",
      details: "En temps réel",
      category: "Utilisateurs"
    },
    { 
      label: "Consultations/mois", 
      value: "45,123", 
      change: "+23%", 
      icon: Eye, 
      color: "text-orange-600",
      trend: "up",
      details: "Pic à 2,3k/jour",
      category: "Activité"
    }
  ];

  // Performance metrics by category
  const categoryMetrics = [
    { name: "Droit civil", consultations: 15890, growth: 12, satisfaction: 94, documents: 456 },
    { name: "Droit du travail", consultations: 14230, growth: 8, satisfaction: 92, documents: 389 },
    { name: "Droit commercial", consultations: 12678, growth: -3, satisfaction: 87, documents: 234 },
    { name: "Droit administratif", consultations: 9876, growth: 15, satisfaction: 89, documents: 167 },
    { name: "Droit fiscal", consultations: 8945, growth: 6, satisfaction: 91, documents: 298 }
  ];

  const AIAssistantDialog = ({ tabType, title }: { tabType: string; title: string }) => (
    <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Bot className="w-4 h-4 mr-2" />
          Assistant IA
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Assistant IA - {title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Décrivez l'analyse ou le rapport que vous souhaitez générer
            </label>
            <Textarea
              placeholder="Ex: Générer une analyse comparative des performances par région..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="min-h-32"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAiDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => {
                console.log(`Génération IA pour ${tabType}:`, aiPrompt);
                setIsAiDialogOpen(false);
                setAiPrompt('');
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Générer avec l'IA
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderEnhancedDashboard = () => (
    <div className="space-y-6">
      {/* Dashboard Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">24 heures</SelectItem>
                <SelectItem value="7d">7 jours</SelectItem>
                <SelectItem value="30d">30 jours</SelectItem>
                <SelectItem value="90d">90 jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            <span className="text-sm text-gray-600">Auto-actualisation</span>
          </div>
          
          <Badge variant="outline" className="text-xs">
            Dernière MàJ: {realTimeData.lastUpdate}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCustomizationMode(!customizationMode)}
            className="gap-2"
          >
            <Grid3X3 className="w-4 h-4" />
            {customizationMode ? 'Terminer' : 'Personnaliser'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>

          <Select onValueChange={(format) => handleExportData(format as 'csv' | 'excel' | 'pdf')}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>

          <AIAssistantDialog tabType="dashboard" title="Tableau de bord" />
        </div>
      </div>

      {customizationMode && (
        <Card className="border-dashed border-2 border-blue-300 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Mode personnalisation</CardTitle>
            <CardDescription>
              Activez/désactivez les widgets que vous souhaitez afficher
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {widgets.map(widget => (
                <div key={widget.id} className="flex items-center justify-between p-3 bg-white rounded border">
                  <span className="text-sm font-medium">{widget.title}</span>
                  <Switch
                    checked={widget.enabled}
                    onCheckedChange={() => toggleWidget(widget.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Statistics with details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${
                      stat.color.includes('blue') ? 'from-blue-100 to-blue-200' :
                      stat.color.includes('green') ? 'from-green-100 to-green-200' :
                      stat.color.includes('purple') ? 'from-purple-100 to-purple-200' :
                      'from-orange-100 to-orange-200'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <Badge variant="outline" className="text-xs mt-1">{stat.category}</Badge>
                    </div>
                  </div>
                  {stat.trend === 'up' ? 
                    <ArrowUp className="w-4 h-4 text-green-500" /> : 
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  }
                </div>
                
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change} ce mois
                    </p>
                    <p className="text-xs text-gray-500">{stat.details}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        stat.color.includes('blue') ? 'bg-blue-500' :
                        stat.color.includes('green') ? 'bg-green-500' :
                        stat.color.includes('purple') ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`} 
                      style={{ width: `${75 + Math.random() * 25}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Metrics by Category */}
      {widgets.find(w => w.id === 'performance')?.enabled && (
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  Métriques de performance par catégorie
                </CardTitle>
                <CardDescription>Analyse détaillée des performances par domaine juridique</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryMetrics.map((category, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="font-medium text-gray-900">{category.name}</span>
                      {category.growth > 0 ? (
                        <Badge className="bg-green-100 text-green-800">
                          <ArrowUp className="w-3 h-3 mr-1" />
                          +{category.growth}%
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          <ArrowDown className="w-3 h-3 mr-1" />
                          {category.growth}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{category.consultations.toLocaleString()} consultations</span>
                      <span>{category.satisfaction}% satisfaction</span>
                      <span>{category.documents} documents</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Consultations</span>
                        <span>{category.consultations.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: `${(category.consultations / 20000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Satisfaction</span>
                        <span>{category.satisfaction}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full" 
                          style={{ width: `${category.satisfaction}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Documents</span>
                        <span>{category.documents}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-purple-500 rounded-full" 
                          style={{ width: `${(category.documents / 500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Monitoring Widget */}
      {widgets.find(w => w.id === 'system')?.enabled && (
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-600" />
                  Monitoring système
                </CardTitle>
                <CardDescription>État en temps réel de l'infrastructure</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSystemDetails(!showSystemDetails)}
                >
                  {showSystemDetails ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">En ligne</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {systemMetrics.map((metric, index) => {
                const TrendIcon = metric.trend === 'up' ? ArrowUp : metric.trend === 'down' ? ArrowDown : Minus;
                return (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                      <div className="flex items-center gap-1">
                        <TrendIcon className={`w-3 h-3 ${
                          metric.trend === 'up' ? 'text-red-500' : 
                          metric.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                        }`} />
                        <div className={`w-2 h-2 rounded-full ${
                          metric.status === 'healthy' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
                    <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                      {metric.value}{metric.unit}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className={`h-2 rounded-full ${
                          metric.status === 'healthy' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${Math.min(100, (metric.value / (metric.name.includes('Usage') ? 100 : 10)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {showSystemDetails && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Serveurs
                    </h4>
                    <div className="space-y-2">
                      {['Principal', 'Secondaire', 'Base de données'].map((server, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{server}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-500">Actif</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Services
                    </h4>
                    <div className="space-y-2">
                      {['API Gateway', 'Cache Redis', 'Elasticsearch', 'File Storage'].map((service, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{service}</span>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${idx === 2 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                            <span className="text-xs text-gray-500">{idx === 2 ? 'Dégradé' : 'Actif'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Intelligent Alerts System */}
      {widgets.find(w => w.id === 'alerts')?.enabled && (
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-600" />
                Système d'alertes intelligent
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  {alerts.filter(a => !a.dismissed).length} actives
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="critical">Critiques</SelectItem>
                    <SelectItem value="warning">Avertissements</SelectItem>
                    <SelectItem value="info">Informations</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.filter(alert => !alert.dismissed).map((alert) => {
                const AlertIcon = getAlertIcon(alert.type);
                return (
                  <div key={alert.id} className={`p-4 border rounded-lg ${
                    alert.priority === 'critical' ? 'border-red-200 bg-red-50' :
                    alert.priority === 'high' ? 'border-orange-200 bg-orange-50' :
                    alert.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                    'border-blue-200 bg-blue-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <AlertIcon className={`w-5 h-5 mt-0.5 ${
                          alert.type === 'error' ? 'text-red-600' :
                          alert.type === 'warning' ? 'text-orange-600' :
                          alert.type === 'success' ? 'text-green-600' :
                          'text-blue-600'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{alert.title}</h4>
                            <Badge variant="outline" className={`text-xs ${
                              alert.priority === 'critical' ? 'bg-red-100 text-red-800' :
                              alert.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                              alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {alert.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">{alert.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {alert.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => dismissAlert(alert.id)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Real-time Activity with detailed history */}
      {widgets.find(w => w.id === 'activity')?.enabled && (
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Activité en temps réel
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{realTimeData.activeUsers}</div>
                  <div className="text-xs text-green-600">Utilisateurs actifs</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{realTimeData.responseTime}s</div>
                  <div className="text-xs text-blue-600">Temps de réponse</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{realTimeData.successRate}%</div>
                  <div className="text-xs text-purple-600">Taux de succès</div>
                </div>
              </div>

              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Activités récentes</h4>
                {[
                  { action: "Nouveau texte juridique ajouté", user: "Dr. Ahmed Benali", time: "Il y a 2 min", type: "success" },
                  { action: "Recherche complexe effectuée", user: "Me. Fatima Zahra", time: "Il y a 5 min", type: "info" },
                  { action: "Export de rapport généré", user: "Prof. Mohamed Cherif", time: "Il y a 8 min", type: "warning" },
                  { action: "Procédure mise à jour", user: "Admin System", time: "Il y a 12 min", type: "success" },
                  { action: "Analyse IA complétée", user: "Assistant IA", time: "Il y a 15 min", type: "info" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded transition-colors">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' : 
                      activity.type === 'info' ? 'bg-blue-500' : 
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Nouveaux contenus pour les onglets ajoutés
  const renderAdvancedExport = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            Génération de rapports personnalisés
          </CardTitle>
          <CardDescription>
            Créez et exportez des rapports sur mesure selon vos besoins spécifiques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration du rapport */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="report-title">Titre du rapport</Label>
                <Input id="report-title" placeholder="Ex: Rapport mensuel d'activité juridique" />
              </div>
              
              <div>
                <Label htmlFor="report-description">Description</Label>
                <Textarea 
                  id="report-description" 
                  placeholder="Décrivez le contenu et l'objectif de ce rapport..."
                  className="min-h-20"
                />
              </div>

              <div>
                <Label>Période de données</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" />
                  <Input type="date" />
                </div>
              </div>

              <div>
                <Label>Fréquence</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner la fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Une fois</SelectItem>
                    <SelectItem value="daily">Quotidien</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                    <SelectItem value="quarterly">Trimestriel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Sections à inclure</Label>
                <div className="space-y-2 mt-2">
                  {[
                    'Statistiques générales',
                    'Analyses juridiques',
                    'Procédures administratives',
                    'Performance utilisateurs',
                    'Tendances et évolutions',
                    'Recommandations'
                  ].map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                      <input type="checkbox" id={section} className="rounded" defaultChecked />
                      <Label htmlFor={section} className="text-sm">{section}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Format d'export</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    PDF
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    Excel
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileType className="w-4 h-4" />
                    Word
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Options avancées */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Options avancées</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="include-charts" />
                <Label htmlFor="include-charts">Inclure graphiques</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="include-raw-data" />
                <Label htmlFor="include-raw-data">Données brutes</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="auto-email" />
                <Label htmlFor="auto-email">Envoi automatique</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="watermark" />
                <Label htmlFor="watermark">Filigrane</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="confidential" />
                <Label htmlFor="confidential">Confidentiel</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="digital-signature" />
                <Label htmlFor="digital-signature">Signature numérique</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Aperçu
              </Button>
              <Button variant="outline" className="gap-2">
                <HardDrive className="w-4 h-4" />
                Sauvegarder modèle
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <AIAssistantDialog tabType="export" title="Export avancé" />
              <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                <Download className="w-4 h-4" />
                Générer rapport
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modèles de rapports prédéfinis */}
      <Card>
        <CardHeader>
          <CardTitle>Modèles de rapports prédéfinis</CardTitle>
          <CardDescription>
            Utilisez nos modèles préconçus pour générer rapidement des rapports standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Rapport d'activité mensuel",
                description: "Vue d'ensemble des activités du mois",
                icon: Calendar,
                usage: "Utilisé 156 fois"
              },
              {
                title: "Analyse de performance",
                description: "Métriques et KPI détaillés",
                icon: BarChart3,
                usage: "Utilisé 89 fois"
              },
              {
                title: "Rapport de conformité",
                description: "État de conformité réglementaire",
                icon: Shield,
                usage: "Utilisé 67 fois"
              },
              {
                title: "Synthèse juridique",
                description: "Résumé des textes et procédures",
                icon: Scale,
                usage: "Utilisé 134 fois"
              },
              {
                title: "Rapport utilisateurs",
                description: "Statistiques d'utilisation",
                icon: Users,
                usage: "Utilisé 45 fois"
              },
              {
                title: "Analyse tendances",
                description: "Évolutions et projections",
                icon: TrendingUp,
                usage: "Utilisé 78 fois"
              }
            ].map((template, index) => {
              const IconComponent = template.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <IconComponent className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{template.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <p className="text-xs text-gray-500">{template.usage}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Utiliser ce modèle
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdvancedAnalysis = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-blue-600" />
            Tableaux de bord détaillés
          </CardTitle>
          <CardDescription>
            Analyses approfondies avec visualisations interactives et insights avancés
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sélection du type d'analyse */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <BarChart className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <h4 className="font-medium mb-1">Analyse de performance</h4>
                <p className="text-sm text-gray-600">Métriques et KPI détaillés</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <TrendingUpIcon className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <h4 className="font-medium mb-1">Analyse des tendances</h4>
                <p className="text-sm text-gray-600">Évolutions et projections</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <PieChartIcon className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <h4 className="font-medium mb-1">Analyse comparative</h4>
                <p className="text-sm text-gray-600">Comparaisons et benchmarks</p>
              </CardContent>
            </Card>
          </div>

          {/* Tableau de bord interactif */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Métriques principales */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Métriques principales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Taux d\'engagement', value: '94.2%', change: '+2.1%', trend: 'up' },
                    { label: 'Temps de traitement moyen', value: '3.2 min', change: '-15%', trend: 'down' },
                    { label: 'Satisfaction utilisateur', value: '4.7/5', change: '+0.3', trend: 'up' },
                    { label: 'Taux de résolution', value: '89.1%', change: '+5.2%', trend: 'up' }
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                        <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {metric.trend === 'up' ? (
                          <ArrowUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Analyse géographique */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Répartition géographique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { region: 'Alger', value: '32%', count: '1,247 cas' },
                    { region: 'Oran', value: '18%', count: '692 cas' },
                    { region: 'Constantine', value: '14%', count: '534 cas' },
                    { region: 'Annaba', value: '12%', count: '467 cas' },
                    { region: 'Autres', value: '24%', count: '923 cas' }
                  ].map((region, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{region.region}</span>
                        <span className="text-gray-600">{region.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: region.value }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analyse temporelle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analyse temporelle</CardTitle>
              <CardDescription>
                Évolution des métriques sur les 12 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <LineChart className="w-12 h-12 mx-auto mb-2" />
                  <p>Graphique temporel interactif</p>
                  <p className="text-sm">Données des 12 derniers mois</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights et recommandations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Insights IA et recommandations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: 'insight',
                    title: 'Pic d\'activité détecté',
                    description: 'Une augmentation de 35% des consultations a été observée les mardis entre 10h et 12h.',
                    priority: 'medium'
                  },
                  {
                    type: 'recommendation',
                    title: 'Optimisation suggérée',
                    description: 'Considérez l\'ajout de ressources supplémentaires pendant les créneaux de forte affluence.',
                    priority: 'high'
                  },
                  {
                    type: 'trend',
                    title: 'Tendance émergente',
                    description: 'Les recherches liées au droit numérique augmentent de 15% chaque mois.',
                    priority: 'low'
                  }
                ].map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    item.priority === 'high' ? 'border-red-500 bg-red-50' :
                    item.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <Badge variant="outline" className={
                        item.priority === 'high' ? 'border-red-500 text-red-700' :
                        item.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                        'border-blue-500 text-blue-700'
                      }>
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Configurer
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Partager
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <AIAssistantDialog tabType="analysis" title="Analyses avancées" />
              <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Download className="w-4 h-4" />
                Exporter analyse
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const juridicalAnalyses = [
    {
      title: "Analyse comparative - Réforme du droit des sociétés 2025",
      description: "Étude détaillée des modifications apportées au code des sociétés et leurs impacts",
      author: "Dr. Ahmed Benali",
      date: "15 janvier 2025",
      category: "Droit des sociétés",
      status: "Publié",
      views: 1245,
      rating: 4.8,
      tags: ["réforme", "sociétés", "comparative"]
    },
    {
      title: "Impact de la digitalisation sur les procédures administratives",
      description: "Analyse des transformations numériques dans l'administration publique",
      author: "Me. Fatima Zahra",
      date: "12 janvier 2025",
      category: "Administration",
      status: "En révision",
      views: 892,
      rating: 4.6,
      tags: ["digital", "administration", "procédures"]
    },
    {
      title: "Évolution jurisprudentielle en droit du travail 2024",
      description: "Synthèse des principales décisions judiciaires en matière de droit du travail",
      author: "Prof. Mohamed Cherif",
      date: "10 janvier 2025",
      category: "Droit du travail",
      status: "Publié",
      views: 1567,
      rating: 4.9,
      tags: ["jurisprudence", "travail", "évolution"]
    }
  ];

  const institutionalAnalyses = [
    {
      title: "Performance des tribunaux administratifs - Bilan 2024",
      description: "Analyse statistique des performances et délais de traitement",
      institution: "Conseil d'État",
      date: "20 janvier 2025",
      period: "Année 2024",
      status: "Finalisé",
      metrics: { cases: 12450, avgTime: "8.5 mois", satisfaction: "87%" }
    },
    {
      title: "Évaluation de l'efficacité des procédures douanières",
      description: "Étude d'impact des nouvelles procédures simplifiées",
      institution: "Administration des Douanes",
      date: "18 janvier 2025",
      period: "S2 2024",
      status: "En cours",
      metrics: { processes: 8900, reduction: "35%", satisfaction: "92%" }
    },
    {
      title: "Analyse de la charge de travail - Tribunaux de première instance",
      description: "Évaluation de la répartition et gestion des affaires judiciaires",
      institution: "Ministère de la Justice",
      date: "15 janvier 2025",
      period: "Q4 2024",
      status: "Publié",
      metrics: { cases: 45600, clearance: "94%", backlog: "-12%" }
    }
  ];

  const juridicalReports = [
    {
      title: "Rapport annuel sur l'évolution législative 2024",
      description: "Synthèse complète des textes adoptés et leur impact sur le système juridique",
      type: "Rapport annuel",
      author: "Commission Juridique Nationale",
      date: "25 décembre 2024",
      pages: 156,
      status: "Publié",
      downloads: 2345,
      category: "Législation"
    },
    {
      title: "Bilan semestriel - Application des réformes judiciaires",
      description: "Évaluation de la mise en œuvre des réformes du système judiciaire",
      type: "Rapport semestriel",
      author: "Observatoire de la Justice",
      date: "30 juin 2024",
      pages: 89,
      status: "Publié",
      downloads: 1678,
      category: "Justice"
    },
    {
      title: "Analyse d'impact - Nouvelles procédures de médiation",
      description: "Évaluation des effets des mécanismes alternatifs de résolution des conflits",
      type: "Étude d'impact",
      author: "Centre de Médiation Juridique",
      date: "15 novembre 2024",
      pages: 67,
      status: "Publié",
      downloads: 945,
      category: "Médiation"
    }
  ];

  const institutionalReports = [
    {
      title: "Performance des institutions judiciaires - Tableau de bord 2024",
      description: "Indicateurs clés de performance du système judiciaire national",
      institution: "Conseil Supérieur du Pouvoir Judiciaire",
      date: "31 décembre 2024",
      scope: "National",
      kpi: { efficiency: "89%", satisfaction: "85%", digitalization: "76%" },
      status: "Publié"
    },
    {
      title: "Rapport d'activité - Cour des Comptes 2024",
      description: "Bilan des contrôles et recommandations de la Cour des Comptes",
      institution: "Cour des Comptes",
      date: "15 janvier 2025",
      scope: "Secteur public",
      kpi: { audits: 145, recommendations: 387, compliance: "78%" },
      status: "En cours"
    },
    {
      title: "Évaluation des services publics numériques",
      description: "Analyse de la transformation digitale des administrations publiques",
      institution: "Agence de Développement Digital",
      date: "10 décembre 2024",
      scope: "Administration",
      kpi: { services: 234, users: "1.2M", satisfaction: "91%" },
      status: "Publié"
    }
  ];

  const renderAnalysis = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex items-center justify-between mb-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="juridiques">Analyses juridiques</TabsTrigger>
          <TabsTrigger value="institutionnelles">Analyses institutionnelles</TabsTrigger>
          <TabsTrigger value="avancees">Analyses avancées</TabsTrigger>
        </TabsList>
        <AIAssistantDialog tabType={activeTab} title="Analyses" />
      </div>

      <TabsContent value="juridiques" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {juridicalAnalyses.map((analysis, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-2 bg-blue-100 text-blue-800">{analysis.category}</Badge>
                    <CardTitle className="text-lg">{analysis.title}</CardTitle>
                    <CardDescription className="mt-2">{analysis.description}</CardDescription>
                  </div>
                  <Badge className={analysis.status === 'Publié' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                    {analysis.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {analysis.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {analysis.date}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {analysis.views} vues
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {analysis.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1 flex-wrap">
                    {analysis.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Consulter
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="institutionnelles" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {institutionalAnalyses.map((analysis, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-2 bg-purple-100 text-purple-800">
                      <Building2 className="w-3 h-3 mr-1" />
                      {analysis.institution}
                    </Badge>
                    <CardTitle className="text-lg">{analysis.title}</CardTitle>
                    <CardDescription className="mt-2">{analysis.description}</CardDescription>
                  </div>
                  <Badge className={analysis.status === 'Finalisé' || analysis.status === 'Publié' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                    {analysis.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {analysis.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {analysis.period}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {Object.entries(analysis.metrics).map(([key, value], i) => (
                      <div key={i} className="p-2 bg-gray-50 rounded">
                        <div className="text-sm font-medium">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Consulter
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Rapport complet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="avancees" className="space-y-4">
        {renderAdvancedAnalysis()}
      </TabsContent>
    </Tabs>
  );

  const renderReports = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex items-center justify-between mb-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="juridiques">Rapports juridiques</TabsTrigger>
          <TabsTrigger value="institutionnels">Rapports institutionnels</TabsTrigger>
          <TabsTrigger value="export-avance">Export avancé</TabsTrigger>
        </TabsList>
        <AIAssistantDialog tabType={activeTab} title="Rapports" />
      </div>

      <TabsContent value="juridiques" className="space-y-4">
        <div className="space-y-4">
          {juridicalReports.map((report, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-emerald-100 text-emerald-800">{report.type}</Badge>
                      <Badge variant="outline">{report.category}</Badge>
                      <Badge className={report.status === 'Publié' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {report.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
                    <p className="text-gray-600 mb-4">{report.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {report.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {report.pages} pages
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {report.downloads} téléchargements
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-6">
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Consulter
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="institutionnels" className="space-y-4">
        <div className="space-y-4">
          {institutionalReports.map((report, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        <Building2 className="w-3 h-3 mr-1" />
                        {report.institution}
                      </Badge>
                      <Badge variant="outline">{report.scope}</Badge>
                      <Badge className={report.status === 'Publié' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {report.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
                    <p className="text-gray-600 mb-4">{report.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </span>
                      <span>Périmètre: {report.scope}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(report.kpi).map(([key, value], i) => (
                        <div key={i} className="text-center p-3 bg-gray-50 rounded">
                          <div className="text-lg font-bold text-emerald-600">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-6">
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Consulter
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Download className="w-4 h-4 mr-2" />
                      Rapport complet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="export-avance" className="space-y-4">
        {renderAdvancedExport()}
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          {section === 'dashboards' && <BarChart3 className="w-6 h-6 text-emerald-600" />}
          {section === 'analysis' && <TrendingUp className="w-6 h-6 text-emerald-600" />}
          {section === 'reports' && <FileText className="w-6 h-6 text-emerald-600" />}
          {section === 'dashboards' && 'Tableaux de bord'}
          {section === 'analysis' && 'Analyses'}
          {section === 'reports' && 'Rapports'}
        </h2>
        <p className="text-gray-600">
          {section === 'dashboards' && 'Visualisations et indicateurs clés de performance avancés'}
          {section === 'analysis' && 'Analyses approfondies juridiques et institutionnelles avec IA'}
          {section === 'reports' && 'Rapports détaillés et études sectorielles intelligentes'}
        </p>
      </div>

      {section === 'dashboards' && renderEnhancedDashboard()}
      {section === 'analysis' && renderAnalysis()}
      {section === 'reports' && renderReports()}
    </div>
  );
}
