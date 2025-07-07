
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Users, 
  Plus,
  X,
  Building,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface ProcedureSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAnother: () => void;
  procedureData?: any; // Les données de la procédure ajoutée
}

export function ProcedureSummaryModal({ 
  isOpen, 
  onClose, 
  onAddAnother, 
  procedureData 
}: ProcedureSummaryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-600">
            <CheckCircle className="w-6 h-6" />
            Procédure ajoutée avec succès
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Statut d'approbation */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div>
                  <h4 className="font-semibold text-orange-800">Approbation requise - Procédure administrative</h4>
                  <p className="text-sm text-orange-700">Statut de publication : En attente d'approbation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Résumé principal */}
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-800">
                {procedureData?.title || "Nouvelle procédure administrative"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Catégorie:</span>
                  <p className="font-medium">{procedureData?.category || "Commercial"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Secteur:</span>
                  <p className="font-medium">{procedureData?.sector || "Entreprises"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Institution:</span>
                  <p className="font-medium">{procedureData?.institution || "Centre National du Registre de Commerce"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Durée estimée:</span>
                  <p className="font-medium">{procedureData?.duration || "15-30 jours"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-lg font-bold">{procedureData?.stepsCount || 6}</p>
                <p className="text-xs text-gray-600">Étapes définies</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-lg font-bold">{procedureData?.documentsCount || 5}</p>
                <p className="text-xs text-gray-600">Documents requis</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-lg font-bold">{procedureData?.formsCount || 3}</p>
                <p className="text-xs text-gray-600">Formulaires</p>
              </CardContent>
            </Card>
          </div>

          {/* Informations détaillées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informations de la procédure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {procedureData?.description && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Description:</span>
                  <p className="text-sm mt-1">{procedureData.description}</p>
                </div>
              )}
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Créée le {new Date().toLocaleDateString('fr-FR')}</span>
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Statut: En attente d'approbation
                </Badge>
              </div>

              {procedureData?.tags && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Tags:</span>
                  <div className="flex gap-2 mt-1">
                    {procedureData.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Prochaines étapes */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Prochaines étapes du processus d'approbation</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Examen préliminaire par le chargé d'études (2-3 jours)</li>
                <li>• Validation technique par l'expert technique (5-7 jours)</li>
                <li>• Approbation administrative finale (3-5 jours)</li>
                <li>• Publication sur la plateforme après approbation</li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              La procédure a été soumise pour approbation
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4 mr-2" />
                Fermer
              </Button>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={onAddAnother}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une autre procédure
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
