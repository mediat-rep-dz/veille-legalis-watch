
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, FileText, X, Check, Loader2 } from 'lucide-react';

interface OCRScannerProps {
  onTextExtracted: (text: string) => void;
  onClose: () => void;
  isOpen: boolean;
  title?: string;
}

export function OCRScanner({ onTextExtracted, onClose, isOpen, title = "Scanner OCR" }: OCRScannerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Simulation d'extraction OCR (remplacez par une vraie API OCR comme Tesseract.js)
  const simulateOCR = async (imageData: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulation de texte extrait selon le contexte
        const sampleTexts = [
          "Article 1er : La présente loi détermine les règles générales...",
          "RÉPUBLIQUE ALGÉRIENNE DÉMOCRATIQUE ET POPULAIRE\nMinistère de l'Intérieur...",
          "Demande de certificat de résidence\nNom: BENALI\nPrénom: Ahmed...",
          "Code civil algérien - Livre premier\nDes personnes et de la famille..."
        ];
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        resolve(randomText);
      }, 2000);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setPreviewImage(imageData);
      
      setIsProcessing(true);
      try {
        const text = await simulateOCR(imageData);
        setExtractedText(text);
      } catch (error) {
        console.error('Erreur OCR:', error);
        alert('Erreur lors de l\'extraction du texte');
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Erreur caméra:', error);
      alert('Impossible d\'accéder à la caméra');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    
    setPreviewImage(imageData);
    stopCamera();
    
    setIsProcessing(true);
    try {
      const text = await simulateOCR(imageData);
      setExtractedText(text);
    } catch (error) {
      console.error('Erreur OCR:', error);
      alert('Erreur lors de l\'extraction du texte');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUseText = () => {
    onTextExtracted(extractedText);
    handleClose();
  };

  const handleClose = () => {
    stopCamera();
    setPreviewImage(null);
    setExtractedText('');
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {title}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!previewImage && !isCameraActive && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="h-32 flex-col gap-2 border border-dashed border-gray-300"
                variant="outline"
              >
                <Upload className="w-8 h-8" />
                <span>Charger une image</span>
                <Badge variant="secondary">PNG, JPG, PDF</Badge>
              </Button>
              
              <Button
                onClick={startCamera}
                className="h-32 flex-col gap-2 border border-dashed border-gray-300"
                variant="outline"
              >
                <Camera className="w-8 h-8" />
                <span>Utiliser la caméra</span>
                <Badge variant="secondary">Photo en direct</Badge>
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />

          {isCameraActive && (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded border"
              />
              <div className="flex gap-2 justify-center">
                <Button onClick={capturePhoto}>
                  <Camera className="w-4 h-4 mr-2" />
                  Capturer
                </Button>
                <Button variant="outline" onClick={stopCamera}>
                  Annuler
                </Button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          {previewImage && (
            <div className="space-y-4">
              <div className="text-center">
                <img 
                  src={previewImage} 
                  alt="Aperçu" 
                  className="max-w-full max-h-64 mx-auto rounded border"
                />
              </div>
              
              {isProcessing && (
                <div className="text-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <p>Extraction du texte en cours...</p>
                </div>
              )}
              
              {extractedText && !isProcessing && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Texte extrait :</h4>
                    <div className="bg-gray-50 p-4 rounded border text-sm font-mono max-h-48 overflow-y-auto">
                      {extractedText}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={handleClose}>
                      Annuler
                    </Button>
                    <Button onClick={handleUseText}>
                      <Check className="w-4 h-4 mr-2" />
                      Utiliser ce texte
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
