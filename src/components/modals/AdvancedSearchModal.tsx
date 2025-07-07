
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, Building, FileText, MapPin, Bot } from 'lucide-react';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (criteria: any) => void;
}

export function AdvancedSearchModal({ isOpen, onClose, onSearch }: AdvancedSearchModalProps) {
  const [searchCriteria, setSearchCriteria] = useState({
    keywords: '',
    exactPhrase: '',
    excludeWords: '',
    dateFrom: '',
    dateTo: '',
    institution: '',
    category: '',
    type: '',
    status: '',
    location: '',
    useAI: false,
    useGeolocation: false
  });

  const handleSearch = () => {
    onSearch(searchCriteria);
    onClose();
  };

  const handleReset = () => {
    setSearchCriteria({
      keywords: '',
      exactPhrase: '',
      excludeWords: '',
      dateFrom: '',
      dateTo: '',
      institution: '',
      category: '',
      type: '',
      status: '',
      location: '',
      useAI: false,
      useGeolocation: false
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Recherche avancée
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Critères de recherche textuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Critères textuels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Mots-clés</Label>
                <Input
                  id="keywords"
                  placeholder="Entrez les mots-clés séparés par des espaces"
                  value={searchCriteria.keywords}
                  onChange={(e) => setSearchCriteria({...searchCriteria, keywords: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="exactPhrase">Phrase exacte</Label>
                <Input
                  id="exactPhrase"
                  placeholder="Phrase à rechercher exactement"
                  value={searchCriteria.exactPhrase}
                  onChange={(e) => setSearchCriteria({...searchCriteria, exactPhrase: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excludeWords">Mots à exclure</Label>
                <Input
                  id="excludeWords"
                  placeholder="Mots à exclure des résultats"
                  value={searchCriteria.excludeWords}
                  onChange={(e) => setSearchCriteria({...searchCriteria, excludeWords: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Critères temporels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Période
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFrom">Date de début</Label>
                  <Input
                    id="dateFrom"
                    type="date"
                    value={searchCriteria.dateFrom}
                    onChange={(e) => setSearchCriteria({...searchCriteria, dateFrom: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateTo">Date de fin</Label>
                  <Input
                    id="dateTo"
                    type="date"
                    value={searchCriteria.dateTo}
                    onChange={(e) => setSearchCriteria({...searchCriteria, dateTo: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critères catégoriels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Catégories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Select value={searchCriteria.institution} onValueChange={(value) => setSearchCriteria({...searchCriteria, institution: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une institution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ministere-interieur">Ministère de l'Intérieur</SelectItem>
                      <SelectItem value="ministere-commerce">Ministère du Commerce</SelectItem>
                      <SelectItem value="ministere-justice">Ministère de la Justice</SelectItem>
                      <SelectItem value="cnrc">CNRC</SelectItem>
                      <SelectItem value="apc">APC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Catégorie</Label>
                  <Select value={searchCriteria.category} onValueChange={(value) => setSearchCriteria({...searchCriteria, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citoyennete">Citoyenneté</SelectItem>
                      <SelectItem value="education">Éducation</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="logement">Logement</SelectItem>
                      <SelectItem value="urbanisme">Urbanisme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type de document</Label>
                  <Select value={searchCriteria.type} onValueChange={(value) => setSearchCriteria({...searchCriteria, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loi">Loi</SelectItem>
                      <SelectItem value="decret">Décret</SelectItem>
                      <SelectItem value="ordonnance">Ordonnance</SelectItem>
                      <SelectItem value="arrete">Arrêté</SelectItem>
                      <SelectItem value="procedure">Procédure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Statut</Label>
                  <Select value={searchCriteria.status} onValueChange={(value) => setSearchCriteria({...searchCriteria, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                      <SelectItem value="revision">En révision</SelectItem>
                      <SelectItem value="abroge">Abrogé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Options avancées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Options avancées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="useAI"
                  checked={searchCriteria.useAI}
                  onCheckedChange={(checked) => setSearchCriteria({...searchCriteria, useAI: !!checked})}
                />
                <Label htmlFor="useAI" className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Utiliser la recherche intelligente (IA)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="useGeolocation"
                  checked={searchCriteria.useGeolocation}
                  onCheckedChange={(checked) => setSearchCriteria({...searchCriteria, useGeolocation: !!checked})}
                />
                <Label htmlFor="useGeolocation" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Recherche par géolocalisation
                </Label>
              </div>
              
              {searchCriteria.useGeolocation && (
                <div className="space-y-2">
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    placeholder="Ville, wilaya ou région"
                    value={searchCriteria.location}
                    onChange={(e) => setSearchCriteria({...searchCriteria, location: e.target.value})}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Réinitialiser
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSearch} className="bg-emerald-600 hover:bg-emerald-700">
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
