
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Calendar, 
  Clock, 
  Building,
  Users,
  MapPin,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  Download,
  Edit,
  Filter,
  Building2,
  Scale,
  Star,
  MessageSquare,
  UserPlus,
  TrendingUp,
  Heart,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Activity,
  Target,
  Zap
} from 'lucide-react';

interface ProcedureCatalogTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddProcedure: () => void;
  onOpenApprovalQueue?: () => void;
}

export function ProcedureCatalogTab({ searchTerm, setSearchTerm, onAddProcedure, onOpenApprovalQueue }: ProcedureCatalogTabProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Debug log pour vérifier si la fonction est transmise
  console.log('ProcedureCatalogTab - onOpenApprovalQueue:', typeof onOpenApprovalQueue, onOpenApprovalQueue);

  const procedures = [
    {
      id: 1,
      title: "Demande de passeport biométrique",
      category: "Citoyenneté",
      institution: "Ministère de l'Intérieur",
      duration: "15-30 jours",
      steps: 7,
      documents: 5,
      fees: "Gratuit",
      status: "Active",
      lastUpdate: "10/01/2024"
    },
    {
      id: 2,
      title: "Inscription à l'université",
      category: "Éducation",
      institution: "Ministère de l'Enseignement Supérieur",
      duration: "7-15 jours",
      steps: 5,
      documents: 8,
      fees: "Variable",
      status: "Active",
      lastUpdate: "05/01/2024"
    },
    {
      id: 3,
      title: "Création d'une entreprise",
      category: "Commerce",
      institution: "CNRC",
      duration: "3-7 jours",
      steps: 12,
      documents: 10,
      fees: "5000 DA",
      status: "En révision",
      lastUpdate: "02/01/2024"
    },
    {
      id: 4,
      title: "Demande de logement social",
      category: "Logement",
      institution: "APC",
      duration: "30-60 jours",
      steps: 10,
      documents: 12,
      fees: "Gratuit",
      status: "Inactive",
      lastUpdate: "28/12/2023"
    },
    {
      id: 5,
      title: "Renouvellement de carte d'identité",
      category: "Citoyenneté",
      institution: "Ministère de l'Intérieur",
      duration: "10-20 jours",
      steps: 6,
      documents: 4,
      fees: "Gratuit",
      status: "Active",
      lastUpdate: "15/12/2023"
    },
    {
      id: 6,
      title: "Demande de permis de construire",
      category: "Urbanisme",
      institution: "APC",
      duration: "60-90 jours",
      steps: 15,
      documents: 15,
      fees: "Variable",
      status: "En révision",
      lastUpdate: "01/12/2023"
    }
  ];

  const categories = ["all", "Citoyenneté", "Éducation", "Commerce", "Logement", "Urbanisme"];
  const statuses = ["all", "Active", "Inactive", "En révision"];

  const filteredProcedures = procedures.filter(procedure => {
    const searchMatch = procedure.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'all' || procedure.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || procedure.status === selectedStatus;
    return searchMatch && categoryMatch && statusMatch;
  });

  const getStatusColor = (status: string, isIcon = false) => {
    if (isIcon) {
      switch (status) {
        case "Active": return "text-green-600";
        case "En révision": return "text-yellow-600";
        case "Inactive": return "text-red-600";
        default: return "text-gray-600";
      }
    } else {
      switch (status) {
        case "Active": return "bg-green-100 text-green-800";
        case "En révision": return "bg-yellow-100 text-yellow-800";
        case "Inactive": return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-800";
      }
    }
  };

  const handleApprovalQueueClick = () => {
    console.log('Bouton File d\'approbation cliqué - fonction disponible:', !!onOpenApprovalQueue);
    if (onOpenApprovalQueue) {
      console.log('Appel de la fonction onOpenApprovalQueue');
      onOpenApprovalQueue();
    } else {
      console.error('onOpenApprovalQueue function not provided');
    }
  };

  return (
    <div className="space-y-6">
      {/* Tableau de bord des procédures */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <BarChart3 className="w-6 h-6" />
            Tableau de bord des procédures administratives
          </CardTitle>
          <CardDescription className="text-blue-600">
            Vue d'ensemble des procédures disponibles et de leur statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white border-blue-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-700">457</div>
                    <div className="text-sm text-blue-600">Procédures actives</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-green-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">123</div>
                    <div className="text-sm text-green-600">Nouvelles ce mois</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-yellow-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-700">89</div>
                    <div className="text-sm text-yellow-600">En attente</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-purple-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-700">95%</div>
                    <div className="text-sm text-purple-600">Taux de réussite</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Indicateurs de performance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Délai moyen</span>
                  <Zap className="w-4 h-4 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">18 jours</div>
                <div className="text-xs text-green-600">↓ 12% ce mois</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Satisfaction</span>
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.3/5</div>
                <div className="text-xs text-green-600">↑ 0.2 ce mois</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Utilisation</span>
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">12.5k</div>
                <div className="text-xs text-green-600">↑ 8% ce mois</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Barre de recherche avec boutons d'action */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Rechercher une procédure..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              onClick={handleApprovalQueueClick}
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <ClipboardCheck className="w-4 h-4 mr-2" />
              File d'approbation
            </Button>
            <Button 
              onClick={onAddProcedure}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une procédure
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="category">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="category">Catégorie</TabsTrigger>
              <TabsTrigger value="status">Statut</TabsTrigger>
            </TabsList>
            <TabsContent value="category" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'Toutes' : category}
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="status" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {statuses.map(status => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status === 'all' ? 'Tous' : status}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Exemples de procédures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProcedures.map((procedure) => (
          <Card key={procedure.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{procedure.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{procedure.category}</Badge>
                    <Badge className={`text-xs ${getStatusColor(procedure.status)}`}>
                      {procedure.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {procedure.institution}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {procedure.duration}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">{procedure.steps}</div>
                  <div className="text-xs text-gray-500">étapes</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{procedure.documents}</div>
                  <div className="text-xs text-gray-600">Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{procedure.fees}</div>
                  <div className="text-xs text-gray-600">Frais</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${getStatusColor(procedure.status, true)}`}>
                    {procedure.status === 'Active' ? <CheckCircle className="w-5 h-5 mx-auto" /> : 
                     procedure.status === 'En révision' ? <AlertCircle className="w-5 h-5 mx-auto" /> : 
                     <XCircle className="w-5 h-5 mx-auto" />}
                  </div>
                  <div className="text-xs text-gray-600">Statut</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Mis à jour: {procedure.lastUpdate}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Voir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Institutions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            Institutions
          </CardTitle>
          <CardDescription>
            Principales institutions administratives algériennes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Ministères",
                count: 35,
                icon: <Building2 className="w-6 h-6" />,
                color: "bg-blue-100 text-blue-600",
                examples: ["Ministère de l'Intérieur", "Ministère du Commerce", "Ministère de la Justice"]
              },
              {
                name: "Organismes publics",
                count: 42,
                icon: <Users className="w-6 h-6" />,
                color: "bg-green-100 text-green-600",
                examples: ["CNRC", "CNAS", "CASNOS"]
              },
              {
                name: "Collectivités locales",
                count: 1541,
                icon: <MapPin className="w-6 h-6" />,
                color: "bg-purple-100 text-purple-600",
                examples: ["Wilayas", "APC", "Daïras"]
              }
            ].map((institutionType, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${institutionType.color}`}>
                      {institutionType.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{institutionType.name}</h3>
                      <p className="text-sm text-gray-600">{institutionType.count} institutions</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {institutionType.examples.map((example, i) => (
                      <div key={i} className="text-xs text-gray-500">• {example}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Types de textes juridiques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            Types de textes juridiques
          </CardTitle>
          <CardDescription>
            Classifications des différents types de textes juridiques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                type: "Codes",
                count: 25,
                icon: <Scale className="w-5 h-5" />,
                color: "bg-blue-100 text-blue-600",
                examples: ["Code civil", "Code pénal", "Code de commerce"]
              },
              {
                type: "Lois",
                count: 156,
                icon: <FileText className="w-5 h-5" />,
                color: "bg-green-100 text-green-600",
                examples: ["Loi de finances", "Loi électorale", "Loi sur l'investissement"]
              },
              {
                type: "Ordonnances",
                count: 89,
                icon: <FileText className="w-5 h-5" />,
                color: "bg-yellow-100 text-yellow-600",
                examples: ["Ordonnance 75-58", "Ordonnance 03-11", "Ordonnance 96-22"]
              },
              {
                type: "Décrets",
                count: 432,
                icon: <FileText className="w-5 h-5" />,
                color: "bg-purple-100 text-purple-600",
                examples: ["Décrets exécutifs", "Décrets présidentiels", "Décrets législatifs"]
              }
            ].map((textType, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${textType.color}`}>
                      {textType.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{textType.type}</h3>
                      <p className="text-sm text-gray-600">{textType.count} textes</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {textType.examples.map((example, i) => (
                      <div key={i} className="text-xs text-gray-500">• {example}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nouvelle section: Textes juridiques en vedette */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600" />
            Textes juridiques en vedette
          </CardTitle>
          <CardDescription>
            Sélection des textes juridiques les plus consultés et importants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Code civil algérien",
                type: "Code",
                views: "12,456",
                date: "Dernière mise à jour: 15/01/2024",
                description: "Règles fondamentales du droit privé en Algérie",
                badge: "Tendance"
              },
              {
                title: "Loi de finances 2024",
                type: "Loi",
                views: "8,921",
                date: "Publié: 01/01/2024",
                description: "Budget de l'État et dispositions fiscales pour 2024",
                badge: "Nouveau"
              },
              {
                title: "Code du travail",
                type: "Code",
                views: "9,876",
                date: "Dernière mise à jour: 10/12/2023",
                description: "Relations individuelles et collectives du travail",
                badge: "Populaire"
              },
              {
                title: "Loi sur l'investissement",
                type: "Loi",
                views: "6,543",
                date: "Dernière mise à jour: 20/11/2023",
                description: "Cadre juridique pour les investissements en Algérie",
                badge: "Important"
              }
            ].map((text, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{text.title}</h3>
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">{text.badge}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{text.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {text.views} vues
                        </span>
                        <span>{text.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">{text.type}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Consulter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nouvelle section: Témoignages récents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Témoignages récents
          </CardTitle>
          <CardDescription>
            Retours d'expérience des utilisateurs de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Ahmed B.",
                role: "Avocat",
                message: "Cette plateforme m'a considérablement aidé dans mes recherches juridiques. L'interface est intuitive et les contenus sont très bien organisés.",
                rating: 5,
                date: "Il y a 2 jours"
              },
              {
                name: "Fatima K.",
                role: "Magistrat",
                message: "Excellent outil pour la recherche de jurisprudence. Les fonctionnalités de recherche avancée sont particulièrement utiles.",
                rating: 5,
                date: "Il y a 1 semaine"
              },
              {
                name: "Mohamed S.",
                role: "Étudiant en droit",
                message: "Très pratique pour mes études. Les explications sont claires et les documents sont facilement accessibles.",
                rating: 4,
                date: "Il y a 3 jours"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 italic">"{testimonial.message}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{testimonial.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section Contribuez à la base de données - Améliorée */}
      <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <UserPlus className="w-6 h-6" />
            Contribuez à la base de données des procédures
          </CardTitle>
          <CardDescription className="text-emerald-700">
            Aidez-nous à enrichir et améliorer la plateforme des procédures administratives algériennes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mt-1">
                  <Plus className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2 text-emerald-800">Ajouter des procédures</h4>
                  <p className="text-sm text-emerald-700 mb-4">
                    Contribuez en ajoutant de nouvelles procédures administratives, démarches ou services publics manquants dans notre base de données.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      Procédures de citoyenneté
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      Démarches administratives
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      Services en ligne
                    </div>
                  </div>
                  <Button onClick={onAddProcedure} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une procédure
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mt-1">
                  <Edit className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2 text-blue-800">Améliorer les informations</h4>
                  <p className="text-sm text-blue-700 mb-4">
                    Signalez les erreurs, mettez à jour les informations obsolètes ou proposez des améliorations aux procédures existantes.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <AlertCircle className="w-4 h-4" />
                      Corriger les délais
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <AlertCircle className="w-4 h-4" />
                      Mettre à jour les documents
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <AlertCircle className="w-4 h-4" />
                      Actualiser les tarifs
                    </div>
                  </div>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                    <Edit className="w-4 h-4 mr-2" />
                    Signaler une mise à jour
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mt-1">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2 text-purple-800">Partager votre expérience</h4>
                  <p className="text-sm text-purple-700 mb-4">
                    Laissez un témoignage pour aider d'autres citoyens dans leurs démarches administratives et améliorer nos services.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <Star className="w-4 h-4" />
                      Évaluer les procédures
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <Star className="w-4 h-4" />
                      Conseils pratiques
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <Star className="w-4 h-4" />
                      Retours d'expérience
                    </div>
                  </div>
                  <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Laisser un témoignage
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-emerald-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-emerald-600" />
                </div>
                <h4 className="font-bold text-xl mb-2 text-gray-800">Impact de vos contributions</h4>
                <p className="text-sm text-gray-600">
                  Ensemble, construisons la plus grande base de données des procédures administratives algériennes
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm font-medium text-emerald-800">Procédures ajoutées ce mois</span>
                  <span className="font-bold text-emerald-600 text-lg">+89</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">Mises à jour validées</span>
                  <span className="font-bold text-blue-600 text-lg">+156</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-purple-800">Contributeurs actifs</span>
                  <span className="font-bold text-purple-600 text-lg">342</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium text-orange-800">Consultations mensuelles</span>
                  <span className="font-bold text-orange-600 text-lg">25.8k</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">Programme de reconnaissance</div>
                    <div className="text-xs text-gray-600">Badges et certificats pour les contributeurs</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  Rejoignez notre communauté de contributeurs et aidez à simplifier les démarches administratives pour tous les Algériens.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
