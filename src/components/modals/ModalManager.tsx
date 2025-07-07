
import React from 'react';
import { useModals } from '@/hooks/useModals';
import { ModalProvider } from './context/ModalProvider';
import { BaseModalGroup } from './core/BaseModalGroup';
import { SearchModalGroup } from './core/SearchModalGroup';
import { DataModalGroup } from './core/DataModalGroup';
import { ManagementModalGroup } from './core/ManagementModalGroup';
import { AIModalGroup } from './core/AIModalGroup';
import { WorkflowModal } from './WorkflowModal';
import { NotificationModal } from './NotificationModal';

export function ModalManager() {
  const { modals, closeModal } = useModals();

  return (
    <ModalProvider>
      <BaseModalGroup modals={modals} closeModal={closeModal} />
      <SearchModalGroup modals={modals} closeModal={closeModal} />
      <DataModalGroup modals={modals} closeModal={closeModal} />
      <ManagementModalGroup modals={modals} closeModal={closeModal} />
      <AIModalGroup modals={modals} closeModal={closeModal} />
      
      {/* Additional specialized modals */}
      <WorkflowModal
        isOpen={modals.workflowManager.isOpen}
        onClose={() => closeModal('workflowManager')}
        workflow={modals.workflowManager.workflow}
      />
      
      <NotificationModal
        isOpen={modals.notification.isOpen}
        onClose={() => closeModal('notification')}
        notification={modals.notification.notification}
      />
    </ModalProvider>
  );
}
