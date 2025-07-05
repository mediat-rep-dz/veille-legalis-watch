
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, CheckCircle, TrendingUp, Users } from 'lucide-react';

export function TimelineTab() {
  const timelineItems = [
    {
      date: "2024",
      title: "Digitalisation des procédures",
      description: "Lancement du programme de numérisation des procédures administratives",
      status: "En cours",
      color: "bg-blue-500"
    },
    {
      date: "2023",
      title: "Simplification administrative",
      description: "Réduction du nombre d'étapes pour 150+ procédures",
      status: "Terminé",
      color: "bg-green-500"
    },
    {
      date: "2022",
      title: "Harmonisation des formulaires",
      description: "Standardisation des formulaires officiels",
      status: "Terminé",
      color: "bg-green-500"
    },
    {
      date: "2021",
      title: "Base de données unifiée",
      description: "Création de la base de données centralisée des procédures",
      status: "Terminé",
      color: "bg-green-500"
    }
  ];

  const stats = [
    {
      icon: TrendingUp,
      value: "+45%",
      label: "Amélioration efficacité",
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200"
    },
    {
      icon: CheckCircle,
      value: "287",
      label: "Procédures modernisées",
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200"
    },
    {
      icon: Users,
      value: "1.2M",
      label: "Citoyens bénéficiaires",
      color: "text-purple-600",
      bgColor: "bg-purple-50 border-purple-200"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Timeline des procédures administratives
          </CardTitle>
          <CardDescription>
            Évolution chronologique des procédures administratives algériennes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Timeline visualization */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {timelineItems.map((item, index) => (
                <div key={index} className="relative flex items-start space-x-4 pb-8">
                  <div className={`flex-shrink-0 w-8 h-8 ${item.color} rounded-full flex items-center justify-center relative z-10`}>
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                      <Badge variant={item.status === 'Terminé' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <Card key={index} className={stat.bgColor}>
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto ${stat.color} mb-2`} />
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
