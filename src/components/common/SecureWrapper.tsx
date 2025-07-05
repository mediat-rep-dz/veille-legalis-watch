
import React, { useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { LoginForm } from '@/components/auth/LoginForm';
import { Loader2 } from 'lucide-react';
import { securityMonitor } from '@/utils/enhancedSecurity';

interface SecureWrapperProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

export function SecureWrapper({ children, requiredRole, fallback }: SecureWrapperProps) {
  const { user, userRole, loading } = useAuth();

  useEffect(() => {
    // Monitor unauthorized access attempts
    if (!loading && !user && requiredRole) {
      securityMonitor.logSecurityEvent('unauthorized_access_attempt', {
        requiredRole,
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
    }
  }, [user, loading, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Accès refusé</h2>
          <p className="text-gray-600">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Rôle requis: {requiredRole} | Votre rôle: {userRole || 'Aucun'}
          </p>
          {fallback}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
