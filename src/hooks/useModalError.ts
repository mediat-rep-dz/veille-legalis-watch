
import { useState, useCallback } from 'react';
import { ModalErrorState } from '@/components/modals/types/modalTypes';
import { useToast } from '@/hooks/use-toast';

export function useModalError() {
  const [error, setError] = useState<ModalErrorState>({ hasError: false });
  const { toast } = useToast();

  const handleError = useCallback((errorMessage: string, showToast = true) => {
    setError({
      hasError: true,
      error: errorMessage,
      retry: () => setError({ hasError: false })
    });

    if (showToast) {
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast]);

  const clearError = useCallback(() => {
    setError({ hasError: false });
  }, []);

  const retryWithCallback = useCallback((callback: () => void | Promise<void>) => {
    setError(prev => ({
      ...prev,
      retry: async () => {
        try {
          await callback();
          clearError();
        } catch (err) {
          handleError(err instanceof Error ? err.message : 'Erreur lors de la tentative');
        }
      }
    }));
  }, [handleError, clearError]);

  return {
    error,
    handleError,
    clearError,
    retryWithCallback
  };
}
