
import { securityMonitor } from './enhancedSecurity';

/**
 * Système de validation avancé avec détection de patterns malveillants
 */

interface ValidationRule {
  name: string;
  test: (value: any) => boolean;
  message: string;
  critical?: boolean;
}

class EnhancedValidator {
  private rules: Map<string, ValidationRule[]> = new Map();
  private sanitizers: Map<string, (value: any) => any> = new Map();

  constructor() {
    this.initializeDefaultRules();
    this.initializeDefaultSanitizers();
  }

  private initializeDefaultRules() {
    // Règles pour les chaînes de caractères
    this.addRule('string', {
      name: 'no_script_injection',
      test: (value: string) => !/<script[\s\S]*?>[\s\S]*?<\/script>/gi.test(value),
      message: 'Script injection detected',
      critical: true
    });

    this.addRule('string', {
      name: 'no_sql_injection',
      test: (value: string) => !/(\bUNION\b|\bSELECT\b|\bINSERT\b|\bDROP\b|\bDELETE\b)/gi.test(value),
      message: 'SQL injection pattern detected',
      critical: true
    });

    this.addRule('string', {
      name: 'no_path_traversal',
      test: (value: string) => !/(\.\.|\/\.\.|\\\.\.)/g.test(value),
      message: 'Path traversal detected',
      critical: true
    });

    // Règles pour les emails
    this.addRule('email', {
      name: 'valid_format',
      test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Invalid email format'
    });

    this.addRule('email', {
      name: 'no_suspicious_domains',
      test: (value: string) => {
        const suspiciousDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
        const domain = value.split('@')[1]?.toLowerCase();
        return !suspiciousDomains.includes(domain);
      },
      message: 'Suspicious email domain detected'
    });

    // Règles pour les mots de passe
    this.addRule('password', {
      name: 'min_length',
      test: (value: string) => value.length >= 8,
      message: 'Password must be at least 8 characters long'
    });

    this.addRule('password', {
      name: 'complexity',
      test: (value: string) => {
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        return [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length >= 3;
      },
      message: 'Password must contain at least 3 of: uppercase, lowercase, numbers, special characters'
    });
  }

  private initializeDefaultSanitizers() {
    this.addSanitizer('string', (value: string) => {
      return value
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    });

    this.addSanitizer('filename', (value: string) => {
      return value.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_');
    });

    this.addSanitizer('url', (value: string) => {
      try {
        const url = new URL(value);
        // Autoriser seulement HTTP et HTTPS
        if (!['http:', 'https:'].includes(url.protocol)) {
          throw new Error('Invalid protocol');
        }
        return url.toString();
      } catch {
        return '';
      }
    });
  }

  addRule(type: string, rule: ValidationRule) {
    if (!this.rules.has(type)) {
      this.rules.set(type, []);
    }
    this.rules.get(type)!.push(rule);
  }

  addSanitizer(type: string, sanitizer: (value: any) => any) {
    this.sanitizers.set(type, sanitizer);
  }

  validate(type: string, value: any, context?: string): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    sanitized: any;
  } {
    const rules = this.rules.get(type) || [];
    const errors: string[] = [];
    const warnings: string[] = [];

    // Appliquer les règles de validation
    rules.forEach(rule => {
      try {
        if (!rule.test(value)) {
          if (rule.critical) {
            errors.push(rule.message);
            // Log des erreurs critiques
            securityMonitor.logSecurityEvent('critical_validation_failure', {
              rule: rule.name,
              type,
              context,
              value: typeof value === 'string' ? value.substring(0, 50) : value
            });
          } else {
            warnings.push(rule.message);
          }
        }
      } catch (error) {
        console.warn(`Validation rule ${rule.name} failed to execute:`, error);
      }
    });

    // Appliquer la sanitisation
    const sanitizer = this.sanitizers.get(type);
    const sanitized = sanitizer ? sanitizer(value) : value;

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      sanitized
    };
  }

  validateObject(schema: Record<string, string>, data: Record<string, any>, context?: string) {
    const results: Record<string, any> = {};
    let hasErrors = false;

    Object.entries(schema).forEach(([field, type]) => {
      const value = data[field];
      const result = this.validate(type, value, `${context}.${field}`);
      results[field] = result;
      
      if (!result.isValid) {
        hasErrors = true;
      }
    });

    return {
      isValid: !hasErrors,
      results,
      sanitized: Object.keys(results).reduce((acc, key) => {
        acc[key] = results[key].sanitized;
        return acc;
      }, {} as Record<string, any>)
    };
  }
}

export const enhancedValidator = new EnhancedValidator();

// Hook React pour la validation
import { useState, useCallback } from 'react';

export function useEnhancedValidation() {
  const [validationResults, setValidationResults] = useState<Record<string, any>>({});

  const validateField = useCallback((type: string, value: any, fieldName: string, context?: string) => {
    const result = enhancedValidator.validate(type, value, context);
    setValidationResults(prev => ({
      ...prev,
      [fieldName]: result
    }));
    return result;
  }, []);

  const validateForm = useCallback((schema: Record<string, string>, data: Record<string, any>, context?: string) => {
    const result = enhancedValidator.validateObject(schema, data, context);
    setValidationResults(result.results);
    return result;
  }, []);

  const clearValidation = useCallback((fieldName?: string) => {
    if (fieldName) {
      setValidationResults(prev => {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setValidationResults({});
    }
  }, []);

  return {
    validationResults,
    validateField,
    validateForm,
    clearValidation
  };
}
