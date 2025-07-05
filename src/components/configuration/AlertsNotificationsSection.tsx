
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Calendar, 
  Search,
  Plus,
  Edit,
  Trash2,
  Settings,
  Clock
} from "lucide-react";

interface AlertsNotificationsSectionProps {
  language?: string;
}

export function AlertsNotificationsSection({ language = "fr" }: AlertsNotificationsSectionProps) {
  const [alertsFilter, setAlertsFilter] = useState("");
  const [channelsFilter, setChannelsFilter] = useState("");
  const [historyFilter, setHistoryFilter] = useState("");

  const alertTypes = [
    { name: "Nouveau Texte Juridique", category: "Législatif", frequency: "Immédiat", active: true, recipients: 1250 },
    { name: "Modification Procédure", category: "Administratif", frequency: "Quotidien", active: true, recipients: 890 },
    { name: "Échéance Document", category: "Gestion", frequency: "Hebdomadaire", active: true, recipients: 567 },
    { name: "Mise à jour Système", category: "Technique", frequency: "Mensuel", active: false, recipients: 234 },
    { name: "Formation Disponible", category: "Formation", frequency: "Ponctuel", active: true, recipients: 456 },
    { name: "Rapport Statistique", category: "Reporting", frequency: "Mensuel", active: true, recipients: 789 }
  ].filter(alert => 
    alert.name.toLowerCase().includes(alertsFilter.toLowerCase()) ||
    alert.category.toLowerCase().includes(alertsFilter.toLowerCase())
  );

  const notificationChannels = [
    { name: "Email Interne", type: "Email", status: "Actif", users: 1500, lastTest: "2025-01-02" },
    { name: "SMS", type: "Mobile", status: "Actif", users: 890, lastTest: "2025-01-01" },
    { name: "Push Mobile", type: "Mobile", status: "Actif", users: 1200, lastTest: "2024-12-30" },
    { name: "Tableau de Bord", type: "Web", status: "Actif", users: 2340, lastTest: "2025-01-02" },
    { name: "Webhook", type: "API", status: "Inactif", users: 45, lastTest: "2024-12-15" },
    { name: "Slack", type: "Externe", status: "Actif", users: 234, lastTest: "2025-01-01" }
  ].filter(channel => 
    channel.name.toLowerCase().includes(channelsFilter.toLowerCase()) ||
    channel.type.toLowerCase().includes(channelsFilter.toLowerCase())
  );

  const notificationHistory = [
    { date: "2025-01-02 14:30", type: "Nouveau Texte", recipient: "Tous", channel: "Email", status: "Envoyé", count: 1250 },
    { date: "2025-01-02 10:15", type: "Échéance", recipient: "Gestionnaires", channel: "SMS", status: "Envoyé", count: 45 },
    { date: "2025-01-01 16:45", type: "Mise à jour", recipient: "Administrateurs", channel: "Push", status: "Envoyé", count: 12 },
    { date: "2025-01-01 09:00", type: "Formation", recipient: "Juristes", channel: "Email", status: "Envoyé", count: 234 },
    { date: "2024-12-31 23:59", type: "Rapport", recipient: "Direction", channel: "Tableau", status: "Échec", count: 5 },
    { date: "2024-12-31 18:30", type: "Procédure", recipient: "Utilisateurs", channel: "Email", status: "Envoyé", count: 890 },
    { date: "2024-12-30 14:20", type: "Alerte", recipient: "Support", channel: "Slack", status: "Envoyé", count: 8 },
    { date: "2024-12-30 11:15", type: "Validation", recipient: "Valideurs", channel: "SMS", status: "Envoyé", count: 67 }
  ].filter(history => 
    history.type.toLowerCase().includes(historyFilter.toLowerCase()) ||
    history.recipient.toLowerCase().includes(historyFilter.toLowerCase()) ||
    history.channel.toLowerCase().includes(historyFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Types d'Alertes</TabsTrigger>
          <TabsTrigger value="channels">Canaux</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une alerte..."
                className="pl-10"
                value={alertsFilter}
                onChange={(e) => setAlertsFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Alerte
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alertTypes.map((alert, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{alert.name}</h4>
                        <Badge variant="outline">{alert.category}</Badge>
                        <Switch checked={alert.active} />
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Fréquence: {alert.frequency}</span>
                        </div>
                        <p>Destinataires: {alert.recipients}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un canal..."
                className="pl-10"
                value={channelsFilter}
                onChange={(e) => setChannelsFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Configurer Canal
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notificationChannels.map((channel, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {channel.type === 'Email' && <Mail className="w-5 h-5 text-blue-600" />}
                        {channel.type === 'Mobile' && <Smartphone className="w-5 h-5 text-green-600" />}
                        {channel.type === 'Web' && <MessageSquare className="w-5 h-5 text-purple-600" />}
                        {channel.type === 'API' && <Settings className="w-5 h-5 text-orange-600" />}
                        {channel.type === 'Externe' && <MessageSquare className="w-5 h-5 text-pink-600" />}
                        <h4 className="font-semibold text-gray-900">{channel.name}</h4>
                        <Badge className={channel.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {channel.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Type:</span> {channel.type}</p>
                        <p><span className="font-medium">Utilisateurs:</span> {channel.users}</p>
                        <p><span className="font-medium">Dernier test:</span> {channel.lastTest}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bell className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher dans l'historique..."
                className="pl-10"
                value={historyFilter}
                onChange={(e) => setHistoryFilter(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Filtrer par date
              </Button>
              <Button variant="outline">
                Export
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {notificationHistory.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500">
                        {item.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.type}</Badge>
                        <span className="text-sm font-medium">{item.recipient}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.channel}</Badge>
                        <span className="text-sm text-gray-600">{item.count} destinataires</span>
                      </div>
                    </div>
                    <Badge className={item.status === 'Envoyé' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {item.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
