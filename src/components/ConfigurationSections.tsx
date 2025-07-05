
import { Settings } from 'lucide-react';
import { SectionHeader } from './common/SectionHeader';
import { NomenclatureSection } from "./configuration/NomenclatureSection";
import { ComplementaryResourcesSection } from "./configuration/ComplementaryResourcesSection";
import { DataManagementSection } from "./configuration/DataManagementSection";
import { AlertsNotificationsSection } from "./configuration/AlertsNotificationsSection";
import { UserManagementSection } from "./configuration/UserManagementSection";
import { SecuritySection } from "./configuration/SecuritySection";
import { MobileAppSection } from "./configuration/MobileAppSection";

interface ConfigurationSectionsProps {
  section: string;
  language?: string;
}

export function ConfigurationSections({ section, language = "fr" }: ConfigurationSectionsProps) {
  const getSectionTitle = () => {
    const titles = {
      fr: {
        'nomenclature': 'Nomenclature',
        'complementary-resources': 'Ressources Complémentaires',
        'data-management': 'Gestion des Données',
        'alerts-notifications': 'Alertes & Notifications',
        'user-management': 'Gestion des Utilisateurs',
        'security': 'Sécurité',
        'mobile-app': 'Version Mobile Native'
      },
      ar: {
        'nomenclature': 'التسمية',
        'complementary-resources': 'الموارد التكميلية',
        'data-management': 'إدارة البيانات',
        'alerts-notifications': 'التنبيهات والإشعارات',
        'user-management': 'إدارة المستخدمين',
        'security': 'الأمان',
        'mobile-app': 'النسخة المحمولة الأصلية'
      },
      en: {
        'nomenclature': 'Nomenclature',
        'complementary-resources': 'Complementary Resources',
        'data-management': 'Data Management',
        'alerts-notifications': 'Alerts & Notifications',
        'user-management': 'User Management',
        'security': 'Security',
        'mobile-app': 'Native Mobile Version'
      }
    };
    return titles[language as keyof typeof titles]?.[section as keyof typeof titles['fr']] || 'Configuration';
  };

  const getSectionDescription = () => {
    const descriptions = {
      fr: {
        'nomenclature': 'Gérez les nomenclatures et classifications utilisées dans la plateforme.',
        'complementary-resources': 'Configurez les ressources complémentaires et références externes.',
        'data-management': 'Administrez les données et paramètres de la base de données.',
        'alerts-notifications': 'Configurez les alertes et notifications du système.',
        'user-management': 'Gérez les utilisateurs, rôles et permissions.',
        'security': 'Configurez les paramètres de sécurité et authentification.',
        'mobile-app': 'Paramètres et configuration de l\'application mobile native.'
      },
      ar: {
        'nomenclature': 'أدر التسميات والتصنيفات المستخدمة في المنصة.',
        'complementary-resources': 'اضبط الموارد التكميلية والمراجع الخارجية.',
        'data-management': 'أدر البيانات وإعدادات قاعدة البيانات.',
        'alerts-notifications': 'اضبط تنبيهات وإشعارات النظام.',
        'user-management': 'أدر المستخدمين والأدوار والصلاحيات.',
        'security': 'اضبط إعدادات الأمان والمصادقة.',
        'mobile-app': 'إعدادات وتكوين التطبيق المحمول الأصلي.'
      },
      en: {
        'nomenclature': 'Manage nomenclatures and classifications used in the platform.',
        'complementary-resources': 'Configure complementary resources and external references.',
        'data-management': 'Administer data and database parameters.',
        'alerts-notifications': 'Configure system alerts and notifications.',
        'user-management': 'Manage users, roles and permissions.',
        'security': 'Configure security settings and authentication.',
        'mobile-app': 'Settings and configuration of the native mobile application.'
      }
    };
    return descriptions[language as keyof typeof descriptions]?.[section as keyof typeof descriptions['fr']];
  };

  const getSectionContent = () => {
    switch (section) {
      case "nomenclature":
        return <NomenclatureSection language={language} />;
      case "complementary-resources":
        return <ComplementaryResourcesSection language={language} />;
      case "data-management":
        return <DataManagementSection language={language} />;
      case "alerts-notifications":
        return <AlertsNotificationsSection language={language} />;
      case "user-management":
        return <UserManagementSection language={language} />;
      case "security":
        return <SecuritySection language={language} />;
      case "mobile-app":
        return <MobileAppSection language={language} />;
      default:
        return <div>Section non trouvée</div>;
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title={getSectionTitle()}
        description={getSectionDescription()}
        icon={Settings}
        iconColor="text-gray-600"
      />
      
      {getSectionContent()}
    </div>
  );
}
