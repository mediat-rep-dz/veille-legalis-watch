import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormGeneratorTab } from "./FormGeneratorTab";
import { useState } from "react";
import { 
  Settings, 
  FileText, 
  BookOpen, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Filter,
  Wand2
} from "lucide-react";

interface NomenclatureSectionProps {
  language?: string;
}

export function NomenclatureSection({ language = "fr" }: NomenclatureSectionProps) {
  const [legalTypesFilter, setLegalTypesFilter] = useState("");
  const [proceduresFilter, setProceduresFilter] = useState("");
  const [domainsFilter, setDomainsFilter] = useState("");
  const [organizationsFilter, setOrganizationsFilter] = useState("");

  const legalTypes = [
    { name: "Loi", code: "LOI", description: "Texte voté par le Parlement", count: 1250, status: "Actif" },
    { name: "Décret exécutif", code: "DEC", description: "Acte réglementaire du Premier ministre", count: 890, status: "Actif" },
    { name: "Code", code: "COD", description: "Compilation de textes juridiques", count: 45, status: "Actif" },
    { name: "Ordonnance", code: "ORD", description: "Acte du Président de la République", count: 234, status: "Actif" },
    { name: "Arrêté ministériel", code: "ARM", description: "Décision d'un ministre", count: 2340, status: "Actif" },
    { name: "Circulaire", code: "CIR", description: "Instruction administrative", count: 567, status: "Actif" },
    { name: "Instruction", code: "INS", description: "Directive d'application", count: 789, status: "Actif" },
    { name: "Décision", code: "DEC", description: "Acte administratif individuel", count: 3456, status: "Actif" }
  ].filter(type => 
    type.name.toLowerCase().includes(legalTypesFilter.toLowerCase()) ||
    type.code.toLowerCase().includes(legalTypesFilter.toLowerCase()) ||
    type.description.toLowerCase().includes(legalTypesFilter.toLowerCase())
  );

  const procedureCategories = [
    { name: "État Civil", code: "ETI", description: "Actes et documents d'état civil", count: 45, status: "Actif" },
    { name: "Urbanisme", code: "URB", description: "Permis et autorisations d'urbanisme", count: 67, status: "Actif" },
    { name: "Commerce", code: "COM", description: "Registre du commerce et activités", count: 89, status: "Actif" },
    { name: "Emploi", code: "EMP", description: "Demandes d'emploi et formation", count: 123, status: "Actif" },
    { name: "Santé", code: "SAN", description: "Cartes et services de santé", count: 78, status: "Actif" },
    { name: "Éducation", code: "EDU", description: "Inscriptions et diplômes", count: 156, status: "Actif" },
    { name: "Transport", code: "TRA", description: "Permis et autorisations de transport", count: 234, status: "Actif" },
    { name: "Fiscalité", code: "FIS", description: "Déclarations et paiements fiscaux", count: 345, status: "Actif" }
  ].filter(cat => 
    cat.name.toLowerCase().includes(proceduresFilter.toLowerCase()) ||
    cat.code.toLowerCase().includes(proceduresFilter.toLowerCase()) ||
    cat.description.toLowerCase().includes(proceduresFilter.toLowerCase())
  );

  const legalDomains = [
    { name: "Droit Civil", code: "CIV", description: "Personnes, biens, obligations", count: 45, status: "Actif" },
    { name: "Droit Pénal", code: "PEN", description: "Infractions et sanctions", count: 67, status: "Actif" },
    { name: "Droit Commercial", code: "COM", description: "Activités commerciales", count: 89, status: "Actif" },
    { name: "Droit Administratif", code: "ADM", description: "Administration publique", count: 123, status: "Actif" },
    { name: "Droit du Travail", code: "TRA", description: "Relations de travail", count: 78, status: "Actif" },
    { name: "Droit Fiscal", code: "FIS", description: "Impôts et taxes", count: 156, status: "Actif" },
    { name: "Droit International", code: "INT", description: "Relations internationales", count: 34, status: "Actif" },
    { name: "Droit de la Famille", code: "FAM", description: "Mariage, divorce, filiation", count: 98, status: "Actif" }
  ].filter(domain => 
    domain.name.toLowerCase().includes(domainsFilter.toLowerCase()) ||
    domain.code.toLowerCase().includes(domainsFilter.toLowerCase()) ||
    domain.description.toLowerCase().includes(domainsFilter.toLowerCase())
  );

  const organizations = [
    { name: "Ministère de la Justice", code: "MJU", description: "Justice et administration judiciaire", count: 234, status: "Actif" },
    { name: "Ministère de l'Intérieur", code: "MIN", description: "Administration territoriale", count: 345, status: "Actif" },
    { name: "Ministère des Finances", code: "MFI", description: "Politique fiscale et budgétaire", count: 456, status: "Actif" },
    { name: "Ministère du Commerce", code: "MCO", description: "Réglementation commerciale", count: 123, status: "Actif" },
    { name: "Ministère du Travail", code: "MTR", description: "Politique de l'emploi", count: 187, status: "Actif" },
    { name: "Ministère de la Santé", code: "MSA", description: "Politique sanitaire", count: 298, status: "Actif" },
    { name: "Ministère de l'Éducation", code: "MED", description: "Système éducatif", count: 367, status: "Actif" },
    { name: "Premier Ministère", code: "PM", description: "Coordination gouvernementale", count: 789, status: "Actif" }
  ].filter(org => 
    org.name.toLowerCase().includes(organizationsFilter.toLowerCase()) ||
    org.code.toLowerCase().includes(organizationsFilter.toLowerCase()) ||
    org.description.toLowerCase().includes(organizationsFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <Tabs defaultValue="legal-types" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="legal-types">Types de Textes</TabsTrigger>
          <TabsTrigger value="procedures">Catégories Procédures</TabsTrigger>
          <TabsTrigger value="domains">Domaines Juridiques</TabsTrigger>
          <TabsTrigger value="organizations">Organisations</TabsTrigger>
          <TabsTrigger value="form-generator">
            <Wand2 className="w-4 h-4 mr-2" />
            Générateur de formulaires
          </TabsTrigger>
        </TabsList>

        <TabsContent value="legal-types" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un type de texte..."
                className="pl-10"
                value={legalTypesFilter}
                onChange={(e) => setLegalTypesFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Type
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {legalTypes.map((type, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{type.name}</h4>
                        <Badge variant="outline">{type.code}</Badge>
                        <Badge className="bg-green-100 text-green-800">{type.status}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{type.description}</p>
                      <p className="text-xs text-gray-500">{type.count} textes associés</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="procedures" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une catégorie..."
                className="pl-10"
                value={proceduresFilter}
                onChange={(e) => setProceduresFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une Catégorie
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {procedureCategories.map((category, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <Badge variant="outline">{category.code}</Badge>
                        <Badge className="bg-green-100 text-green-800">{category.status}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                      <p className="text-xs text-gray-500">{category.count} procédures associées</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="domains" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un domaine..."
                className="pl-10"
                value={domainsFilter}
                onChange={(e) => setDomainsFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Domaine
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {legalDomains.map((domain, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{domain.name}</h4>
                        <Badge variant="outline">{domain.code}</Badge>
                        <Badge className="bg-green-100 text-green-800">{domain.status}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{domain.description}</p>
                      <p className="text-xs text-gray-500">{domain.count} éléments associés</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une organisation..."
                className="pl-10"
                value={organizationsFilter}
                onChange={(e) => setOrganizationsFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une Organisation
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {organizations.map((org, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{org.name}</h4>
                        <Badge variant="outline">{org.code}</Badge>
                        <Badge className="bg-green-100 text-green-800">{org.status}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{org.description}</p>
                      <p className="text-xs text-gray-500">{org.count} documents associés</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="form-generator">
          <FormGeneratorTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
