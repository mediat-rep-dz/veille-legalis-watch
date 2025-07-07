
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Table, Archive } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
  acceptedTypes: string[];
}

export function ImportModal({ isOpen, onClose, onImport, acceptedTypes }: ImportModalProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleImport = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulation du processus d'import
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Simulation du parsing du fichier
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Élément importé ${i + 1}`,
      type: uploadedFile.type,
      filename: uploadedFile.name,
      size: uploadedFile.size
    }));

    onImport(mockData);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadedFile(null);
    onClose();
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'csv':
        return <Table className="w-8 h-8 text-green-500" />;
      case 'xlsx':
      case 'xls':
        return <FileText className="w-8 h-8 text-blue-500" />;
      case 'json':
        return <FileText className="w-8 h-8 text-purple-500" />;
      case 'zip':
        return <Archive className="w-8 h-8 text-orange-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Importer des données
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Formats acceptés</Label>
            <div className="text-sm text-gray-600">
              {acceptedTypes.join(', ')}
            </div>
          </div>

          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={acceptedTypes.join(',')}
              onChange={handleFileSelect}
            />
            
            {uploadedFile ? (
              <div className="space-y-2">
                {getFileIcon(uploadedFile.name)}
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-gray-600">
                  Cliquez pour sélectionner un fichier
                </p>
                <p className="text-xs text-gray-500">
                  ou glissez-déposez votre fichier ici
                </p>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Import en cours...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Annuler
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!uploadedFile || isUploading}
          >
            {isUploading ? 'Import...' : 'Importer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
