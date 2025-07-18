
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, Download, Share2, Filter, MessageSquare, Heart,
  FileText, GitCompareArrows, CheckCircle, XCircle, Search,
  Upload, FileDown, MapPin, Bot, Trash2, Edit,
  Copy, Send, Star, Flag, Archive, Settings,
  Plus, Users, Building, Calendar, Database,
  BarChart3, TrendingUp, Zap, FileSpreadsheet,
  FileJson, FileImage, Globe, Languages, Play,
  ClipboardCheck, ChevronDown, MoreHorizontal,
  UserPlus, Tag, Workflow, Shield, AlertCircle,
  BookOpen, Lightbulb, X, LogOut, Save,
  FolderOpen, Target, MapPin as Location
} from 'lucide-react';

type ActionType = 
  | 'lire' | 'pdf' | 'partager' | 'filtres' | 'voir' | 'télécharger'
  | 'consulter' | 'comparer' | 'rapport' | 'signaler' | 'avis'
  | 'témoignage' | 'import' | 'extraction' | 'examiner' | 'rejeter'
  | 'approuver' | 'recherche-ia' | 'géolocalisation' | 'recherche-avancée'
  | 'exporter' | 'générer-ia' | 'analyser' | 'utiliser' | 'traduire'
  | 'vérifier' | 'commencer' | 'publier' | 'inviter' | 'nouveau'
  | 'aimer' | 'like' | 'favoris' | 'détails' | 'documents' | 'discussion'
  | 'fermer' | 'lire-plus' | 'comparer-textes' | 'analyse-comparative'
  | 'analyse-performance' | 'analyse-tendances' | 'auto-remplissage'
  | 'configurer-base' | 'configurer-canal' | 'créer-workflow'
  | 'consulter-dictionnaire' | 'export-excel' | 'export-json' | 'export-word'
  | 'export-pdf' | 'exporter-analyse' | 'fermer-sessions' | 'filtrer-date'
  | 'formulaires' | 'générer-formulaire' | 'générer-rapport' | 'guides'
  | 'import-lot' | 'import-zip' | 'import-csv' | 'import-excel' | 'import-json'
  | 'nouveau-modèle' | 'nouveau-projet' | 'nouveau-rôle' | 'nouveau-sujet'
  | 'nouveau-tag' | 'nouveau-template' | 'nouveau-workflow' | 'nouvel-utilisateur'
  | 'nouvelle-alerte' | 'nouvelle-permission' | 'nouvelle-politique'
  | 'partager-ressource' | 'rapport-complet' | 'télécharger-pdf'
  | 'voir-procédures' | 'voir-textes' | 'ajouter-domaine' | 'ajouter-type'
  | 'ajouter-catégorie' | 'ajouter-organisation' | 'ajouter-source';

