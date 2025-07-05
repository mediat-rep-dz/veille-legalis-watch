import { useState } from 'react';
import { FileText } from 'lucide-react';
import { SectionHeader } from './common/SectionHeader';
import { LegalTextsTabs } from './LegalTextsTabs';
import { LegalTextFormEnhanced } from './LegalTextFormEnhanced';
import { LegalTextSummaryModal } from './LegalTextSummaryModal';
import { ApprovalModal } from './ApprovalModal';
import { ApprovalQueueModal } from './ApprovalQueueModal';

interface LegalTextsSectionsProps {
  section: string;
  language: string;
}

export function LegalTextsSections({ section, language }: LegalTextsSectionsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showApprovalQueue, setShowApprovalQueue] = useState(false);
  const [legalTextData, setLegalTextData] = useState(null);

  const handleAddLegalText = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleLegalTextSubmitted = (data: any) => {
    setLegalTextData(data);
    setShowAddForm(false);
    setShowApprovalModal(true);
  };

  const handleCloseSummaryModal = () => {
    setShowSummaryModal(false);
    setLegalTextData(null);
  };

  const handleAddAnotherLegalText = () => {
    setShowSummaryModal(false);
    setLegalTextData(null);
    setShowAddForm(true);
  };

  const handleApprove = (comment?: string) => {
    console.log('Texte juridique approuvé:', legalTextData, 'Commentaire:', comment);
    setShowApprovalModal(false);
    setShowSummaryModal(true);
  };

  const handleReject = (reason: string) => {
    console.log('Texte juridique rejeté:', legalTextData, 'Raison:', reason);
    setShowApprovalModal(false);
    setLegalTextData(null);
  };

  const handleOpenApprovalQueue = () => {
    setShowApprovalQueue(true);
  };

  const handleApproveFromQueue = (item: any, comment?: string) => {
    console.log('Approuvé depuis la file:', item, comment);
  };

  const handleRejectFromQueue = (item: any, reason: string) => {
    console.log('Rejeté depuis la file:', item, reason);
  };

  const handleViewFromQueue = (item: any) => {
    setLegalTextData(item.data);
    setShowApprovalQueue(false);
    setShowApprovalModal(true);
  };

  const getSectionTitle = () => {
    const titles = {
      fr: {
        'legal-catalog': 'Catalogue des Textes Juridiques',
        'legal-enrichment': 'Alimentation de la Banque de Données',
        'legal-search': 'Recherche de Textes Juridiques'
      },
      ar: {
        'legal-catalog': 'كتالوج النصوص القانونية',
        'legal-enrichment': 'إثراء قاعدة البيانات',
        'legal-search': 'البحث في النصوص القانونية'
      },
      en: {
        'legal-catalog': 'Legal Texts Catalog',
        'legal-enrichment': 'Database Enrichment',
        'legal-search': 'Legal Texts Search'
      }
    };
    return titles[language as keyof typeof titles]?.[section as keyof typeof titles['fr']] || 'Textes Juridiques';
  };

  const getSectionDescription = () => {
    const descriptions = {
      fr: {
        'legal-catalog': 'Consultez et gérez l\'ensemble des textes juridiques algériens disponibles dans la plateforme.',
        'legal-enrichment': 'Ajoutez et enrichissez la base de données avec de nouveaux textes juridiques.',
        'legal-search': 'Recherchez efficacement dans la collection complète de textes juridiques.'
      },
      ar: {
        'legal-catalog': 'استعرض وأدر جميع النصوص القانونية الجزائرية المتاحة في المنصة.',
        'legal-enrichment': 'أضف وأثر قاعدة البيانات بنصوص قانونية جديدة.',
        'legal-search': 'ابحث بكفاءة في المجموعة الكاملة من النصوص القانونية.'
      },
      en: {
        'legal-catalog': 'Browse and manage all Algerian legal texts available on the platform.',
        'legal-enrichment': 'Add and enrich the database with new legal texts.',
        'legal-search': 'Search efficiently through the complete collection of legal texts.'
      }
    };
    return descriptions[language as keyof typeof descriptions]?.[section as keyof typeof descriptions['fr']];
  };

  if (showAddForm) {
    return (
      <LegalTextFormEnhanced 
        onClose={handleCloseForm} 
        onSubmit={handleLegalTextSubmitted}
      />
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title={getSectionTitle()}
        description={getSectionDescription()}
        icon={FileText}
      />
      
      <LegalTextsTabs 
        section={section} 
        onAddLegalText={handleAddLegalText}
        onOpenApprovalQueue={handleOpenApprovalQueue}
      />
      
      
      <LegalTextSummaryModal
        isOpen={showSummaryModal}
        onClose={handleCloseSummaryModal}
        onAddAnother={handleAddAnotherLegalText}
        legalTextData={legalTextData}
      />

      <ApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onApprove={handleApprove}
        onReject={handleReject}
        data={legalTextData}
        type="legal-text"
      />

      <ApprovalQueueModal
        isOpen={showApprovalQueue}
        onClose={() => setShowApprovalQueue(false)}
        onApproveItem={handleApproveFromQueue}
        onRejectItem={handleRejectFromQueue}
        onViewItem={handleViewFromQueue}
      />
    </div>
  );
}
