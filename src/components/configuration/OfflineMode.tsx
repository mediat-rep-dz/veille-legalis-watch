
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Wifi, 
  WifiOff, 
  Download, 
  HardDrive, 
  RefreshCw, 
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  FileText,
  Folder,
  Trash2,
  RefreshCw as SyncIcon
} from 'lucide-react';

interface OfflineModeProps {
  language?: string;
}

export function OfflineMode({ language = "fr" }: OfflineModeProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineEnabled, setOfflineEnabled] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [storageUsed, setStorageUsed] = useState(245); // MB
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleEnableOffline = () => {
    setOfflineEnabled(!offlineEnabled);
    if (!offlineEnabled) {
      // Simuler le téléchargement initial
      simulateDownload();
    }
  };

  const simulateDownload = () => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleSync = () => {
    setSyncInProgress(true);
    setTimeout(() => {
      setSyncInProgress(false);
      setLastSync(new Date());
    }, 3000);
  };

  const handleClearCache = () => {
    setStorageUsed(0);
    setOfflineEnabled(false);
    console.log('Cache hors-ligne effacé');
  };

  const offlineData = [
    { type: "Textes juridiques", count: 1247, size: "156 MB", lastUpdate: "Il y a 2h" },
    { type: "Procédures", count: 589, size: "78 MB", lastUpdate: "Il y a 4h" },
    { type: "Formulaires", count: 234, size: "11 MB", lastUpdate: "Il y a 1j" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          {isOnline ? (
            <Wifi className="w-6 h-6 text-green-600" />
          ) : (
            <WifiOff className="w-6 h-6 text-red-600" />
          )}
          Mode hors-ligne
        </h2>
        <p className="text-gray-600">
          Accédez aux textes juridiques même sans connexion internet
        </p>
      </div>

      {/* Statut de connexion */}
      <Card className={`border-2 ${isOnline ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Connexion active</h3>
                    <p className="text-sm text-green-600">Tous les services sont disponibles</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-red-800">Mode hors-ligne</h3>
                    <p className="text-sm text-red-600">Accès limité aux données locales</p>
                  </div>
                </>
              )}
            </div>
            <Badge variant={isOnline ? "default" : "destructive"} className="text-sm">
              {isOnline ? "En ligne" : "Hors-ligne"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Configuration du mode hors-ligne */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-600" />
            Configuration du mode hors-ligne
          </CardTitle>
          <CardDescription>
            Activez et gérez l'accès hors-ligne aux données juridiques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="offline-mode">Activer le mode hors-ligne</Label>
              <p className="text-sm text-gray-500 mt-1">
                Télécharge les données essentielles pour un accès sans internet
              </p>
            </div>
            <Switch
              id="offline-mode"
              checked={offlineEnabled}
              onCheckedChange={handleEnableOffline}
            />
          </div>

          {offlineEnabled && downloadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Téléchargement en cours...</span>
                <span className="text-sm text-gray-500">{downloadProgress}%</span>
              </div>
              <Progress value={downloadProgress} className="w-full" />
            </div>
          )}

          {offlineEnabled && downloadProgress === 100 && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Données synchronisées et disponibles hors-ligne</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Données hors-ligne */}
      {offlineEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              Données disponibles hors-ligne
            </CardTitle>
            <CardDescription>
              Gestion des données stockées localement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {offlineData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">{data.type}</h4>
                      <p className="text-sm text-gray-500">
                        {data.count} éléments • {data.size} • {data.lastUpdate}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{data.size}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stockage et synchronisation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-orange-600" />
            Gestion du stockage
          </CardTitle>
          <CardDescription>
            Espace utilisé et options de synchronisation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Espace utilisé</span>
              <span className="text-sm text-gray-500">{storageUsed} MB / 1 GB</span>
            </div>
            <Progress value={(storageUsed / 1024) * 100} className="w-full" />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <h4 className="font-medium">Dernière synchronisation</h4>
                <p className="text-sm text-gray-500">{lastSync.toLocaleString()}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSync}
              disabled={syncInProgress || !isOnline}
            >
              {syncInProgress ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <SyncIcon className="w-4 h-4 mr-2" />
              )}
              Synchroniser
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleClearCache}
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Vider le cache
            </Button>
            <Button
              onClick={simulateDownload}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={!isOnline}
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger tout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