interface ActionButtonProps {
  action: ActionType;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
  data?: any;
  itemId?: string;
  itemTitle?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const actionConfig = {
  // Actions existantes
  'lire': { icon: Eye, label: 'Lire', variant: 'default' as const },
  'pdf': { icon: FileText, label: 'PDF', variant: 'outline' as const },
  'partager': { icon: Share2, label: 'Partager', variant: 'outline' as const },
  'filtres': { icon: Filter, label: 'Filtres', variant: 'outline' as const },
  'voir': { icon: Eye, label: 'Voir', variant: 'default' as const },
  'télécharger': { icon: Download, label: 'Télécharger', variant: 'outline' as const },
  'consulter': { icon: Eye, label: 'Consulter', variant: 'default' as const },
  'comparer': { icon: GitCompareArrows, label: 'Comparer', variant: 'outline' as const },
  'rapport': { icon: FileText, label: 'Rapport complet', variant: 'default' as const },
  'signaler': { icon: Flag, label: 'Signaler une erreur', variant: 'outline' as const },
  'avis': { icon: MessageSquare, label: 'Donner un avis', variant: 'outline' as const },
  'témoignage': { icon: Star, label: 'Laisser un témoignage', variant: 'outline' as const },
  'import': { icon: Upload, label: 'Import en lot', variant: 'outline' as const },
  'extraction': { icon: FileDown, label: 'Extraction automatique', variant: 'default' as const },
  'examiner': { icon: Search, label: 'Examiner', variant: 'default' as const },
  'rejeter': { icon: XCircle, label: 'Rejeter', variant: 'destructive' as const },
  'approuver': { icon: CheckCircle, label: 'Approuver', variant: 'default' as const },
  'recherche-ia': { icon: Bot, label: 'Recherche Intelligente', variant: 'default' as const },
  'géolocalisation': { icon: MapPin, label: 'Recherche par Géolocalisation', variant: 'outline' as const },
  'recherche-avancée': { icon: Search, label: 'Recherche avancée', variant: 'outline' as const },
  'exporter': { icon: Download, label: 'Exporter', variant: 'outline' as const },
  'générer-ia': { icon: Bot, label: 'Générer avec l\'IA', variant: 'default' as const },
  'analyser': { icon: Search, label: 'Analyser', variant: 'default' as const },
  'utiliser': { icon: Copy, label: 'Utiliser ce modèle', variant: 'default' as const },
  'traduire': { icon: Languages, label: 'Traduire', variant: 'outline' as const },
  'vérifier': { icon: CheckCircle, label: 'Vérifier', variant: 'outline' as const },
  'commencer': { icon: Play, label: 'Commencer', variant: 'default' as const },
  'publier': { icon: Send, label: 'Publier', variant: 'default' as const },
  'inviter': { icon: UserPlus, label: 'Inviter des membres', variant: 'outline' as const },
  'nouveau': { icon: Plus, label: 'Nouveau', variant: 'default' as const },
  'aimer': { icon: Heart, label: 'Aimer', variant: 'outline' as const },
  'like': { icon: Heart, label: 'Like', variant: 'outline' as const },
  'favoris': { icon: Star, label: 'Favoris', variant: 'outline' as const },

  // Nouvelles actions
  'détails': { icon: Eye, label: 'Détails', variant: 'outline' as const },
  'documents': { icon: FileText, label: 'Documents', variant: 'outline' as const },
  'discussion': { icon: MessageSquare, label: 'Discussion', variant: 'outline' as const },
  'fermer': { icon: X, label: 'Fermer', variant: 'outline' as const },
  'lire-plus': { icon: ChevronDown, label: 'Lire plus', variant: 'ghost' as const },
  'comparer-textes': { icon: GitCompareArrows, label: 'Comparer les textes', variant: 'outline' as const },
  'analyse-comparative': { icon: BarChart3, label: 'Analyse comparative', variant: 'default' as const },
  'analyse-performance': { icon: TrendingUp, label: 'Analyse de performance', variant: 'default' as const },
  'analyse-tendances': { icon: TrendingUp, label: 'Analyse des tendances', variant: 'default' as const },
  'auto-remplissage': { icon: Zap, label: 'Auto-remplissage intelligent', variant: 'default' as const },
  'configurer-base': { icon: Database, label: 'Configurer Base', variant: 'outline' as const },
  'configurer-canal': { icon: Settings, label: 'Configurer Canal', variant: 'outline' as const },
  'créer-workflow': { icon: Workflow, label: 'Créer Workflow', variant: 'default' as const },
  'consulter-dictionnaire': { icon: BookOpen, label: 'Consulter le dictionnaire complet', variant: 'outline' as const },
  'export-excel': { icon: FileSpreadsheet, label: 'Export Excel', variant: 'outline' as const },
  'export-json': { icon: FileJson, label: 'Export JSON', variant: 'outline' as const },
  'export-word': { icon: FileText, label: 'Export Word', variant: 'outline' as const },
  'export-pdf': { icon: FileText, label: 'Export PDF', variant: 'outline' as const },
  'exporter-analyse': { icon: Download, label: 'Exporter analyse', variant: 'outline' as const },
  'fermer-sessions': { icon: LogOut, label: 'Fermer toutes les sessions', variant: 'destructive' as const },
  'filtrer-date': { icon: Calendar, label: 'Filtrer par date', variant: 'outline' as const },
  'formulaires': { icon: FileText, label: 'Formulaires Téléchargeables', variant: 'outline' as const },
  'générer-formulaire': { icon: Bot, label: 'Générer le Formulaire de Base', variant: 'default' as const },
  'générer-rapport': { icon: Bot, label: 'Générer rapport', variant: 'default' as const },
  'guides': { icon: BookOpen, label: 'Guides pratiques', variant: 'outline' as const },
  'import-lot': { icon: Upload, label: 'Import en lot', variant: 'outline' as const },
  'import-zip': { icon: Archive, label: 'Import en lot (ZIP)', variant: 'outline' as const },
  'import-csv': { icon: Upload, label: 'Importer depuis CSV', variant: 'outline' as const },
  'import-excel': { icon: Upload, label: 'Importer depuis Excel', variant: 'outline' as const },
  'import-json': { icon: Upload, label: 'Importer depuis JSON', variant: 'outline' as const },
  'nouveau-modèle': { icon: Plus, label: 'Nouveau Modèle', variant: 'default' as const },
  'nouveau-projet': { icon: Plus, label: 'Nouveau projet', variant: 'default' as const },
  'nouveau-rôle': { icon: Shield, label: 'Nouveau Rôle', variant: 'default' as const },
  'nouveau-sujet': { icon: Plus, label: 'Nouveau sujet', variant: 'default' as const },
  'nouveau-tag': { icon: Tag, label: 'Nouveau tag', variant: 'default' as const },
  'nouveau-template': { icon: Plus, label: 'Nouveau template', variant: 'default' as const },
  'nouveau-workflow': { icon: Workflow, label: 'Nouveau workflow', variant: 'default' as const },
  'nouvel-utilisateur': { icon: UserPlus, label: 'Nouvel Utilisateur', variant: 'default' as const },
  'nouvelle-alerte': { icon: AlertCircle, label: 'Nouvelle Alerte', variant: 'default' as const },
  'nouvelle-permission': { icon: Shield, label: 'Nouvelle Permission', variant: 'default' as const },
  'nouvelle-politique': { icon: Shield, label: 'Nouvelle Politique', variant: 'default' as const },
  'partager-ressource': { icon: Share2, label: 'Partager une ressource', variant: 'outline' as const },
  'rapport-complet': { icon: FileText, label: 'Rapport complet', variant: 'default' as const },
  'télécharger-pdf': { icon: Download, label: 'Télécharger PDF', variant: 'outline' as const },
  'voir-procédures': { icon: Eye, label: 'Voir les procédures', variant: 'outline' as const },
  'voir-textes': { icon: Eye, label: 'Voir les textes', variant: 'outline' as const },
  'ajouter-domaine': { icon: Plus, label: 'Ajouter un Domaine', variant: 'default' as const },
  'ajouter-type': { icon: Plus, label: 'Ajouter un Type de texte', variant: 'default' as const },
  'ajouter-catégorie': { icon: Plus, label: 'Ajouter une catégorie de procédure', variant: 'default' as const },
  'ajouter-organisation': { icon: Building, label: 'Ajouter une Organisation', variant: 'default' as const },
  'ajouter-source': { icon: Plus, label: 'Ajouter une Source', variant: 'default' as const }
};

export function ActionButton({ 
  action, 
  variant, 
  size = 'default', 
  className = '', 
  children, 
  data,
  itemId = '',
  itemTitle = '',
  onClick,
  disabled = false
}: ActionButtonProps) {
  const config = actionConfig[action];
  const Icon = config.icon;
  const finalVariant = variant || config.variant;

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    const handlers = (window as any).actionHandlers;
    if (!handlers) return;

    switch (action) {
      case 'lire':
      case 'pdf':
      case 'voir':
      case 'consulter':
      case 'détails':
        handlers.handlePDFView(itemTitle || 'Document', data?.pdfUrl);
        break;
      case 'partager':
      case 'partager-ressource':
        handlers.handleShare(itemTitle || 'Contenu', data?.url);
        break;
      case 'filtres':
      case 'filtrer-date':
        handlers.handleFilter(data?.type || 'general');
        break;
      case 'télécharger':
      case 'télécharger-pdf':
        handlers.handleDownload(itemTitle || 'document.pdf', data?.url);
        break;
      case 'comparer':
      case 'comparer-textes':
        handlers.handleComparison(data?.items || []);
        break;
      case 'signaler':
        handlers.handleFeedback('error', itemTitle);
        break;
      case 'avis':
        handlers.handleFeedback('feedback', itemTitle);
        break;
      case 'témoignage':
        handlers.handleFeedback('testimonial', itemTitle);
        break;
      case 'import':
      case 'import-lot':
      case 'import-zip':
      case 'import-csv':
      case 'import-excel':
      case 'import-json':
        handlers.handleImport(data?.acceptedTypes);
        break;
      case 'exporter':
      case 'export-excel':
      case 'export-json':
      case 'export-word':
      case 'export-pdf':
      case 'exporter-analyse':
        handlers.handleExport(data?.items || [], itemTitle);
        break;
      case 'examiner':
        handlers.handleExamine(itemId, itemTitle);
        break;
      case 'rejeter':
        handlers.handleReject(itemId, itemTitle);
        break;
      case 'approuver':
        handlers.handleApprove(itemId, itemTitle);
        break;
      case 'aimer':
      case 'like':
      case 'favoris':
        handlers.handleLike(itemId, itemTitle);
        break;
      default:
        console.log(`Action ${action} triggered for:`, { itemId, itemTitle, data });
    }
  };

  return (
    <Button
      variant={finalVariant}
      size={size}
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      {size === 'icon' ? (
        <Icon className="w-4 h-4" />
      ) : (
        <>
          <Icon className="w-4 h-4 mr-2" />
          {children || config.label}
        </>
      )}
    </Button>
  );
}
