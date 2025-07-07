
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, User, Search, MessageSquare, Menu, Star, Bot } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSelector } from "@/components/LanguageSelector";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { AccountDropdown } from "@/components/AccountDropdown";
import { MessagesDropdown } from "@/components/MessagesDropdown";
import { MainNavigation } from "@/components/MainNavigation";
import { useCallback, useMemo } from "react";

interface MainHeaderProps {
  language: string;
  activeSection: string;
  onLanguageChange: (language: string) => void;
  onSectionChange: (section: string) => void;
}

export function MainHeader({ language, activeSection, onLanguageChange, onSectionChange }: MainHeaderProps) {
  const getHeaderText = useCallback((key: string) => {
    const translations = {
      fr: {
        title: "dalil.dz",
        subtitle: "Plateforme de veille juridique et réglementaire",
        searchPlaceholder: "Recherche rapide..."
      },
      ar: {
        title: "dalil.dz",
        subtitle: "منصة المراقبة القانونية والتنظيمية",
        searchPlaceholder: "بحث سريع..."
      },
      en: {
        title: "dalil.dz",
        subtitle: "Legal and regulatory monitoring platform",
        searchPlaceholder: "Quick search..."
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  }, [language]);

  // Gestionnaires d'événements mémorisés
  const handleFavoritesClick = useCallback(() => {
    onSectionChange("favorites");
  }, [onSectionChange]);

  const handleAISearchClick = useCallback(() => {
    onSectionChange("ai-search");
  }, [onSectionChange]);

  // Textes mémorisés
  const headerTexts = useMemo(() => ({
    title: getHeaderText("title"),
    subtitle: getHeaderText("subtitle"),
    searchPlaceholder: getHeaderText("searchPlaceholder")
  }), [getHeaderText]);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2 sticky top-0 z-50" role="banner">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 bg-white rounded flex items-center justify-center flex-shrink-0 border border-green-600">
                <img 
                  src="/lovable-uploads/cb1cbfba-f598-40da-acf6-b43632c703c6.png" 
                  alt="Logo dalil.dz" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{headerTexts.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{headerTexts.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
              <Input
                placeholder={headerTexts.searchPlaceholder}
                className="pl-10 bg-gray-50 border-gray-200 text-sm"
                aria-label={headerTexts.searchPlaceholder}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="sm:hidden">
              <LanguageSelector onLanguageChange={onLanguageChange} />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFavoritesClick}
              className="relative hidden sm:flex p-2"
              title="Favoris"
              aria-label="Voir les favoris"
            >
              <Star className="w-4 h-4" aria-hidden="true" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAISearchClick}
              className="relative hidden sm:flex p-2"
              title="Recherche IA"
              aria-label="Recherche avec intelligence artificielle"
            >
              <Bot className="w-4 h-4" aria-hidden="true" />
            </Button>
            
            <MessagesDropdown />
            <NotificationDropdown />
            <AccountDropdown />
            
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" aria-label="Ouvrir le menu de navigation">
                  <Menu className="w-5 h-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0" aria-label="Menu de navigation mobile">
                <div className="p-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
                    <Input
                      placeholder={headerTexts.searchPlaceholder}
                      className="pl-10 bg-gray-50 border-gray-200"
                      aria-label={headerTexts.searchPlaceholder}
                    />
                  </div>
                  <MainNavigation 
                    onSectionChange={onSectionChange} 
                    activeSection={activeSection}
                    isMobile={true}
                    language={language}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
