
import React from 'react';
import { AdvancedAutocomplete } from './AdvancedAutocomplete';

interface SmartAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SmartAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Tapez pour commencer...",
  context = 'general',
  className,
  onKeyPress
}: SmartAutocompleteProps) {
  return (
    <AdvancedAutocomplete
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      context={context}
      className={className}
      onKeyPress={onKeyPress}
      withVoiceRecognition={true}
    />
  );
}
