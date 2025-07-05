
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, MessageSquare, Phone, Mail, Search, Plus, Filter
} from "lucide-react";

interface HelpSectionsProps {
  section: string;
  language?: string;
}

export function HelpSections({ section, language = "fr" }: HelpSectionsProps) {
  const [activeTab, setActiveTab] = useState("faq");

  const getText = (key: string) => {
    const translations = {
      fr: {
        aboutTitle: "À propos",
        aboutDesc: "Informations sur Dalil.dz",
        contactTitle: "Contact",
        contactDesc: "Nous contacter",
        supportTitle: "Support technique",
        supportDesc: "Assistance et support",
        faq: "FAQ",
        chatSupport: "Chat Support",
        helpCenter: "Centre d'aide"
      },
      ar: {
        aboutTitle: "حول",
        aboutDesc: "معلومات حول Dalil.dz",
        contactTitle: "اتصل بنا",
        contactDesc: "تواصل معنا",
        supportTitle: "الدعم الفني",
        supportDesc: "المساعدة والدعم",
        faq: "الأسئلة الشائعة",
        chatSupport: "دعم المحادثة",
        helpCenter: "مركز المساعدة"
      },
      en: {
        aboutTitle: "About",
        aboutDesc: "Information about Dalil.dz",
        contactTitle: "Contact",
        contactDesc: "Contact us",
        supportTitle: "Technical Support",
        supportDesc: "Assistance and support",
        faq: "FAQ",
        chatSupport: "Chat Support",
        helpCenter: "Help Center"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  const getSectionContent = () => {
    switch (section) {
      case "about":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="w-8 h-8 text-green-600" />
                {getText("aboutTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("aboutDesc")}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>À propos de Dalil.dz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Dalil.dz est la plateforme nationale de veille juridique et réglementaire de l'Algérie.
                    Elle offre un accès centralisé aux textes juridiques, procédures administratives et 
                    ressources juridiques du pays.
                  </p>
                  <p className="text-gray-600">
                    Notre mission est de faciliter l'accès à l'information juridique pour tous les 
                    professionnels du droit, les institutions et les citoyens.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <Mail className="w-8 h-8 text-green-600" />
                {getText("contactTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("contactDesc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-600" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">contact@dalil.dz</p>
                  <p className="text-gray-600">support@dalil.dz</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">+213 21 XX XX XX</p>
                  <p className="text-gray-600">Lun-Ven: 8h-17h</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "technical-support":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <MessageSquare className="w-8 h-8 text-green-600" />
                {getText("supportTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("supportDesc")}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  {getText("faq")}
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {getText("chatSupport")}
                </TabsTrigger>
                <TabsTrigger value="help" className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  {getText("helpCenter")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-green-600" />
                      Questions fréquemment posées
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input placeholder="Rechercher une question..." className="flex-1" />
                        <Button variant="outline">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <Card className="border-l-4 border-l-green-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment rechercher un texte juridique ?</h4>
                            <p className="text-gray-600 text-sm">
                              Utilisez la barre de recherche principale ou accédez au catalogue des textes juridiques 
                              pour une recherche avancée.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-green-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment créer un compte ?</h4>
                            <p className="text-gray-600 text-sm">
                              Cliquez sur "Créer un compte" et suivez les instructions. L'inscription est gratuite 
                              pour tous les utilisateurs.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      Support en ligne
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">Notre équipe de support est disponible pour vous aider.</p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Démarrer une conversation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="help" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-green-600" />
                      Centre d'aide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">Consultez notre documentation complète et nos guides d'utilisation.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline">Guide utilisateur</Button>
                        <Button variant="outline">Tutoriels vidéo</Button>
                        <Button variant="outline">Documentation API</Button>
                        <Button variant="outline">Guides administrateur</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      default:
        return <div>Section non trouvée</div>;
    }
  };

  return getSectionContent();
}
