
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageSquare, 
  Share2, 
  GitBranch,
  Clock,
  Bell,
  Video,
  FileText,
  Edit3,
  Eye,
  CheckCircle,
  AlertCircle,
  Calendar,
  Zap,
  Target,
  Activity,
  UserCheck,
  MessageCircle,
  Workflow,
  History,
  Lock,
  Unlock,
  PlayCircle,
  PauseCircle,
  Plus
} from 'lucide-react';

export function AdvancedCollaborationTools() {
  const [activeUsers, setActiveUsers] = useState([
    { id: 1, name: "Ahmed Benali", status: "editing", document: "Projet de loi fiscale", avatar: "AB", lastSeen: "maintenant" },
    { id: 2, name: "Fatima Zahra", status: "reviewing", document: "Contrat commercial", avatar: "FZ", lastSeen: "il y a 2 min" },
    { id: 3, name: "Omar Kadiri", status: "commenting", document: "Règlement intérieur", avatar: "OK", lastSeen: "il y a 5 min" },
    { id: 4, name: "Sarah Mansouri", status: "online", document: null, avatar: "SM", lastSeen: "il y a 1 min" }
  ]);

  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: "Révision de texte juridique",
      status: "active",
      currentStep: "Révision par expert",
      progress: 60,
      participants: ["Ahmed B.", "Fatima Z.", "Omar K."],
      deadline: "2025-01-20",
      documents: 3,
      comments: 12
    },
    {
      id: 2,
      name: "Validation procédure administrative",
      status: "pending",
      currentStep: "Attente approbation",
      progress: 30,
      participants: ["Sarah M.", "Karim L."],
      deadline: "2025-01-25",
      documents: 2,
      comments: 8
    },
    {
      id: 3,
      name: "Publication réglementaire",
      status: "completed",
      currentStep: "Terminé",
      progress: 100,
      participants: ["Ahmed B.", "Youssef A.", "Leila K."],
      deadline: "2025-01-15",
      documents: 5,
      comments: 25
    }
  ]);

  const [coEditingSessions, setCoEditingSessions] = useState([
    {
      id: 1,
      documentName: "Décret d'application - Droit social",
      activeEditors: 3,
      totalChanges: 47,
      lastChange: "il y a 30 sec",
      status: "active",
      conflictsCount: 2
    },
    {
      id: 2,
      documentName: "Guide procédural - Commerce",
      activeEditors: 2,
      totalChanges: 23,
      lastChange: "il y a 2 min",
      status: "syncing",
      conflictsCount: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'editing': return 'bg-green-100 text-green-800';
      case 'reviewing': return 'bg-blue-100 text-blue-800';
      case 'commenting': return 'bg-yellow-100 text-yellow-800';
      case 'online': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'editing': return <Edit3 className="w-3 h-3" />;
      case 'reviewing': return <Eye className="w-3 h-3" />;
      case 'commenting': return <MessageCircle className="w-3 h-3" />;
      case 'online': return <Activity className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* En-tête avec statistiques temps réel */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-emerald-600" />
          Collaboration Avancée
        </h2>
        <p className="text-gray-600 mb-6">
          Outils de collaboration en temps réel pour une productivité juridique optimale
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{activeUsers.length}</div>
              <div className="text-sm text-gray-600">Utilisateurs actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Workflow className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{workflows.filter(w => w.status === 'active').length}</div>
              <div className="text-sm text-gray-600">Workflows actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Edit3 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">{coEditingSessions.length}</div>
              <div className="text-sm text-gray-600">Sessions d'édition</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-gray-600">Messages aujourd'hui</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Utilisateurs actifs en temps réel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Activité en Temps Réel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-medium">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{user.name}</span>
                    <Badge className={`${getStatusColor(user.status)} text-xs flex items-center gap-1`}>
                      {getStatusIcon(user.status)}
                      {user.status}
                    </Badge>
                  </div>
                  {user.document && (
                    <p className="text-sm text-gray-600 mb-1">{user.document}</p>
                  )}
                  <p className="text-xs text-gray-500">{user.lastSeen}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Co-édition en temps réel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-purple-600" />
              Sessions de Co-édition
            </CardTitle>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle session
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coEditingSessions.map((session) => (
              <div key={session.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {session.documentName}
                    </h4>
                    <p className="text-sm text-gray-600">Dernière modification: {session.lastChange}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={session.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {session.status === 'active' ? <PlayCircle className="w-3 h-3 mr-1" /> : <PauseCircle className="w-3 h-3 mr-1" />}
                      {session.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <Users className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                    <div className="font-medium">{session.activeEditors}</div>
                    <div className="text-gray-600">Éditeurs actifs</div>
                  </div>
                  <div className="text-center">
                    <History className="w-4 h-4 mx-auto mb-1 text-green-600" />
                    <div className="font-medium">{session.totalChanges}</div>
                    <div className="text-gray-600">Modifications</div>
                  </div>
                  <div className="text-center">
                    <AlertCircle className="w-4 h-4 mx-auto mb-1 text-orange-600" />
                    <div className="font-medium">{session.conflictsCount}</div>
                    <div className="text-gray-600">Conflits</div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir le document
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <History className="w-4 h-4 mr-2" />
                    Historique
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflows collaboratifs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Workflow className="w-5 h-5 text-blue-600" />
              Workflows Collaboratifs
            </CardTitle>
            <Button variant="outline">
              <Zap className="w-4 h-4 mr-2" />
              Créer un workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold mb-1">{workflow.name}</h4>
                    <p className="text-sm text-gray-600">Étape actuelle: {workflow.currentStep}</p>
                  </div>
                  <Badge className={
                    workflow.status === 'active' ? 'bg-green-100 text-green-800' :
                    workflow.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }>
                    {workflow.status === 'active' && <PlayCircle className="w-3 h-3 mr-1" />}
                    {workflow.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                    {workflow.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {workflow.status}
                  </Badge>
                </div>

                {/* Barre de progression */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progression</span>
                    <span>{workflow.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        workflow.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${workflow.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Participants et métriques */}
                <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                  <div className="text-center">
                    <Users className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                    <div className="font-medium">{workflow.participants.length}</div>
                    <div className="text-gray-600">Participants</div>
                  </div>
                  <div className="text-center">
                    <FileText className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                    <div className="font-medium">{workflow.documents}</div>
                    <div className="text-gray-600">Documents</div>
                  </div>
                  <div className="text-center">
                    <MessageCircle className="w-4 h-4 mx-auto mb-1 text-green-600" />
                    <div className="font-medium">{workflow.comments}</div>
                    <div className="text-gray-600">Commentaires</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-4 h-4 mx-auto mb-1 text-orange-600" />
                    <div className="font-medium">{workflow.deadline}</div>
                    <div className="text-gray-600">Échéance</div>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {workflow.participants.map((participant, index) => (
                      <div 
                        key={index}
                        className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
                        title={participant}
                      >
                        {participant.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Détails
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Discussion
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Outils avancés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications intelligentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-yellow-600" />
              Notifications Intelligentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'urgent', message: 'Conflit de fusion détecté dans "Décret fiscal"', time: 'maintenant' },
                { type: 'info', message: 'Ahmed B. a terminé la révision du contrat', time: 'il y a 2 min' },
                { type: 'reminder', message: 'Échéance workflow "Validation procédure" dans 2 jours', time: 'il y a 5 min' }
              ].map((notif, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    notif.type === 'urgent' ? 'bg-red-500' :
                    notif.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm">{notif.message}</p>
                    <p className="text-xs text-gray-500">{notif.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gestion des permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-600" />
              Gestion des Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Projet de loi fiscale</span>
                  <Badge variant="outline">Restreint</Badge>
                </div>
                <div className="flex gap-2 text-sm">
                  <Badge className="bg-green-100 text-green-800">
                    <UserCheck className="w-3 h-3 mr-1" />
                    Lecture: 12
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    <Edit3 className="w-3 h-3 mr-1" />
                    Écriture: 3
                  </Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Guide procédural</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    <Unlock className="w-3 h-3 mr-1" />
                    Public
                  </Badge>
                </div>
                <div className="flex gap-2 text-sm">
                  <Badge className="bg-green-100 text-green-800">
                    <UserCheck className="w-3 h-3 mr-1" />
                    Lecture: 45
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    <Edit3 className="w-3 h-3 mr-1" />
                    Écriture: 8
                  </Badge>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Target className="w-4 h-4 mr-2" />
                Gérer les accès
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
