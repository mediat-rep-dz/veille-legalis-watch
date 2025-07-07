
import { securityMonitor } from './enhancedSecurity';

/**
 * Utilitaires de sécurité optimisés et simplifiés
 */

// Validation sécurisée des entrées
export const secureValidation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^(\+213|0)[5-7][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  strongPassword: (password: string): { valid: boolean; score: number; feedback: string[] } => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 25;
    else feedback.push('Au moins 8 caractères requis');

    if (/[a-z]/.test(password)) score += 25;
    else feedback.push('Lettres minuscules requises');

    if (/[A-Z]/.test(password)) score += 25;
    else feedback.push('Lettres majuscules requises');

    if (/[0-9]/.test(password)) score += 25;
    else feedback.push('Chiffres requis');

    return { valid: score === 100, score, feedback };
  },

  input: (input: string, context: string = 'general') => {
    return securityMonitor.validateInput(input, context);
  }
};

// Sanitisation sécurisée
export const secureSanitize = {
  html: (input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  filename: (filename: string): string => {
    return filename.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_');
  },

  url: (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Protocole non autorisé');
      }
      return urlObj.toString();
    } catch {
      return '';
    }
  }
};

// Génération de tokens sécurisés
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Validation de fichiers
export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/gif'
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'Fichier trop volumineux (max 10MB)' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Type de fichier non autorisé' };
  }

  return { valid: true };
};
