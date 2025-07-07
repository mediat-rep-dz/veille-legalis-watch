import React from 'react';
import { useModals } from '@/hooks/useModals';
import { PDFViewerModal } from '@/components/modals/PDFViewerModal';
import { ComparisonModal } from '@/components/modals/ComparisonModal';
import { FilterModal } from '@/components/modals/FilterModal';
import { FeedbackModal } from '@/components/modals/FeedbackModal';
import { ExportModal } from '@/components/modals/ExportModal';
import { ImportModal } from '@/components/modals/ImportModal';
import { AdvancedSearchModal } from '@/components/modals/AdvancedSearchModal';
import { AnalysisModal } from '@/components/modals/AnalysisModal';
import { ManagementModal } from '@/components/modals/ManagementModal';
import { WorkflowModal } from '@/components/modals/WorkflowModal';
import { NotificationModal } from '@/components/modals/NotificationModal';
import { useToast } from '@/hooks/use-toast';

interface ActionHandlerProps {
  children: React.ReactNode;
}

export function ActionHandler({ children }: ActionHandlerProps) {
  const { modals, openModal, closeModal, closeAllModals } = useModals();
  const { toast } = useToast();

  // Global action handlers
  const handlePDFView = (title: string, pdfUrl?: string) => {
    openModal('pdfViewer', { data: { title, pdfUrl } });
  };

  const handleComparison = (items: any[]) => {
    openModal('comparison', { data: items });
  };

  const handleFilter = (type: 'legal' | 'procedure' | 'general' = 'general') => {
    openModal('filter', { type });
  };

  const handleFeedback = (type: 'error' | 'feedback' | 'testimonial', itemTitle?: string) => {
    openModal('feedback', { type, itemTitle });
  };

  const handleExport = (data: any[], filename?: string) => {
    openModal('export', { data, filename });
  };

  const handleImport = (acceptedTypes: string[] = ['.csv', '.xlsx', '.json']) => {
    openModal('import', { acceptedTypes });
  };

  const handleAdvancedSearch = () => {
    openModal('advancedSearch');
  };

  const handleAnalysis = (type: 'comparative' | 'performance' | 'trends', data: any[] = []) => {
    openModal('analysis', { type, data });
  };

  const handleManagement = (type: 'domain' | 'textType' | 'category' | 'organization' | 'source' | 'role' | 'permission' | 'policy') => {
    openModal('management', { type });
  };

  const handleLike = (itemId: string, itemTitle: string) => {
    toast({
      title: "Ajouté aux favoris",
      description: `"${itemTitle}" a été ajouté à vos favoris.`,
    });
  };

  const handleShare = async (title: string, url?: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Consultez: ${title}`,
          url: url || window.location.href
        });
        toast({
          title: "Partagé avec succès",
          description: "Le lien a été partagé.",
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      navigator.clipboard.writeText(url || window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien a été copié dans le presse-papiers.",
      });
    }
  };

  const handleDownload = (filename: string, url?: string) => {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    }
    toast({
      title: "Téléchargement démarré",
      description: `Le fichier ${filename} est en cours de téléchargement.`,
    });
  };

  const handleApprove = (itemId: string, itemTitle: string) => {
    toast({
      title: "Élément approuvé",
      description: `"${itemTitle}" a été approuvé avec succès.`,
    });
  };

  const handleReject = (itemId: string, itemTitle: string) => {
    toast({
      title: "Élément rejeté",
      description: `"${itemTitle}" a été rejeté.`,
    });
  };

  const handleExamine = (itemId: string, itemTitle: string) => {
    toast({
      title: "Examen en cours",
      description: `"${itemTitle}" est maintenant en cours d'examen.`,
    });
  };

  const handleGeolocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          openModal('geolocationSearch', { 
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        },
        () => {
          toast({
            title: "Géolocalisation non disponible",
            description: "Impossible d'accéder à votre position.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const handleAIGeneration = (type: 'form' | 'report' | 'document', data?: any) => {
    openModal('aiGeneration', { type, data });
  };

  const handleWorkflowCreate = () => {
    openModal('workflowManager');
  };

  const handleUserManagement = (action: 'create' | 'edit' | 'invite', user?: any) => {
    openModal('userManagement', { action, user });
  };

  const handleAlertManagement = (alert?: any) => {
    openModal('alertManagement', { alert });
  };

  const handleSessionManagement = () => {
    openModal('sessionManagement');
  };

  const handleTemplateManager = (template?: any) => {
    openModal('templateManager', { template });
  };

  const handleProjectManager = (project?: any) => {
    openModal('projectManager', { project });
  };

  const handleTagManager = (tag?: any) => {
    openModal('tagManager', { tag });
  };

  // Provide action handlers to child components via context
  React.useEffect(() => {
    // Attach global action handlers to window for easy access
    (window as any).actionHandlers = {
      handlePDFView,
      handleComparison,
      handleFilter,
      handleFeedback,
      handleExport,
      handleImport,
      handleAdvancedSearch,
      handleAnalysis,
      handleManagement,
      handleLike,
      handleShare,
      handleDownload,
      handleApprove,
      handleReject,
      handleExamine,
      handleGeolocationSearch,
      handleAIGeneration,
      handleWorkflowCreate,
      handleUserManagement,
      handleAlertManagement,
      handleSessionManagement,
      handleTemplateManager,
      handleProjectManager,
      handleTagManager,
      
      // Extended handlers for new actions
      handleAnalysisComparative: (data: any[] = []) => openModal('analysis', { type: 'comparative', data }),
      handleAnalysisPerformance: (data: any[] = []) => openModal('analysis', { type: 'performance', data }),
      handleAnalysisTrends: (data: any[] = []) => openModal('analysis', { type: 'trends', data }),
      
      handleAddDomain: () => openModal('management', { type: 'domain' }),
      handleAddTextType: () => openModal('management', { type: 'textType' }),
      handleAddCategory: () => openModal('management', { type: 'category' }),
      handleAddOrganization: () => openModal('management', { type: 'organization' }),
      handleAddSource: () => openModal('management', { type: 'source' }),
      handleAddRole: () => openModal('management', { type: 'role' }),
      handleAddPermission: () => openModal('management', { type: 'permission' }),
      handleAddPolicy: () => openModal('management', { type: 'policy' }),
      
      handleGenerateForm: (data?: any) => openModal('aiGeneration', { type: 'form', data }),
      handleGenerateReport: (data?: any) => openModal('aiGeneration', { type: 'report', data }),
      handleGenerateDocument: (data?: any) => openModal('aiGeneration', { type: 'document', data }),
      
      handleAutoFill: (formId: string) => {
        toast({
          title: "Auto-remplissage activé",
          description: "Le formulaire sera rempli automatiquement avec vos données.",
        });
      },
      
      handleConfigureBase: () => {
        toast({
          title: "Configuration de base",
          description: "Interface de configuration ouverte.",
        });
      },
      
      handleConfigureChannel: () => {
        toast({
          title: "Configuration du canal",
          description: "Paramètres de canal mis à jour.",
        });
      },
      
      handleCreateWorkflow: () => openModal('workflowManager'),
      
      handleConsultDictionary: () => {
        toast({
          title: "Dictionnaire ouvert",
          description: "Consultation du dictionnaire complet.",
        });
      },
      
      handleCloseSessions: () => {
        toast({
          title: "Sessions fermées",
          description: "Toutes les sessions ont été fermées avec succès.",
        });
      },
      
      handleDateFilter: () => openModal('filter', { type: 'date' }),
      
      handleDownloadForms: () => {
        toast({
          title: "Téléchargement des formulaires",
          description: "Les formulaires téléchargeables sont prêts.",
        });
      },
      
      handlePracticalGuides: () => {
        toast({
          title: "Guides pratiques",
          description: "Accès aux guides pratiques ouvert.",
        });
      },
      
      handleBatchImportZip: () => openModal('import', { acceptedTypes: ['.zip'] }),
      handleBatchImportCsv: () => openModal('import', { acceptedTypes: ['.csv'] }),
      handleBatchImportExcel: () => openModal('import', { acceptedTypes: ['.xlsx', '.xls'] }),
      handleBatchImportJson: () => openModal('import', { acceptedTypes: ['.json'] }),
      
      handleNewModel: () => openModal('templateManager', { type: 'model' }),
      handleNewProject: () => openModal('projectManager'),
      handleNewSubject: () => openModal('management', { type: 'subject' }),
      handleNewTag: () => openModal('tagManager'),
      handleNewTemplate: () => openModal('templateManager'),
      handleNewWorkflow: () => openModal('workflowManager'),
      handleNewUser: () => openModal('userManagement', { action: 'create' }),
      handleNewAlert: () => openModal('alertManagement'),
      
      handleShareResource: (resource: any) => {
        navigator.clipboard.writeText(resource?.url || window.location.href);
        toast({
          title: "Ressource partagée",
          description: "Le lien de la ressource a été copié.",
        });
      },
      
      handleViewProcedures: () => {
        // Navigation vers la section procédures
        const event = new CustomEvent('navigate-to-section', { detail: 'procedures-catalog' });
        window.dispatchEvent(event);
      },
      
      handleViewTexts: () => {
        // Navigation vers la section textes juridiques
        const event = new CustomEvent('navigate-to-section', { detail: 'legal-catalog' });
        window.dispatchEvent(event);
      },
      
      handleTranslate: (text: string, targetLang: string = 'en') => {
        toast({
          title: "Traduction en cours",
          description: `Traduction vers ${targetLang} initiée.`,
        });
      },
      
      handleVerify: (itemId: string, itemType: string) => {
        toast({
          title: "Vérification en cours",
          description: `Vérification de ${itemType} lancée.`,
        });
      },
      
      handleStart: (processId: string) => {
        toast({
          title: "Process démarré",
          description: "Le processus a été démarré avec succès.",
        });
      },
      
      handlePublish: (itemId: string, itemTitle: string) => {
        toast({
          title: "Publication réussie",
          description: `"${itemTitle}" a été publié avec succès.`,
        });
      },
      
      handleInviteMembers: () => openModal('userManagement', { action: 'invite' }),
      
      handleReadMore: (itemId: string) => {
        // Expand content or navigate to detail view
        console.log('Read more for item:', itemId);
      },
      
      handleClose: (modalId?: string) => {
        if (modalId) {
          closeModal(modalId as any);
        } else {
          closeAllModals();
        }
      }
    };
  }, [openModal, closeModal, closeAllModals, toast]);

  return (
    <>
      {children}
      
      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={modals.pdfViewer.isOpen}
        onClose={() => closeModal('pdfViewer')}
        title={modals.pdfViewer.data?.title || ''}
        pdfUrl={modals.pdfViewer.data?.pdfUrl}
      />

      <ComparisonModal
        isOpen={modals.comparison.isOpen}
        onClose={() => closeModal('comparison')}
        items={modals.comparison.data}
      />

      <FilterModal
        isOpen={modals.filter.isOpen}
        onClose={() => closeModal('filter')}
        filterType={modals.filter.type}
        onApplyFilters={(filters) => {
          console.log('Filters applied:', filters);
          toast({
            title: "Filtres appliqués",
            description: "Vos filtres ont été appliqués avec succès.",
          });
        }}
      />

      <FeedbackModal
        isOpen={modals.feedback.isOpen}
        onClose={() => closeModal('feedback')}
        type={modals.feedback.type}
        itemTitle={modals.feedback.itemTitle}
      />

      <ExportModal
        isOpen={modals.export.isOpen}
        onClose={() => closeModal('export')}
        data={modals.export.data}
        filename={modals.export.filename}
      />

      <ImportModal
        isOpen={modals.import.isOpen}
        onClose={() => closeModal('import')}
        acceptedTypes={modals.import.acceptedTypes}
        onImport={(data) => {
          console.log('Data imported:', data);
          toast({
            title: "Import réussi",
            description: `${data.length} éléments ont été importés avec succès.`,
          });
        }}
      />

      {/* New Modals */}
      <AdvancedSearchModal
        isOpen={modals.advancedSearch.isOpen}
        onClose={() => closeModal('advancedSearch')}
        onSearch={(criteria) => {
          console.log('Advanced search:', criteria);
          toast({
            title: "Recherche lancée",
            description: "Recherche avancée en cours...",
          });
        }}
      />

      <AnalysisModal
        isOpen={modals.analysis.isOpen}
        onClose={() => closeModal('analysis')}
        type={modals.analysis.type}
        data={modals.analysis.data}
      />

      <ManagementModal
        isOpen={modals.management.isOpen}
        onClose={() => closeModal('management')}
        type={modals.management.type}
        onSave={(data) => {
          console.log('Management data saved:', data);
          toast({
            title: "Élément ajouté",
            description: "Le nouvel élément a été ajouté avec succès.",
          });
        }}
      />

      <WorkflowModal
        isOpen={modals.workflowManager.isOpen}
        onClose={() => closeModal('workflowManager')}
        workflow={modals.workflowManager.workflow}
        onSave={(workflow) => {
          console.log('Workflow saved:', workflow);
          toast({
            title: "Workflow sauvegardé",
            description: "Le workflow a été créé/modifié avec succès.",
          });
        }}
      />

      <NotificationModal
        isOpen={modals.notification.isOpen}
        onClose={() => closeModal('notification')}
        notification={modals.notification.notification}
        onSend={(notification) => {
          console.log('Notification sent:', notification);
          toast({
            title: "Notification envoyée",
            description: "La notification a été envoyée avec succès.",
          });
        }}
      />
    </>
  );
}
