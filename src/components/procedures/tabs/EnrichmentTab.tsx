
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ClipboardList, Scan, Upload, PlusCircle } from 'lucide-react';
import { OCRScanner } from '@/components/common/OCRScanner';

interface EnrichmentTabProps {
  onAddProcedure: () => void;
}

export function EnrichmentTab({ onAddProcedure }: EnrichmentTabProps) {
  const [showOCRScanner, setShowOCRScanner] = useState(false);

  const handleOCRTextExtracted = (text: string) => {
    console.log('Texte de procédure extrait par OCR:', text);
    // Ici vous pouvez traiter le texte extrait
    // Par exemple, l'utiliser pour pré-remplir un formulaire de procédure
    onAddProcedure(); // Ouvrir le formulaire avec le texte pré-rempli
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onAddProcedure}>
          <CardHeader className="text-center">
            <PlusCircle className="w-12 h-12 mx-auto text-blue-600 mb-2" />
            <CardTitle className="text-lg">Saisie manuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 text-center">
              Créer une nouvelle procédure administrative étape par étape
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
              Numériser une procédure papier et extraire le contenu automatiquement
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Upload className="w-12 h-12 mx-auto text-purple-600 mb-2" />
            <CardTitle className="text-lg">Import guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 text-center">
              Importer un guide de procédure existant au format PDF ou Word
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-2">Guide d'alimentation des procédures</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Utilisez la <strong>saisie manuelle</strong> pour détailler chaque étape de la procédure</li>
          <li>• Le <strong>scanner OCR</strong> extrait le texte des documents administratifs scannés</li>
          <li>• L'<strong>import de guide</strong> traite les manuels de procédures existants</li>
          <li>• Vérifiez toujours l'exactitude des informations avant validation</li>
        </ul>
      </div>

      <OCRScanner
        isOpen={showOCRScanner}
        onClose={() => setShowOCRScanner(false)}
        onTextExtracted={handleOCRTextExtracted}
        title="Scanner OCR - Procédures Administratives"
      />
    </div>
  );
}
