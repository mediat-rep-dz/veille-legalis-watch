
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcedureHistoryTab } from './procedures/ProcedureHistoryTab';
import { ProceduresPendingApprovalTab } from './procedures/ProceduresPendingApprovalTab';
import { ProcedureCatalogTab } from './procedures/ProcedureCatalogTab';
import { ProcedureResourcesSection } from './ProcedureResourcesSection';
import { ProcedureComparisonSection } from './ProcedureComparisonSection';
import { ProcedureSearchSection } from './ProcedureSearchSection';
import { TimelineTab } from './procedures/tabs/TimelineTab';
import { EnrichmentTab } from './procedures/tabs/EnrichmentTab';

interface ProceduresTabsProps {
  section: string;
  onAddProcedure?: () => void;
  onOpenApprovalQueue?: () => void;
}

export function ProceduresTabs({ section, onAddProcedure, onOpenApprovalQueue }: ProceduresTabsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Log de débogage pour vérifier la transmission des props
  console.log('ProceduresTabs - onOpenApprovalQueue:', typeof onOpenApprovalQueue, onOpenApprovalQueue);

  const handleAddClick = () => {
    console.log('Bouton vert cliqué - Redirection vers le formulaire');
    if (onAddProcedure) {
      onAddProcedure();
    } else {
      console.error('onAddProcedure function not provided');
    }
  };

  const handleOpenApprovalQueue = () => {
    console.log('ProceduresTabs - handleOpenApprovalQueue appelée');
    if (onOpenApprovalQueue) {
      console.log('ProceduresTabs - Appel de onOpenApprovalQueue');
      onOpenApprovalQueue();
    } else {
      console.error('ProceduresTabs - onOpenApprovalQueue function not provided');
    }
  };

  const getTabsConfig = () => {
    switch (section) {
      case 'procedures-catalog':
        return {
          defaultValue: 'catalogue',
          tabs: [
            { 
              value: 'catalogue', 
              label: 'Catalogue', 
              content: <ProcedureCatalogTab 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                onAddProcedure={handleAddClick}
                onOpenApprovalQueue={handleOpenApprovalQueue}
              />
            },
            { 
              value: 'timeline', 
              label: 'Timeline des procédures', 
              content: <TimelineTab />
            },
            { 
              value: 'comparaison', 
              label: 'Comparaison des procédures', 
              content: <ProcedureComparisonSection />
            },
            { 
              value: 'historiques', 
              label: 'Historiques des versions', 
              content: <ProcedureHistoryTab />
            }
          ]
        };
      case 'procedures-enrichment':
        return {
          defaultValue: 'enrichment',
          tabs: [
            { 
              value: 'enrichment', 
              label: 'Alimentation', 
              content: <EnrichmentTab onAddProcedure={handleAddClick} />
            },
            { 
              value: 'pending-approval', 
              label: 'Procédures administratives en attente de publication', 
              content: <ProceduresPendingApprovalTab />
            }
          ]
        };
      case 'procedures-search':
        return {
          defaultValue: 'search',
          tabs: [
            { 
              value: 'search', 
              label: 'Recherche', 
              content: <ProcedureSearchSection />
            }
          ]
        };
      case 'procedures-resources':
        return {
          defaultValue: 'resources',
          tabs: [
            { 
              value: 'resources', 
              label: 'Ressources', 
              content: <ProcedureResourcesSection />
            }
          ]
        };
      default:
        return {
          defaultValue: 'catalogue',
          tabs: [
            { 
              value: 'catalogue', 
              label: 'Catalogue', 
              content: <ProcedureCatalogTab 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                onAddProcedure={handleAddClick}
                onOpenApprovalQueue={handleOpenApprovalQueue}
              />
            }
          ]
        };
    }
  };

  const tabsConfig = getTabsConfig();

  return (
    <div className="space-y-6">
      <Tabs defaultValue={tabsConfig.defaultValue} className="w-full">
        <TabsList className={`grid w-full ${tabsConfig.tabs.length === 1 ? 'grid-cols-1' : 
          tabsConfig.tabs.length === 2 ? 'grid-cols-2' : 
          tabsConfig.tabs.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {tabsConfig.tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabsConfig.tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
