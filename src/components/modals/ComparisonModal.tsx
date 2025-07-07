
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Building, Download } from 'lucide-react';

interface ComparisonItem {
  id: string;
  title: string;
  type: string;
  date: string;
  institution?: string;
  status: string;
  content: string;
}

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ComparisonItem[];
}

export function ComparisonModal({ isOpen, onClose, items }: ComparisonModalProps) {
  const handleDownloadComparison = () => {
    const comparisonData = {
      title: "Comparaison de textes juridiques",
      date: new Date().toLocaleDateString('fr-FR'),
      items: items
    };
    
    const dataStr = JSON.stringify(comparisonData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'comparaison-textes.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Comparaison des textes ({items.length})
            </DialogTitle>
            <Button variant="outline" size="sm" onClick={handleDownloadComparison}>
              <Download className="w-4 h-4 mr-2" />
              Télécharger la comparaison
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-y-auto">
          {items.map((item, index) => (
            <Card key={item.id} className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                  {item.institution && (
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {item.institution}
                    </div>
                  )}
                  <Badge variant="outline">{item.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                  {item.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
