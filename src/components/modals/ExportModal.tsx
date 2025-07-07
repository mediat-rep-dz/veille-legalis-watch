
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Download, FileText, Table, FileSpreadsheet } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
  filename?: string;
}

export function ExportModal({ isOpen, onClose, data, filename = 'export' }: ExportModalProps) {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    includeHeaders: true,
    includeMetadata: true,
    dateRange: 'all',
    fields: [] as string[]
  });

  const handleExport = () => {
    const exportData = {
      data: data,
      config: exportConfig,
      timestamp: new Date().toISOString(),
      filename: `${filename}_${new Date().toISOString().split('T')[0]}`
    };

    switch (exportConfig.format) {
      case 'csv':
        exportCSV(exportData);
        break;
      case 'excel':
        exportExcel(exportData);
        break;
      case 'json':
        exportJSON(exportData);
        break;
      default:
        exportPDF(exportData);
    }
    
    onClose();
  };

  const exportCSV = (exportData: any) => {
    const csv = convertToCSV(exportData.data);
    downloadFile(csv, `${exportData.filename}.csv`, 'text/csv');
  };

  const exportExcel = (exportData: any) => {
    // Simulation d'export Excel
    const csv = convertToCSV(exportData.data);
    downloadFile(csv, `${exportData.filename}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  };

  const exportJSON = (exportData: any) => {
    const json = JSON.stringify(exportData, null, 2);
    downloadFile(json, `${exportData.filename}.json`, 'application/json');
  };

  const exportPDF = (exportData: any) => {
    // Simulation d'export PDF
    const content = JSON.stringify(exportData, null, 2);
    downloadFile(content, `${exportData.filename}.pdf`, 'application/pdf');
  };

  const convertToCSV = (data: any[]) => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
    ].join('\n');
    
    return csvContent;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exporter les données
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <Label>Format d'export</Label>
            <RadioGroup 
              value={exportConfig.format} 
              onValueChange={(value) => setExportConfig({...exportConfig, format: value})}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  PDF
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center gap-2">
                  <Table className="w-4 h-4" />
                  CSV
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  JSON
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Période</Label>
            <Select 
              value={exportConfig.dateRange} 
              onValueChange={(value) => setExportConfig({...exportConfig, dateRange: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les données</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="headers"
                  checked={exportConfig.includeHeaders}
                  onCheckedChange={(checked) => setExportConfig({...exportConfig, includeHeaders: !!checked})}
                />
                <Label htmlFor="headers">Inclure les en-têtes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="metadata"
                  checked={exportConfig.includeMetadata}
                  onCheckedChange={(checked) => setExportConfig({...exportConfig, includeMetadata: !!checked})}
                />
                <Label htmlFor="metadata">Inclure les métadonnées</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Exporter ({data.length} éléments)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
