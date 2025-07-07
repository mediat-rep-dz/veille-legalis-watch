
import { useState, useCallback } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';

export function useModals() {
  const [modals, setModals] = useState({
    pdfViewer: { isOpen: false, data: null as any },
    comparison: { isOpen: false, data: [] as any[] },
    filter: { isOpen: false, type: 'general' as 'legal' | 'procedure' | 'general' },
    feedback: { isOpen: false, type: 'feedback' as 'error' | 'feedback' | 'testimonial', itemTitle: '' },
    export: { isOpen: false, data: [] as any[], filename: 'export' },
    import: { isOpen: false, acceptedTypes: ['.csv', '.xlsx', '.json'] },
    advancedSearch: { isOpen: false, data: null as any },
    analysis: { isOpen: false, type: 'comparative' as 'comparative' | 'performance' | 'trends', data: [] as any[] },
    management: { isOpen: false, type: 'domain' as 'domain' | 'textType' | 'category' | 'organization' | 'source' | 'role' | 'permission' | 'policy' },
    workflow: { isOpen: false, data: null as any },
    aiGeneration: { isOpen: false, type: 'form' as 'form' | 'report' | 'document', data: null as any },
    userManagement: { isOpen: false, action: 'create' as 'create' | 'edit' | 'invite', user: null as any },
    alertManagement: { isOpen: false, alert: null as any },
    sessionManagement: { isOpen: false, data: null as any },
    documentViewer: { isOpen: false, document: null as any },
    templateManager: { isOpen: false, template: null as any },
    projectManager: { isOpen: false, project: null as any },
    tagManager: { isOpen: false, tag: null as any },
    workflowManager: { isOpen: false, workflow: null as any },
    geolocationSearch: { isOpen: false, location: null as any },
    notification: { isOpen: false, notification: null as any }
  });

  const openModal = useCallback((modalName: keyof typeof modals, data?: any) => {
    performanceMonitor.recordMetric(`modal_open_${modalName}`, performance.now(), 'interaction');
    
    setModals(prev => ({
      ...prev,
      [modalName]: { ...prev[modalName], isOpen: true, ...data }
    }));
  }, []);

  const closeModal = useCallback((modalName: keyof typeof modals) => {
    performanceMonitor.recordMetric(`modal_close_${modalName}`, performance.now(), 'interaction');
    
    setModals(prev => ({
      ...prev,
      [modalName]: { ...prev[modalName], isOpen: false }
    }));
  }, []);

  const closeAllModals = useCallback(() => {
    performanceMonitor.recordMetric('modal_close_all', performance.now(), 'interaction');
    
    setModals(prev => 
      Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: { ...prev[key as keyof typeof prev], isOpen: false }
      }), {} as typeof prev)
    );
  }, []);

  const getOpenModalsCount = useCallback(() => {
    return Object.values(modals).filter(modal => modal.isOpen).length;
  }, [modals]);

  const isAnyModalOpen = useCallback(() => {
    return Object.values(modals).some(modal => modal.isOpen);
  }, [modals]);

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    getOpenModalsCount,
    isAnyModalOpen
  };
}
