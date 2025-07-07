import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Download, 
  Eye, 
  Share2, 
  BookOpen, 
  Bot, 
  Filter,
  Save,
  Database,
  Star,
  Calendar,
  User,
  GitCompare,
  History,
  CheckCircle,
  Building2,
  Scale,
  FileText,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
  Award,
  Upload,
  MapPin,
  MessageSquare,
  UserPlus,
  Activity,
  Clock,
  ThumbsUp,
  Wand2
} from 'lucide-react';
import { LegalTextHistoryTab } from './legal/LegalTextHistoryTab';
import { LegalStatusBadge } from './legal/LegalStatusBadge';
import { LegalTextsPendingApprovalTab } from './legal/LegalTextsPendingApprovalTab';

interface LegalTextsTabsProps {
  section: string;
  onAddLegalText?: () => void;
  onOpenApprovalQueue?: () => void;
}

export function LegalTextsTabs({ section, onAddLegalText, onOpenApprovalQueue }: LegalTextsTabsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTexts, setSelectedTexts] = useState<string[]>([]);

  const handleAddClick = () => {
    console.log('Bouton vert cliqué - Redirection vers le formulaire');
    if (onAddLegalText) {
      onAddLegalText();
    } else {
      console.error('onAddLegalText function not provided');
    }
  };

  const renderTimelineTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chronologie des textes juridiques</CardTitle>
          <CardDescription>
            Suivez l'évolution des textes juridiques dans le temps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                date: "15 janvier 2025",
                title: "Loi n° 2025-001 sur la réforme du droit des sociétés",
                type: "Nouvelle loi",
                status: "Publié",
                color: "bg-green-100 text-green-800"
              },
              {
                date: "12 janvier 2025",
                title: "Modification du Code civil - Article 1234",
                type: "Modification",
                status: "En vigueur",
                color: "bg-blue-100 text-blue-800"
              },
              {
                date: "8 janvier 2025",
                title: "Décret d'application n° 2025-045",
                type: "Décret",
                status: "Publié",
                color: "bg-purple-100 text-purple-800"
              },
              {
                date: "5 janvier 2025",
                title: "Abrogation de l'arrêté du 15 mars 2020",
                type: "Abrogation",
                status: "Effectif",
                color: "bg-red-100 text-red-800"
              }
            ].map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-3 h-3 bg-emerald-500 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <Badge className={event.color}>
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{event.type} • {event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCatalogTab = () => (
    <div className="space-y-6">
      {/* Tableau de bord */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <BarChart3 className="w-5 h-5" />
            Tableau de bord - Textes juridiques
          </CardTitle>
          <CardDescription>
            Vue d'ensemble de la collection de textes juridiques algériens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-emerald-600">2,847</div>
              <div className="text-sm text-gray-600">Textes juridiques</div>
              <div className="text-xs text-gray-500 mt-1">Total disponible</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">456</div>
              <div className="text-sm text-gray-600">Codes juridiques</div>
              <div className="text-xs text-gray-500 mt-1">Codes unifiés</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600">1,234</div>
              <div className="text-sm text-gray-600">Lois et ordonnances</div>
              <div className="text-xs text-gray-500 mt-1">Textes législatifs</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-orange-600">89%</div>
              <div className="text-sm text-gray-600">Textes à jour</div>
              <div className="text-xs text-gray-500 mt-1">Dernière mise à jour</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher dans le catalogue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
        </div>
        <div className="flex gap-2">
          {onOpenApprovalQueue && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onOpenApprovalQueue}
              className="gap-2"
            >
              <Clock className="w-4 h-4" />
              File d'approbation
            </Button>
          )}
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700" 
            size="sm" 
            onClick={handleAddClick}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un texte juridique
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Code civil algérien",
            category: "Code",
            status: "en_vigueur",
            badges: ["Ordonnance 75-58", "Modifié"],
            author: "Assemblée populaire nationale",
            date: "26 septembre 1975",
            views: 45672,
            readingTime: "2h 30min",
            downloads: 3456,
            color: "bg-blue-100 text-blue-800"
          },
          {
            title: "Code pénal algérien",
            category: "Code",
            status: "en_vigueur",
            badges: ["Ordonnance 66-156", "Droit pénal"],
            author: "Assemblée populaire nationale",
            date: "8 juin 1966",
            views: 38924,
            readingTime: "3h 15min",
            downloads: 2847,
            color: "bg-red-100 text-red-800"
          },
          {
            title: "Code de procédure civile et administrative",
            category: "Code",
            status: "en_vigueur",
            badges: ["Ordonnance 08-09", "Procédure"],
            author: "Assemblée populaire nationale",
            date: "25 février 2008",
            views: 29456,
            readingTime: "2h 45min",
            downloads: 1923,
            color: "bg-green-100 text-green-800"
          },
          {
            title: "Constitution de la République algérienne",
            category: "Constitution",
            status: "en_vigueur",
            badges: ["Révisée 2020", "Fondamental"],
            author: "Assemblée populaire nationale",
            date: "1er novembre 2020",
            views: 67834,
            readingTime: "1h 45min",
            downloads: 5672,
            color: "bg-purple-100 text-purple-800"
          },
          {
            title: "Code de la famille",
            category: "Code",
            status: "en_vigueur",
            badges: ["Ordonnance 84-11", "Famille"],
            author: "Assemblée populaire nationale",
            date: "9 juin 1984",
            views: 52341,
            readingTime: "1h 30min",
            downloads: 4123,
            color: "bg-orange-100 text-orange-800"
          },
          {
            title: "Code du travail",
            category: "Code",
            status: "en_vigueur",
            badges: ["Loi 90-11", "Social"],
            author: "Assemblée populaire nationale",
            date: "21 avril 1990",
            views: 41267,
            readingTime: "2h 10min",
            downloads: 3245,
            color: "bg-teal-100 text-teal-800"
          },
          {
            title: "Loi sur les hydrocarbures",
            category: "Loi",
            status: "en_vigueur",
            badges: ["Loi 19-13", "Énergie"],
            author: "Assemblée populaire nationale",
            date: "11 décembre 2019",
            views: 15823,
            readingTime: "1h 20min",
            downloads: 1456,
            color: "bg-yellow-100 text-yellow-800"
          },
          {
            title: "Loi sur la monnaie et le crédit",
            category: "Loi",
            status: "en_vigueur",
            badges: ["Ordonnance 03-11", "Financier"],
            author: "Assemblée populaire nationale",
            date: "26 août 2003",
            views: 23456,
            readingTime: "2h 00min",
            downloads: 1867,
            color: "bg-indigo-100 text-indigo-800"
          },
          {
            title: "Code de l'environnement",
            category: "Code",
            status: "en_vigueur",
            badges: ["Loi 03-10", "Environnement"],
            author: "Assemblée populaire nationale",
            date: "19 juillet 2003",
            views: 18734,
            readingTime: "1h 50min",
            downloads: 1234,
            color: "bg-emerald-100 text-emerald-800"
          }
        ].map((text, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow border-emerald-200">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <Badge variant="secondary" className={`${text.color}`}>{text.category}</Badge>
                <LegalStatusBadge status={text.status as any} />
              </div>
              <CardTitle className="text-lg">{text.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-sm text-gray-500">
                {text.author && (
                  <>
                    <User className="w-4 h-4" />
                    Par {text.author}
                  </>
                )}
                {text.date && (
                  <>
                    <Calendar className="w-4 h-4 ml-2" />
                    {text.date}
                  </>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">Texte juridique officiel de la République algérienne.</p>
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-1">
                  {text.badges.map((badge, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{badge}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  Lire
                </Button>
                {text.downloads > 0 && (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-1" />
                  Partager
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                {text.views} vues
                {text.readingTime && ` • ${text.readingTime} de lecture`}
                {text.downloads > 0 && ` • ${text.downloads} téléchargements`}
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
            Principales institutions productrices de textes juridiques en Algérie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Assemblée Populaire Nationale",
                type: "Législatif",
                textes: 1247,
                color: "bg-blue-100 text-blue-800"
              },
              {
                name: "Conseil de la Nation",
                type: "Législatif",
                textes: 456,
                color: "bg-purple-100 text-purple-800"
              },
              {
                name: "Présidence de la République",
                type: "Exécutif",
                textes: 892,
                color: "bg-green-100 text-green-800"
              },
              {
                name: "Conseil des Ministres",
                type: "Exécutif",
                textes: 634,
                color: "bg-orange-100 text-orange-800"
              },
              {
                name: "Cour Suprême",
                type: "Judiciaire",
                textes: 289,
                color: "bg-red-100 text-red-800"
              },
              {
                name: "Conseil d'État",
                type: "Judiciaire",
                textes: 156,
                color: "bg-indigo-100 text-indigo-800"
              }
            ].map((institution, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{institution.name}</h4>
                  <Badge className={institution.color}>
                    {institution.type}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{institution.textes}</span> textes publiés
                </div>
              </div>
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
            Classification des différents types de textes juridiques disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: "Codes", count: 45, description: "Codes unifiés", color: "bg-blue-100 text-blue-800" },
              { type: "Lois", count: 1234, description: "Lois nationales", color: "bg-green-100 text-green-800" },
              { type: "Ordonnances", count: 456, description: "Ordonnances présidentielles", color: "bg-purple-100 text-purple-800" },
              { type: "Décrets", count: 789, description: "Décrets exécutifs", color: "bg-orange-100 text-orange-800" },
              { type: "Arrêtés", count: 567, description: "Arrêtés ministériels", color: "bg-red-100 text-red-800" },
              { type: "Circulaires", count: 234, description: "Circulaires d'application", color: "bg-yellow-100 text-yellow-800" },
              { type: "Instructions", count: 123, description: "Instructions techniques", color: "bg-indigo-100 text-indigo-800" },
              { type: "Conventions", count: 89, description: "Conventions internationales", color: "bg-teal-100 text-teal-800" }
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-lg text-center hover:shadow-sm transition-shadow">
                <Badge className={`mb-2 ${item.color}`}>
                  {item.type}
                </Badge>
                <div className="text-2xl font-bold text-gray-900">{item.count}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Textes juridiques en vedette */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-600" />
            Textes juridiques en vedette
          </CardTitle>
          <CardDescription>
            Textes juridiques les plus consultés et importants ce mois-ci
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Constitution de la République algérienne (révision 2020)",
                category: "Constitution",
                views: "67.8k vues",
                trend: "+15%",
                badge: "Tendance",
                color: "bg-purple-100 text-purple-800"
              },
              {
                title: "Loi de finances 2025",
                category: "Loi",
                views: "45.2k vues",
                trend: "+28%",
                badge: "Nouveau",
                color: "bg-green-100 text-green-800"
              },
              {
                title: "Code de l'investissement (Loi 22-18)",
                category: "Code",
                views: "38.9k vues",
                trend: "+22%",
                badge: "Populaire",
                color: "bg-blue-100 text-blue-800"
              },
              {
                title: "Loi sur la digitalisation des services publics",
                category: "Loi",
                views: "29.5k vues",
                trend: "+35%",
                badge: "Innovation",
                color: "bg-orange-100 text-orange-800"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <Badge className={item.color}>
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className="text-emerald-700 bg-emerald-50">
                      {item.badge}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.views}
                    </span>
                    <span className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      {item.trend}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Témoignages récents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            Témoignages récents
          </CardTitle>
          <CardDescription>
            Retours d'expérience des utilisateurs de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Me. Amina Benali",
                role: "Avocate, Barreau d'Alger",
                comment: "Cette plateforme m'a considérablement facilité l'accès aux textes juridiques. La recherche intelligente est particulièrement utile pour mes dossiers.",
                rating: 5,
                date: "Il y a 2 jours"
              },
              {
                name: "Dr. Karim Meziane",
                role: "Professeur de droit, Université d'Alger",
                comment: "Un outil indispensable pour l'enseignement du droit. Les étudiants peuvent facilement accéder aux textes consolidés et à jour.",
                rating: 5,
                date: "Il y a 5 jours"
              },
              {
                name: "Mme. Fatima Cherif",
                role: "Juriste d'entreprise",
                comment: "La fonction de comparaison des textes est excellente. Elle m'aide à suivre les évolutions législatives importantes pour mon secteur.",
                rating: 4,
                date: "Il y a 1 semaine"
              },
              {
                name: "M. Ahmed Bouaziz",
                role: "Notaire, Oran",
                comment: "Interface intuitive et contenu riche. J'apprécie particulièrement les alertes sur les nouvelles publications.",
                rating: 5,
                date: "Il y a 1 semaine"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">"{testimonial.comment}"</p>
                <p className="text-xs text-gray-500">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contribuez à la base de données */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <UserPlus className="w-5 h-5" />
            Contribuez à la base de données
          </CardTitle>
          <CardDescription>
            Aidez-nous à enrichir et maintenir à jour la collection de textes juridiques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Plus className="w-12 h-12 mx-auto text-emerald-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Ajouter un texte</h4>
              <p className="text-sm text-gray-600 mb-4">
                Contribuez en ajoutant de nouveaux textes juridiques à la base de données
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleAddClick}>
                Ajouter un texte
              </Button>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Activity className="w-12 h-12 mx-auto text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Signaler une erreur</h4>
              <p className="text-sm text-gray-600 mb-4">
                Aidez-nous à corriger les erreurs et améliorer la qualité des textes
              </p>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Signaler
              </Button>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <ThumbsUp className="w-12 h-12 mx-auto text-purple-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Donner un avis</h4>
              <p className="text-sm text-gray-600 mb-4">
                Partagez votre expérience et suggestions d'amélioration
              </p>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                Évaluer
              </Button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Statistiques de contribution</h5>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">156</div>
                <div className="text-sm text-gray-600">Contributions ce mois</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-gray-600">Erreurs corrigées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">89</div>
                <div className="text-sm text-gray-600">Avis reçus</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-gray-600">Contributeurs actifs</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderComparisonTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sélectionner les textes à comparer</CardTitle>
          <CardDescription>
            Choisissez au moins 2 textes juridiques pour commencer la comparaison
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: "1", title: "Loi n° 2024-001 sur les entreprises", type: "Loi", date: "15/01/2024" },
              { id: "2", title: "Décret n° 2024-045 d'application", type: "Décret", date: "20/01/2024" },
              { id: "3", title: "Arrêté ministériel n° 125", type: "Arrêté", date: "25/01/2024" },
              { id: "4", title: "Circulaire n° 2024-003", type: "Circulaire", date: "30/01/2024" }
            ].map((text) => (
              <div 
                key={text.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedTexts.includes(text.id) 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  if (selectedTexts.includes(text.id)) {
                    setSelectedTexts(prev => prev.filter(id => id !== text.id));
                  } else {
                    setSelectedTexts(prev => [...prev, text.id]);
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center mt-1 ${
                    selectedTexts.includes(text.id)
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedTexts.includes(text.id) && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{text.title}</h4>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Type: {text.type}</span>
                      <span>Date: {text.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              {selectedTexts.length} texte(s) sélectionné(s)
            </p>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={selectedTexts.length < 2}
              onClick={() => {
                console.log('Comparaison des textes:', selectedTexts);
              }}
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Comparer les textes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEnrichmentTab = () => (
    <div className="space-y-6">
      {/* Tableau de bord simplifié */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <BarChart3 className="w-5 h-5" />
            Tableau de bord
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-emerald-600">1,247</div>
              <div className="text-sm text-gray-600">Textes ajoutés</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">89</div>
              <div className="text-sm text-gray-600">En cours</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600">Validés</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">23</div>
              <div className="text-sm text-gray-600">En attente</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleAddClick}>
          <CardHeader className="text-center">
            <Plus className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
            <CardTitle>Ajouter un texte juridique</CardTitle>
            <CardDescription>
              Saisir manuellement un nouveau texte juridique dans la base de données
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau texte
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Upload className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <CardTitle>Import en lot</CardTitle>
            <CardDescription>
              Importer plusieurs textes juridiques depuis un fichier Excel/CSV
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV/Excel
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Wand2 className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <CardTitle>Auto-remplissage intelligent</CardTitle>
            <CardDescription>
              Remplissage automatique des formulaires avec IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Wand2 className="w-4 h-4 mr-2" />
              Auto-remplissage
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Database className="w-12 h-12 mx-auto text-orange-600 mb-4" />
            <CardTitle>Extraction automatique</CardTitle>
            <CardDescription>
              Importer et traiter automatiquement des textes juridiques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              <Database className="w-4 h-4 mr-2" />
              Extraction auto
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSearchTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Bot className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <CardTitle>Recherche Intelligente</CardTitle>
            <CardDescription>
              Recherche avancée avec traitement automatique du langage naturel et IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Bot className="w-4 h-4 mr-2" />
              Recherche IA
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <MapPin className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
            <CardTitle>Recherche par Géolocalisation</CardTitle>
            <CardDescription>
              Trouvez des textes juridiques spécifiques à votre région ou juridiction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <MapPin className="w-4 h-4 mr-2" />
              Recherche géolocalisée
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Search className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <CardTitle>Recherche avancée</CardTitle>
            <CardDescription>
              Outils de recherche avancée avec filtres multiples et critères spécifiques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Recherche avancée
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recherches sauvegardées enrichies avec exemples algériens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="w-5 h-5 text-emerald-600" />
            Recherches sauvegardées
          </CardTitle>
          <CardDescription>
            Vos dernières recherches de textes juridiques algériens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                id: 1,
                title: "Constitution algérienne de 2020 - Amendements",
                date: "15 jan 2025",
                results: 45,
                category: "Constitutionnel",
                lastAccessed: "Il y a 2 jours",
                keywords: ["révision constitutionnelle", "2020", "Hirak"]
              },
              {
                id: 2,
                title: "Code de la famille algérien - Ordonnance 05-02",
                date: "12 jan 2025",
                results: 67,
                category: "Civil",
                lastAccessed: "Il y a 5 jours",
                keywords: ["mariage", "divorce", "héritage"]
              },
              {
                id: 3,
                title: "Loi sur les hydrocarbures 19-13",
                date: "10 jan 2025",
                results: 89,
                category: "Économique",
                lastAccessed: "Il y a 1 semaine",
                keywords: ["pétrole", "gaz", "Sonatrach"]
              },
              {
                id: 4,
                title: "Code du travail algérien - Loi 90-11",
                date: "8 jan 2025",
                results: 134,
                category: "Social",
                lastAccessed: "Il y a 3 jours",
                keywords: ["contrat", "syndicat", "UGTA"]
              },
              {
                id: 5,
                title: "Loi de finances 2025",
                date: "5 jan 2025",
                results: 78,
                category: "Fiscal",
                lastAccessed: "Il y a 4 jours",
                keywords: ["budget", "TVA", "impôts"]
              }
            ].map((search) => (
              <div key={search.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-medium text-gray-900">{search.title}</h4>
                    <Badge variant="outline">{search.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {search.date}
                    </span>
                    <span>{search.results} résultats</span>
                    <span>{search.lastAccessed}</span>
                  </div>
                  <div className="flex gap-1">
                    {search.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-emerald-50 text-emerald-700">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="link">
              Voir toutes les recherches sauvegardées
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recherches populaires en Algérie - Nouvelle section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            Recherches populaires en Algérie
          </CardTitle>
          <CardDescription>
            Les textes juridiques les plus consultés par les juristes algériens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { 
                query: "Constitution algérienne 2020", 
                count: "25,847 recherches", 
                category: "Constitutionnel",
                trend: "+15%",
                description: "Révision constitutionnelle suite au Hirak"
              },
              { 
                query: "Code de procédure civile et administrative", 
                count: "18,235 recherches", 
                category: "Procédural",
                trend: "+8%",
                description: "Ordonnance 08-09 modifiée"
              },
              { 
                query: "Loi sur les investissements 22-18", 
                count: "16,923 recherches", 
                category: "Économique",
                trend: "+22%",
                description: "Nouvelle loi sur la promotion de l'investissement"
              },
              { 
                query: "Code pénal algérien", 
                count: "14,567 recherches", 
                category: "Pénal",
                trend: "+5%",
                description: "Ordonnance 66-156 et ses modifications"
              },
              { 
                query: "Loi sur la monnaie et le crédit", 
                count: "12,890 recherches", 
                category: "Financier",
                trend: "+12%",
                description: "Ordonnance 03-11 - Banque d'Algérie"
              },
              { 
                query: "Code de l'environnement", 
                count: "11,456 recherches", 
                category: "Environnement",
                trend: "+18%",
                description: "Loi 03-10 relative à la protection de l'environnement"
              },
              { 
                query: "Statut général de la fonction publique", 
                count: "10,234 recherches", 
                category: "Administratif",
                trend: "+3%",
                description: "Ordonnance 06-03 modifiée"
              },
              { 
                query: "Loi sur l'information", 
                count: "9,178 recherches", 
                category: "Médias",
                trend: "+25%",
                description: "Loi organique 12-05 relative à l'information"
              }
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{item.query}</h4>
                    <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        {item.count}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${item.trend.startsWith('+') ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}
                      >
                        {item.trend}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      {item.category}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Search className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Save className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Statistiques des recherches populaires */}
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-600" />
              Analyse des tendances de recherche
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">147k</div>
                <div className="text-sm text-gray-600">Recherches ce mois</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-gray-600">Nouveaux textes indexés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">+12%</div>
                <div className="text-sm text-gray-600">Croissance mensuelle</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section complémentaire - Domaines juridiques populaires en Algérie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            Domaines juridiques les plus consultés
          </CardTitle>
          <CardDescription>
            Répartition des recherches par domaine du droit algérien
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { domain: "Droit commercial", percentage: "23%", count: "34.2k", color: "bg-blue-100 text-blue-800" },
              { domain: "Droit civil", percentage: "19%", count: "28.1k", color: "bg-green-100 text-green-800" },
              { domain: "Droit administratif", percentage: "16%", count: "23.7k", color: "bg-purple-100 text-purple-800" },
              { domain: "Droit pénal", percentage: "14%", count: "20.8k", color: "bg-red-100 text-red-800" },
              { domain: "Droit du travail", percentage: "12%", count: "17.8k", color: "bg-orange-100 text-orange-800" },
              { domain: "Droit fiscal", percentage: "8%", count: "11.9k", color: "bg-yellow-100 text-yellow-800" },
              { domain: "Droit de l'environnement", percentage: "5%", count: "7.4k", color: "bg-emerald-100 text-emerald-800" },
              { domain: "Droit constitutionnel", percentage: "3%", count: "4.5k", color: "bg-indigo-100 text-indigo-800" }
            ].map((item, index) => (
              <div key={index} className="p-3 border rounded-lg text-center hover:shadow-sm transition-shadow">
                <Badge className={`mb-2 ${item.color}`}>
                  {item.domain}
                </Badge>
                <div className="text-xl font-bold text-gray-900">{item.percentage}</div>
                <div className="text-sm text-gray-500">{item.count} recherches</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const getTabsConfig = () => {
    switch (section) {
      case 'legal-catalog':
        return {
          defaultValue: 'catalogue',
          tabs: [
            { value: 'catalogue', label: 'Catalogue', content: renderCatalogTab() },
            { value: 'timeline', label: 'Timeline des textes juridiques', content: renderTimelineTab() },
            { value: 'comparaison', label: 'Comparaison des textes', content: renderComparisonTab() },
            { value: 'historiques', label: 'Historiques des versions', content: <LegalTextHistoryTab /> }
          ]
        };
      case 'legal-enrichment':
        return {
          defaultValue: 'enrichment',
          tabs: [
            { value: 'enrichment', label: 'Alimentation', content: renderEnrichmentTab() },
            { value: 'pending-approval', label: 'Textes juridiques en attente de publication', content: <LegalTextsPendingApprovalTab /> }
          ]
        };
      case 'legal-search':
        return {
          defaultValue: 'search',
          tabs: [
            { value: 'search', label: 'Recherche', content: renderSearchTab() }
          ]
        };
      default:
        return {
          defaultValue: 'catalogue',
          tabs: [
            { value: 'catalogue', label: 'Catalogue', content: renderCatalogTab() }
          ]
        };
    }
  };

  const tabsConfig = getTabsConfig();

  return (
    <div className="space-y-6">
      <Tabs defaultValue={tabsConfig.defaultValue} className="w-full">
        <TabsList className={`grid w-full ${tabsConfig.tabs.length === 1 ? 'grid-cols-1' : 
          tabsConfig.tabs.length === 2 ? 'grid-cols-2' : 
          tabsConfig.tabs.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {tabsConfig.tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabsConfig.tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
