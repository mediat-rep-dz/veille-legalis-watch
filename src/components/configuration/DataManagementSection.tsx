import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Database, Workflow, FileSignature, Download, Upload,
  Tag, FileText, CheckCircle, Clock, User, Settings,
  Zap, Shield, Eye, Plus, Edit, Trash2
} from "lucide-react";

interface DataManagementSectionProps {
  language?: string;
}

export function DataManagementSection({ language = "fr" }: DataManagementSectionProps) {
  const [activeTab, setActiveTab] = useState("workflow");

  const getText = (key: string) => {
    const translations = {
      fr: {
        dataTitle: "Gestion des données",
        dataDesc: "Workflow, signatures et gestion des templates",
        workflow: "Workflow d'approbation",
        signature: "Signature électronique",
        exportImport: "Export/Import",
        templates: "Templates",
        tags: "Tags intelligents"
      },
      ar: {
        dataTitle: "إدارة البيانات",
        dataDesc: "سير العمل والتوقيعات وإدارة القوالب",
        workflow: "سير العمل للموافقة",
        signature: "التوقيع الإلكتروني",
        exportImport: "التصدير/الاستيراد",
        templates: "القوالب",
        tags: "العلامات الذكية"
      },
      en: {
        dataTitle: "Data Management",
        dataDesc: "Workflow, signatures and template management",
        workflow: "Approval workflow",
        signature: "Electronic signature",
        exportImport: "Export/Import",
        templates: "Templates",
        tags: "Smart tags"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  const workflowSteps = [
    {
      id: 1,
      nom: "Soumission initiale",
      description: "Soumission du document par l'auteur",
      responsable: "Auteur",
      duree: "Immédiat",
      status: "Actif"
    },
    {
      id: 2,
      nom: "Révision juridique",
      description: "Révision par l'équipe juridique",
      responsable: "Juriste principal",
      duree: "3-5 jours",
      status: "Actif"
    },
    {
      id: 3,
      nom: "Validation hiérarchique",
      description: "Approbation par le responsable de service",
      responsable: "Chef de service",
      duree: "2-3 jours",
      status: "Actif"
    },
    {
      id: 4,
      nom: "Publication",
      description: "Publication finale du document",
      responsable: "Administrateur système",
      duree: "1 jour",
      status: "Actif"
    }
  ];

  const procedureWorkflowSteps = [
    {
      id: 1,
      nom: "Soumission de la procédure",
      description: "Soumission de la procédure administrative par le service demandeur",
      responsable: "Service demandeur",
      duree: "Immédiat",
      status: "Actif"
    },
    {
      id: 2,
      nom: "Examen préliminaire",
      description: "Vérification de la conformité et de la complétude du dossier",
      responsable: "Chargé d'études",
      duree: "2-3 jours",
      status: "Actif"
    },
    {
      id: 3,
      nom: "Validation technique",
      description: "Validation des aspects techniques et réglementaires",
      responsable: "Expert technique",
      duree: "5-7 jours",
      status: "Actif"
    },
    {
      id: 4,
      nom: "Approbation administrative",
      description: "Approbation finale par l'autorité compétente",
      responsable: "Directeur administratif",
      duree: "3-5 jours",
      status: "Actif"
    },
    {
      id: 5,
      nom: "Mise en ligne",
      description: "Publication de la procédure sur la plateforme",
      responsable: "Administrateur système",
      duree: "1-2 jours",
      status: "Actif"
    }
  ];

  const signatures = [
    {
      id: 1,
      utilisateur: "Ahmed Benali",
      role: "Directeur Juridique",
      certificat: "Valide jusqu'au 15/12/2025",
      dernierUsage: "Il y a 2 heures",
      status: "Actif"
    },
    {
      id: 2,
      utilisateur: "Fatima Zahra",
      role: "Chef de Service",
      certificat: "Valide jusqu'au 30/06/2025",
      dernierUsage: "Il y a 1 jour",
      status: "Actif"
    },
    {
      id: 3,
      utilisateur: "Omar Khelifi",
      role: "Juriste Senior",
      certificat: "Expire le 20/03/2025",
      dernierUsage: "Il y a 3 jours",
      status: "Attention"
    }
  ];

  const templates = [
    {
      id: 1,
      nom: "Arrêté ministériel",
      description: "Modèle standard pour les arrêtés ministériels",
      categorie: "Réglementaire",
      derniereMAJ: "15/01/2025",
      utilisation: 156,
      auteur: "Service Juridique"
    },
    {
      id: 2,
      nom: "Décision administrative",
      description: "Modèle pour les décisions administratives",
      categorie: "Administratif",
      derniereMAJ: "10/01/2025",
      utilisation: 89,
      auteur: "Direction Administrative"
    },
    {
      id: 3,
      nom: "Circulaire d'application",
      description: "Modèle pour les circulaires d'application",
      categorie: "Instruction",
      derniereMAJ: "08/01/2025",
      utilisation: 234,
      auteur: "Cabinet Ministériel"
    }
  ];

  const smartTags = [
    {
      id: 1,
      nom: "Urgence",
      description: "Documents nécessitant un traitement prioritaire",
      couleur: "rouge",
      automatique: true,
      criteres: "Mots-clés: urgent, prioritaire, immédiat"
    },
    {
      id: 2,
      nom: "Fiscal",
      description: "Documents relatifs à la fiscalité",
      couleur: "bleu",
      automatique: true,
      criteres: "Catégorie: fiscal, TVA, impôts"
    },
    {
      id: 3,
      nom: "Social",
      description: "Documents de droit social",
      couleur: "vert",
      automatique: true,
      criteres: "Domaine: travail, CNAS, sécurité sociale"
    },
    {
      id: 4,
      nom: "En révision",
      description: "Documents en cours de révision",
      couleur: "orange",
      automatique: false,
      criteres: "Statut: brouillon, en cours"
    }
  ];

  return (
    <div className="space-y-6">

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="workflow" className="flex items-center gap-2">
            <Workflow className="w-4 h-4" />
            {getText("workflow")}
          </TabsTrigger>
          <TabsTrigger value="signature" className="flex items-center gap-2">
            <FileSignature className="w-4 h-4" />
            {getText("signature")}
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            {getText("exportImport")}
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {getText("templates")}
          </TabsTrigger>
          <TabsTrigger value="tags" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            {getText("tags")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-green-600" />
                  Workflow d'approbation des documents juridiques
                </CardTitle>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau workflow
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full mr-4 font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{step.nom}</h4>
                        <Badge className="bg-green-100 text-green-800">{step.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {step.responsable}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.duree}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-blue-600" />
                  Workflow d'approbation des procédures administratives
                </CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Modifier workflow
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {procedureWorkflowSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full mr-4 font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{step.nom}</h4>
                        <Badge className="bg-blue-100 text-blue-800">{step.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {step.responsable}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.duree}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signature" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-green-600" />
                  Signatures électroniques actives
                </CardTitle>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une signature
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {signatures.map((sig) => (
                  <div key={sig.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileSignature className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-gray-900">{sig.utilisateur}</h4>
                          <Badge variant="outline">{sig.role}</Badge>
                          <Badge className={sig.status === "Actif" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>
                            {sig.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{sig.certificat}</p>
                        <p className="text-xs text-gray-500">Dernier usage: {sig.dernierUsage}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Détails
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-green-600" />
                Export et Import de données
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Formats d'export disponibles</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Download className="w-6 h-6 text-red-600" />
                      <span>Export PDF</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Download className="w-6 h-6 text-blue-600" />
                      <span>Export Word</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Download className="w-6 h-6 text-green-600" />
                      <span>Export Excel</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Download className="w-6 h-6 text-purple-600" />
                      <span>Export JSON</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Import de données</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Importer depuis Excel
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Importer depuis CSV
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Importer depuis JSON
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Import en lot (ZIP)
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Configuration d'export</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-metadata">Inclure les métadonnées</Label>
                    <Switch id="include-metadata" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compress-files">Compresser les fichiers</Label>
                    <Switch id="compress-files" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="encrypt-export">Chiffrer l'export</Label>
                    <Switch id="encrypt-export" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notification">Notification par email</Label>
                    <Switch id="email-notification" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Templates de documents juridiques
                </CardTitle>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-gray-900">{template.nom}</h4>
                          <Badge variant="outline">{template.categorie}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{template.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>MAJ: {template.derniereMAJ}</span>
                          <span>Utilisé {template.utilisation} fois</span>
                          <span>Par: {template.auteur}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Aperçu
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-green-600" />
                  Tags intelligents
                </CardTitle>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau tag
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {smartTags.map((tag) => (
                  <div key={tag.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${
                        tag.couleur === 'rouge' ? 'bg-red-500' :
                        tag.couleur === 'bleu' ? 'bg-blue-500' :
                        tag.couleur === 'vert' ? 'bg-green-500' :
                        'bg-orange-500'
                      }`}></div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-gray-900">{tag.nom}</h4>
                          {tag.automatique && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <Zap className="w-3 h-3 mr-1" />
                              Auto
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{tag.description}</p>
                        <p className="text-xs text-gray-500">{tag.criteres}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
