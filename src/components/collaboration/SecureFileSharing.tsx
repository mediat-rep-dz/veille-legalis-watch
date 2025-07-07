
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Lock, 
  Users, 
  FolderLock,
  User,
  Calendar,
  FileText,
  Plus,
  Search,
  Filter,
  Share2,
  Download,
  Eye,
  Key,
  Clock,
  AlertTriangle,
  CheckCircle,
  Folder,
  Upload
} from 'lucide-react';

export function SecureFileSharing() {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const sharedFolders = [
    {
      id: 1,
      name: "Dossier Confidentiels - Fusion ABC Corp",
      description: "Documents sensibles concernant la fusion avec ABC Corp",
      security: "Très Élevé",
      accessLevel: "Restreint",
      sharedWith: ["Ahmed B.", "Fatima Z.", "Omar K."],
      files: 15,
      size: "45.2 MB",
      lastAccess: "Il y a 2 heures",
      expiryDate: "30 janvier 2025",
      encryption: "AES-256",
      watermark: true,
      downloadRestriction: true
    },
    {
      id: 2,
      name: "Contrats Clients - Q1 2025",
      description: "Contrats clients pour le premier trimestre 2025",
      security: "Élevé",
      accessLevel: "Équipe",
      sharedWith: ["Sarah M.", "Karim L.", "Nadia R.", "Hassan A.", "Leila K."],
      files: 28,
      size: "78.9 MB",
      lastAccess: "Il y a 1 heure",
      expiryDate: "31 mars 2025",
      encryption: "AES-256",
      watermark: false,
      downloadRestriction: false
    },
    {
      id: 3,
      name: "Analyses Jurisprudentielles",
      description: "Analyses et commentaires jurisprudentiels partagés",
      security: "Standard",
      accessLevel: "Département",
      sharedWith: ["Mohamed A.", "Aicha B.", "Youssef K.", "Amina L.", "Hassan R.", "Salma T."],
      files: 42,
      size: "156.7 MB",
      lastAccess: "Il y a 30 minutes",
      expiryDate: "30 juin 2025",
      encryption: "AES-128",
      watermark: true,
      downloadRestriction: false
    }
  ];

  const accessLogs = [
    {
      id: 1,
      user: "Ahmed Benali",
      action: "Téléchargement",
      file: "Contrat_Fusion_ABC_v3.pdf",
      folder: "Dossier Confidentiels - Fusion ABC Corp",
      timestamp: "Il y a 15 minutes",
      ipAddress: "192.168.1.100",
      status: "Autorisé"
    },
    {
      id: 2,
      user: "Fatima Zahra",
      action: "Consultation",
      file: "Analyse_Due_Diligence.docx",
      folder: "Dossier Confidentiels - Fusion ABC Corp",
      timestamp: "Il y a 1 heure",
      ipAddress: "192.168.1.102",
      status: "Autorisé"
    },
    {
      id: 3,
      user: "Utilisateur Externe",
      action: "Tentative d'accès",
      file: "Contrat_Confidentiel.pdf",
      folder: "Dossier Confidentiels - Fusion ABC Corp",
      timestamp: "Il y a 2 heures",
      ipAddress: "203.45.67.89",
      status: "Bloqué"
    }
  ];

  const getSecurityColor = (level) => {
    switch (level) {
      case 'Très Élevé': return 'bg-red-100 text-red-800';
      case 'Élevé': return 'bg-orange-100 text-orange-800';
      case 'Standard': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessColor = (level) => {
    switch (level) {
      case 'Restreint': return 'bg-red-100 text-red-800';
      case 'Équipe': return 'bg-yellow-100 text-yellow-800';
      case 'Département': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Autorisé': return 'bg-green-100 text-green-800';
      case 'Bloqué': return 'bg-red-100 text-red-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          Partage Sécurisé de Dossiers entre Collègues
        </h3>
        <p className="text-gray-600">
          Partagez vos documents sensibles en toute sécurité avec des contrôles d'accès avancés
        </p>
      </div>

      <Tabs defaultValue="folders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="folders">Dossiers Partagés</TabsTrigger>
          <TabsTrigger value="security">Contrôles de Sécurité</TabsTrigger>
          <TabsTrigger value="logs">Journaux d'Accès</TabsTrigger>
        </TabsList>

        <TabsContent value="folders" className="space-y-6">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des dossiers..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau dossier sécurisé
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sharedFolders.map((folder) => (
              <Card key={folder.id} className="hover:shadow-md transition-shadow border-l-4 border-l-emerald-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FolderLock className="w-5 h-5 text-emerald-600" />
                        {folder.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{folder.description}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={getSecurityColor(folder.security)}>
                        <Shield className="w-3 h-3 mr-1" />
                        {folder.security}
                      </Badge>
                      <Badge className={getAccessColor(folder.accessLevel)}>
                        {folder.accessLevel}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Fichiers :</span>
                        <div className="font-medium">{folder.files}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Taille :</span>
                        <div className="font-medium">{folder.size}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Dernier accès :</span>
                        <div className="font-medium">{folder.lastAccess}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Expire le :</span>
                        <div className="font-medium">{folder.expiryDate}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">
                        Partagé avec ({folder.sharedWith.length} personnes)
                      </div>
                      <div className="flex -space-x-2">
                        {folder.sharedWith.slice(0, 5).map((person, index) => (
                          <div 
                            key={index}
                            className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
                          >
                            {person.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                        {folder.sharedWith.length > 5 && (
                          <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                            +{folder.sharedWith.length - 5}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Key className="w-3 h-3" />
                        {folder.encryption}
                      </Badge>
                      {folder.watermark && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Filigrane
                        </Badge>
                      )}
                      {folder.downloadRestriction && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Téléchargement limité
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Consulter
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Partager
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">256-AES</div>
                <div className="text-sm text-gray-600">Chiffrement</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Lock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">98.5%</div>
                <div className="text-sm text-gray-600">Sécurité</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">47</div>
                <div className="text-sm text-gray-600">Utilisateurs autorisés</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-600">Tentatives bloquées</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Sécurité Globaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Chiffrement automatique</div>
                    <div className="text-sm text-gray-600">Tous les nouveaux fichiers sont automatiquement chiffrés</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Authentification à deux facteurs</div>
                    <div className="text-sm text-gray-600">Obligatoire pour l'accès aux dossiers sensibles</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Expiration automatique</div>
                    <div className="text-sm text-gray-600">Les partages expirent automatiquement après 90 jours</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Audit trail complet</div>
                    <div className="text-sm text-gray-600">Enregistrement de tous les accès et modifications</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Input placeholder="Rechercher dans les journaux..." className="w-64" />
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">156 accès aujourd'hui</Badge>
              <Badge variant="outline">3 tentatives bloquées</Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Journaux d'Accès Récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{log.user}</div>
                        <div className="text-sm text-gray-600">{log.action} - {log.file}</div>
                        <div className="text-xs text-gray-500">{log.folder}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">{log.timestamp}</div>
                      <div className="text-xs text-gray-400">{log.ipAddress}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
