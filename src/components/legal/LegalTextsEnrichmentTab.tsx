
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Scan, Upload, PlusCircle } from 'lucide-react';
import { OCRScanner } from '@/components/common/OCRScanner';

interface LegalTextsEnrichmentTabProps {
  onAddLegalText: () => void;
}

export function LegalTextsEnrichmentTab({ onAddLegalText }: LegalTextsEnrichmentTabProps) {
  const [showOCRScanner, setShowOCRScanner] = useState(false);

  const handleOCRTextExtracted = (text: string) => {
    console.log('Texte extrait par OCR:', text);
    // Ici vous pouvez traiter le texte extrait
    // Par exemple, l'utiliser pour pré-remplir un formulaire
    onAddLegalText(); // Ouvrir le formulaire avec le texte pré-rempli
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onAddLegalText}>
          <CardHeader className="text-center">
            <PlusCircle className="w-12 h-12 mx-auto text-blue-600 mb-2" />
            <CardTitle className="text-lg">Saisie manuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 text-center">
              Créer un nouveau texte juridique en remplissant le formulaire étape par étape
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowOCRScanner(true)}>
          <CardHeader className="text-center">
            <Scan className="w-12 h-12 mx-auto text-green-600 mb-2" />
            <CardTitle className="text-lg">Scanner OCR</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 text-center">
              Numériser un document papier et extraire automatiquement le texte
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Upload className="w-12 h-12 mx-auto text-purple-600 mb-2" />
            <CardTitle className="text-lg">Import fichier</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 text-center">
              Importer un fichier PDF ou Word existant pour l'intégrer à la base
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Instructions d'alimentation</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Utilisez la <strong>saisie manuelle</strong> pour créer un texte juridique complet</li>
          <li>• Le <strong>scanner OCR</strong> permet de numériser des documents papier</li>
          <li>• L'<strong>import de fichier</strong> traite les documents électroniques existants</li>
          <li>• Tous les textes passent par un processus de validation avant publication</li>
        </ul>
      </div>

      <OCRScanner
        isOpen={showOCRScanner}
        onClose={() => setShowOCRScanner(false)}
        onTextExtracted={handleOCRTextExtracted}
        title="Scanner OCR - Textes Juridiques"
      />
    </div>
  );
}
