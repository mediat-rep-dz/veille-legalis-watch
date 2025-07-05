
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  Newspaper, 
  BookOpen, 
  Book, 
  Users, 
  Search, 
  Download,
  ExternalLink,
  Calendar,
  Building2,
  FileText,
  Globe,
  Phone,
  Mail,
  MapPin,
  GraduationCap
} from "lucide-react";

interface NewsReferencesSectionsProps {
  section: string;
  language?: string;
}

export function NewsReferencesSections({ section, language = "fr" }: NewsReferencesSectionsProps) {
  const [institutionsFilter, setInstitutionsFilter] = useState("");
  const [courtsFilter, setCourtsFilter] = useState("");
  const [lawyersFilter, setLawyersFilter] = useState("");
  const [notariesFilter, setNotariesFilter] = useState("");
  const [lawSchoolsFilter, setLawSchoolsFilter] = useState("");

  const getText = (key: string) => {
    const translations = {
      fr: {
        news: "Actualités & Activités juridiques",
        library: "Bibliothèque",
        dictionaries: "Dictionnaires",
        directories: "Annuaires"
      },
      ar: {
        news: "الأخبار والأنشطة القانونية",
        library: "المكتبة",
        dictionaries: "القواميس",
        directories: "الأدلة"
      },
      en: {
        news: "News & Legal Activities",
        library: "Library",
        dictionaries: "Dictionaries",
        directories: "Directories"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  const renderNews = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
          <Newspaper className="w-6 h-6 text-blue-600" />
          Actualités Juridiques Algériennes
        </h2>
        <p className="text-gray-600 text-base">
          Suivez l'actualité juridique et les évolutions législatives en Algérie
        </p>
      </div>

      {/* Actualités récentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Nouvelle loi sur l'investissement approuvée",
            date: "15 janvier 2025",
            category: "Économique",
            summary: "Le Parlement algérien a adopté la nouvelle loi sur l'investissement qui simplifie les procédures pour les investisseurs nationaux et étrangers.",
            source: "Journal Officiel de la République Algérienne",
            urgent: true
          },
          {
            title: "Réforme du Code de procédure civile",
            date: "12 janvier 2025",
            category: "Civil",
            summary: "Importantes modifications du Code de procédure civile visant à accélérer les procédures judiciaires.",
            source: "Ministère de la Justice",
            urgent: false
          },
          {
            title: "Nouveau décret sur la digitalisation",
            date: "10 janvier 2025",
            category: "Administratif",
            summary: "Décret exécutif relatif à la digitalisation des services publics et à l'administration électronique.",
            source: "Secrétariat Général du Gouvernement",
            urgent: false
          },
          {
            title: "Loi de finances 2025 promulguée",
            date: "8 janvier 2025",
            category: "Fiscal",
            summary: "La loi de finances pour 2025 introduit de nouvelles mesures fiscales et budgétaires importantes.",
            source: "Ministère des Finances",
            urgent: true
          }
        ].map((news, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {news.urgent && <Badge className="bg-red-100 text-red-800">Urgent</Badge>}
                    <Badge variant="outline">{news.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{news.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    {news.date}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{news.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{news.source}</span>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Lire plus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sources juridiques algériennes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Sources Juridiques Officielles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Journal Officiel de la République Algérienne",
                description: "Publication officielle des lois et règlements",
                url: "www.joradp.dz",
                type: "Publication officielle"
              },
              {
                name: "Ministère de la Justice",
                description: "Actualités et réformes du système judiciaire",
                url: "www.mjustice.dz",
                type: "Institution"
              },
              {
                name: "Conseil d'État",
                description: "Jurisprudence administrative et avis consultatifs",
                url: "www.conseil-etat.dz",
                type: "Juridiction"
              },
              {
                name: "Cour Suprême",
                description: "Jurisprudence et arrêts de la plus haute juridiction",
                url: "www.cour-supreme.dz",
                type: "Juridiction"
              }
            ].map((source, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-gray-900">{source.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">{source.type}</Badge>
                  <span className="text-xs text-blue-600">{source.url}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-green-600" />
          Bibliothèque Juridique Algérienne
        </h2>
        <p className="text-gray-600 text-base">
          Collection complète de ressources juridiques algériennes
        </p>
      </div>

      <Tabs defaultValue="codes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="codes">Codes</TabsTrigger>
          <TabsTrigger value="laws">Lois</TabsTrigger>
          <TabsTrigger value="decrees">Décrets</TabsTrigger>
          <TabsTrigger value="jurisprudence">Jurisprudence</TabsTrigger>
        </TabsList>

        <TabsContent value="codes" className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              Textes juridiques consolidés
            </h3>
            <p className="text-gray-600 text-sm">
              Codes consolidés avec dernières modifications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Code Civil Algérien",
                description: "Code civil de la République Algérienne Démocratique et Populaire",
                articles: "1253 articles",
                lastUpdate: "2024",
                category: "Civil"
              },
              {
                title: "Code Pénal",
                description: "Code pénal algérien et ses modifications récentes",
                articles: "458 articles",
                lastUpdate: "2023",
                category: "Pénal"
              },
              {
                title: "Code de Procédure Civile",
                description: "Procédures civiles et administratives",
                articles: "1056 articles",
                lastUpdate: "2024",
                category: "Procédure"
              },
              {
                title: "Code du Commerce",
                description: "Réglementation des activités commerciales",
                articles: "742 articles",
                lastUpdate: "2023",
                category: "Commercial"
              },
              {
                title: "Code du Travail",
                description: "Droit du travail et relations professionnelles",
                articles: "356 articles",
                lastUpdate: "2024",
                category: "Social"
              },
              {
                title: "Code de la Famille",
                description: "Statut personnel et relations familiales",
                articles: "222 articles",
                lastUpdate: "2023",
                category: "Famille"
              }
            ].map((code, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{code.title}</CardTitle>
                  <Badge className="w-fit">{code.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{code.description}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>{code.articles}</span>
                    <span>MAJ {code.lastUpdate}</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="laws" className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Procédures administratives consolidées
            </h3>
            <p className="text-gray-600 text-sm">
              Procédures unifiées et simplifiées
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Loi n° 22-01 du 12 janvier 2022 relative à l'investissement",
                date: "2022",
                summary: "Nouvelle loi sur l'investissement en Algérie avec incitations fiscales",
                type: "Investissement"
              },
              {
                title: "Loi n° 18-05 du 10 mai 2018 relative à la santé",
                date: "2018",
                summary: "Organisation du système de santé publique en Algérie",
                type: "Santé"
              },
              {
                title: "Loi n° 08-09 du 25 février 2008 portant code de procédure civile et administrative",
                date: "2008",
                summary: "Code de procédure civile et administrative",
                type: "Procédure"
              }
            ].map((law, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{law.title}</h4>
                      <p className="text-gray-600 mb-2">{law.summary}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline">{law.type}</Badge>
                        <Badge variant="outline">{law.date}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Consulter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="decrees" className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Générateur de Formulaires Avancé
            </h3>
            <p className="text-gray-600 text-sm">
              Création automatisée de documents juridiques
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Décret exécutif n° 24-15 relatif à la digitalisation",
                date: "2024",
                summary: "Digitalisation des services publics et administration électronique",
                ministry: "Premier Ministère"
              },
              {
                title: "Décret exécutif n° 23-187 portant statut particulier des magistrats",
                date: "2023",
                summary: "Statut particulier applicable aux magistrats",
                ministry: "Ministère de la Justice"
              }
            ].map((decree, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{decree.title}</h4>
                      <p className="text-gray-600 mb-2">{decree.summary}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline">{decree.ministry}</Badge>
                        <Badge variant="outline">{decree.date}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Consulter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jurisprudence" className="space-y-4">
          <div className="space-y-4">
            {[
              {
                title: "Arrêt n° 2024/001 - Cour Suprême",
                date: "2024",
                domain: "Droit commercial",
                summary: "Interprétation des contrats commerciaux internationaux",
                court: "Cour Suprême"
              },
              {
                title: "Décision n° 2023/456 - Conseil d'État",
                date: "2023",
                domain: "Droit administratif",
                summary: "Recours contre les décisions administratives",
                court: "Conseil d'État"
              }
            ].map((case_, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{case_.title}</h4>
                      <p className="text-gray-600 mb-2">{case_.summary}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline">{case_.court}</Badge>
                        <Badge variant="outline">{case_.domain}</Badge>
                        <Badge variant="outline">{case_.date}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Consulter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderDictionaries = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
          <Book className="w-6 h-6 text-purple-600" />
          Dictionnaires Juridiques
        </h2>
        <p className="text-gray-600 text-base">
          Terminologie juridique française-arabe et ressources linguistiques
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-purple-600" />
              Dictionnaire Français-Arabe
            </CardTitle>
            <CardDescription>
              Terminologie juridique bilingue français-arabe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Rechercher un terme juridique..." className="pl-10" />
              </div>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Contrat (عقد)</div>
                  <div className="text-sm text-gray-600">Convention par laquelle une ou plusieurs personnes s'obligent...</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Tribunal (محكمة)</div>
                  <div className="text-sm text-gray-600">Juridiction chargée de rendre la justice...</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Jurisprudence (اجتهاد قضائي)</div>
                  <div className="text-sm text-gray-600">Ensemble des décisions rendues par les tribunaux...</div>
                </div>
              </div>
              
              <Button className="w-full">
                Consulter le dictionnaire complet
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-green-600" />
              Terminologie Spécialisée
            </CardTitle>
            <CardDescription>
              Termes juridiques par domaine de droit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { domain: "Droit Civil", terms: 1250, color: "bg-blue-100 text-blue-800" },
                { domain: "Droit Pénal", terms: 890, color: "bg-red-100 text-red-800" },
                { domain: "Droit Commercial", terms: 756, color: "bg-green-100 text-green-800" },
                { domain: "Droit Administratif", terms: 634, color: "bg-purple-100 text-purple-800" },
                { domain: "Droit du Travail", terms: 567, color: "bg-orange-100 text-orange-800" }
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{category.domain}</div>
                    <div className="text-sm text-gray-500">{category.terms} termes</div>
                  </div>
                  <Badge className={category.color}>
                    Consulter
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Glossaire des termes courants */}
      <Card>
        <CardHeader>
          <CardTitle>Glossaire des Termes Juridiques Courants</CardTitle>
          <CardDescription>
            Définitions des termes les plus utilisés dans le droit algérien
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                term: "Appel (استئناف)",
                definition: "Voie de recours ordinaire contre les jugements rendus en première instance"
              },
              {
                term: "Cassation (نقض)",
                definition: "Recours devant la Cour Suprême contre les arrêts des cours d'appel"
              },
              {
                term: "Mise en demeure (إعذار)",
                definition: "Sommation faite à un débiteur de s'exécuter"
              },
              {
                term: "Prescription (تقادم)",
                definition: "Extinction d'un droit par l'écoulement du temps"
              },
              {
                term: "Nullité (بطلان)",
                definition: "Sanction frappant un acte juridique vicié"
              },
              {
                term: "Exécution forcée (تنفيذ جبري)",
                definition: "Mise en œuvre contrainte d'une décision de justice"
              }
            ].map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{item.term}</h4>
                <p className="text-gray-600 text-sm">{item.definition}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDirectories = () => {
    const institutions = [
      {
        name: "Ministère de la Justice",
        address: "8, Place Bir Hakem, El-Biar, Alger",
        phone: "+213 (0)21 92 15 77",
        email: "contact@mjustice.dz",
        website: "www.mjustice.dz",
        type: "Ministère"
      },
      {
        name: "Conseil d'État",
        address: "Route de l'Université, Ben Aknoun, Alger",
        phone: "+213 (0)21 91 25 34",
        email: "info@conseil-etat.dz",
        website: "www.conseil-etat.dz",
        type: "Juridiction Administrative"
      },
      {
        name: "Cour Suprême",
        address: "11, Chemin Ibn Badis, Kouba, Alger",
        phone: "+213 (0)21 28 46 52",
        email: "coursuprême@mjustice.dz",
        website: "www.cour-supreme.dz",
        type: "Juridiction Suprême"
      },
      {
        name: "École Supérieure de la Magistrature",
        address: "Route de Ouled Fayet, Alger",
        phone: "+213 (0)21 37 82 15",
        email: "esm@mjustice.dz",
        website: "www.esm.dz",
        type: "Formation"
      },
      {
        name: "Ordre National des Avocats",
        address: "15, Rue Larbi Ben M'hidi, Alger",
        phone: "+213 (0)21 63 28 41",
        email: "contact@ona.dz",
        website: "www.ona.dz",
        type: "Ordre Professionnel"
      },
      {
        name: "Chambre Nationale des Notaires",
        address: "22, Boulevard Victor Hugo, Alger",
        phone: "+213 (0)21 64 35 92",
        email: "info@notaires.dz",
        website: "www.notaires.dz",
        type: "Ordre Professionnel"
      }
    ].filter(institution => 
      institution.name.toLowerCase().includes(institutionsFilter.toLowerCase()) ||
      institution.type.toLowerCase().includes(institutionsFilter.toLowerCase())
    );

    const lawSchools = [
      {
        name: "Faculté de Droit - Université d'Alger 1",
        address: "2, Rue Didouche Mourad, Alger",
        phone: "+213 (0)21 63 51 24",
        email: "droit@univ-alger.dz",
        website: "www.univ-alger.dz",
        specialties: ["Droit Public", "Droit Privé", "Droit International"]
      },
      {
        name: "Faculté de Droit - Université d'Oran",
        address: "BP 1524, Es-Senia, Oran",
        phone: "+213 (0)41 51 82 36",
        email: "fdroit@univ-oran.dz",
        website: "www.univ-oran.dz",
        specialties: ["Droit des Affaires", "Droit Social", "Droit Pénal"]
      },
      {
        name: "Faculté de Droit - Université de Constantine",
        address: "Route d'Ain El Bey, Constantine",
        phone: "+213 (0)31 81 41 89",
        email: "droit@umc.edu.dz",
        website: "www.umc.edu.dz",
        specialties: ["Droit Constitutionnel", "Droit Administratif", "Droit Civil"]
      },
      {
        name: "Faculté de Droit - Université de Tizi Ouzou",
        address: "15000 Tizi Ouzou",
        phone: "+213 (0)26 21 55 78",
        email: "fdroit@ummto.dz",
        website: "www.ummto.dz",
        specialties: ["Droits de l'Homme", "Droit de l'Environnement", "Droit Rural"]
      },
      {
        name: "Faculté de Droit - Université de Sétif",
        address: "Cité Universitaire, Sétif",
        phone: "+213 (0)36 92 44 31",
        email: "droit@univ-setif.dz",
        website: "www.univ-setif.dz",
        specialties: ["Droit Économique", "Droit Fiscal", "Droit Commercial"]
      }
    ].filter(school => 
      school.name.toLowerCase().includes(lawSchoolsFilter.toLowerCase()) ||
      school.specialties.some(s => s.toLowerCase().includes(lawSchoolsFilter.toLowerCase()))
    );

    const courts = [
      {
        name: "Tribunal de Première Instance d'Alger",
        address: "2, Rue Larbi Ben M'hidi, Alger Centre",
        phone: "+213 (0)21 63 25 18",
        jurisdiction: "Alger Centre",
        type: "Civil et Pénal"
      },
      {
        name: "Cour d'Alger",
        address: "8, Boulevard Colonel Amirouche, Alger",
        phone: "+213 (0)21 64 37 29",
        jurisdiction: "Wilaya d'Alger",
        type: "Appel"
      },
      {
        name: "Tribunal Administratif d'Alger",
        address: "Cité Administrative, Bab Ezzouar, Alger",
        phone: "+213 (0)21 43 18 76",
        jurisdiction: "Alger et environs",
        type: "Administratif"
      },
      {
        name: "Tribunal de Commerce d'Alger",
        address: "Place du 1er Mai, Alger",
        phone: "+213 (0)21 65 42 87",
        jurisdiction: "Alger",
        type: "Commercial"
      },
      {
        name: "Cour d'Oran",
        address: "Boulevard de la Révolution, Oran",
        phone: "+213 (0)41 33 62 45",
        jurisdiction: "Wilaya d'Oran",
        type: "Appel"
      },
      {
        name: "Tribunal de Constantine",
        address: "Rue Ben Badis, Constantine",
        phone: "+213 (0)31 92 73 18",
        jurisdiction: "Constantine",
        type: "Civil et Pénal"
      }
    ].filter(court => 
      court.name.toLowerCase().includes(courtsFilter.toLowerCase()) ||
      court.type.toLowerCase().includes(courtsFilter.toLowerCase()) ||
      court.jurisdiction.toLowerCase().includes(courtsFilter.toLowerCase())
    );

    const lawyers = [
      { specialty: "Droit Civil", count: 1250, wilaya: "Alger" },
      { specialty: "Droit Pénal", count: 890, wilaya: "Oran" },
      { specialty: "Droit Commercial", count: 756, wilaya: "Constantine" },
      { specialty: "Droit du Travail", count: 634, wilaya: "Annaba" },
      { specialty: "Droit Administratif", count: 567, wilaya: "Sétif" },
      { specialty: "Droit de la Famille", count: 489, wilaya: "Tlemcen" },
      { specialty: "Droit Fiscal", count: 423, wilaya: "Blida" },
      { specialty: "Droit Immobilier", count: 387, wilaya: "Batna" }
    ].filter(lawyer => 
      lawyer.specialty.toLowerCase().includes(lawyersFilter.toLowerCase()) ||
      lawyer.wilaya.toLowerCase().includes(lawyersFilter.toLowerCase())
    );

    const notaries = [
      {
        name: "Étude Notariale Benaissa",
        address: "12, Rue Didouche Mourad, Alger",
        phone: "+213 (0)21 63 45 72",
        specialties: ["Immobilier", "Successions", "Sociétés"]
      },
      {
        name: "Étude Notariale Brahimi",
        address: "45, Boulevard Zighout Youcef, Oran",
        phone: "+213 (0)41 32 18 96",
        specialties: ["Contrats", "Authentifications", "Ventes"]
      },
      {
        name: "Étude Notariale Khelifi",
        address: "78, Rue Larbi Ben M'hidi, Constantine",
        phone: "+213 (0)31 94 27 53",
        specialties: ["Donations", "Partages", "Hypothèques"]
      },
      {
        name: "Étude Notariale Meziane",
        address: "33, Avenue de l'Indépendance, Annaba",
        phone: "+213 (0)38 82 64 19",
        specialties: ["Mariages", "Divorces", "Tutelles"]
      },
      {
        name: "Étude Notariale Belarbi",
        address: "19, Rue Abane Ramdane, Sétif",
        phone: "+213 (0)36 84 75 28",
        specialties: ["Commerce", "Fonds de commerce", "Baux"]
      }
    ].filter(notary => 
      notary.name.toLowerCase().includes(notariesFilter.toLowerCase()) ||
      notary.specialties.some(s => s.toLowerCase().includes(notariesFilter.toLowerCase()))
    );

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-orange-600" />
            Annuaires Juridiques Algériens
          </h2>
          <p className="text-gray-600 text-base">
            Répertoire des institutions, professionnels et services juridiques
          </p>
        </div>

        <Tabs defaultValue="institutions" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="institutions">Institutions</TabsTrigger>
            <TabsTrigger value="law-schools">Facultés de Droit</TabsTrigger>
            <TabsTrigger value="courts">Tribunaux</TabsTrigger>
            <TabsTrigger value="lawyers">Avocats</TabsTrigger>
            <TabsTrigger value="notaries">Notaires</TabsTrigger>
          </TabsList>

          <TabsContent value="institutions" className="space-y-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une institution..."
                className="pl-10"
                value={institutionsFilter}
                onChange={(e) => setInstitutionsFilter(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {institutions.map((institution, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-orange-600" />
                      {institution.name}
                    </CardTitle>
                    <Badge variant="outline">{institution.type}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                        <span>{institution.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{institution.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{institution.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-blue-600">{institution.website}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="law-schools" className="space-y-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une faculté de droit..."
                className="pl-10"
                value={lawSchoolsFilter}
                onChange={(e) => setLawSchoolsFilter(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lawSchools.map((school, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      {school.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                        <span>{school.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{school.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{school.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-blue-600">{school.website}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {school.specialties.map((specialty, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courts" className="space-y-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un tribunal..."
                className="pl-10"
                value={courtsFilter}
                onChange={(e) => setCourtsFilter(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {courts.map((court, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{court.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {court.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {court.phone}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{court.type}</Badge>
                            <Badge variant="outline">{court.jurisdiction}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lawyers" className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Recherchez des avocats par spécialité et région
              </p>
              <div className="relative mt-4 max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Spécialité ou wilaya..."
                  className="pl-10"
                  value={lawyersFilter}
                  onChange={(e) => setLawyersFilter(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lawyers.map((category, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{category.specialty}</h4>
                        <p className="text-sm text-gray-500">{category.count} avocats - {category.wilaya}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Consulter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notaries" className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Trouvez un notaire près de chez vous
              </p>
              <div className="relative mt-4 max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Nom ou spécialité..."
                  className="pl-10"
                  value={notariesFilter}
                  onChange={(e) => setNotariesFilter(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {notaries.map((notary, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{notary.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {notary.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {notary.phone}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {notary.specialties.map((specialty, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Contacter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const getSectionContent = () => {
    switch (section) {
      case "news":
        return renderNews();
      case "library":
        return renderLibrary();
      case "dictionaries":
        return renderDictionaries();
      case "directories":
        return renderDirectories();
      default:
        return <div>Section non trouvée</div>;
    }
  };

  return getSectionContent();
}
