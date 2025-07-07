
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, Search, Clock, Star, Mic, MicOff } from 'lucide-react';

interface AutocompleteOption {
  id: string;
  text: string;
  type: 'recent' | 'suggestion' | 'template' | 'legal_term' | 'completion';
  category?: string;
  frequency?: number;
}

interface AdvancedAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  withVoiceRecognition?: boolean;
}

export function AdvancedAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Tapez pour commencer...",
  context = 'general',
  className,
  onKeyPress,
  withVoiceRecognition = false
}: AdvancedAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AutocompleteOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Suggestions prédéfinies par contexte avec complétions de phrases
  const contextSuggestions: Record<string, AutocompleteOption[]> = {
    legal: [
      { id: '1', text: 'Code civil algérien', type: 'legal_term', category: 'Code' },
      { id: '2', text: 'Loi de finances 2024', type: 'legal_term', category: 'Loi' },
      { id: '3', text: 'Décret exécutif relatif à', type: 'completion', category: 'Décret' },
      { id: '4', text: 'Constitution algérienne article', type: 'completion', category: 'Constitution' },
      { id: '5', text: 'Ordonnance présidentielle concernant', type: 'completion', category: 'Ordonnance' },
      { id: '6', text: 'Journal officiel de la République algérienne', type: 'legal_term', category: 'Publication' },
      { id: '7', text: 'Ministère de la Justice', type: 'legal_term', category: 'Institution' }
    ],
    procedure: [
      { id: '1', text: 'Demande de passeport biométrique', type: 'template', category: 'Identité' },
      { id: '2', text: 'Inscription universitaire en ligne', type: 'template', category: 'Éducation' },
      { id: '3', text: 'Création d\'entreprise SARL', type: 'template', category: 'Commerce' },
      { id: '4', text: 'Permis de construire individuel', type: 'template', category: 'Urbanisme' },
      { id: '5', text: 'Certificat de résidence administrative', type: 'completion', category: 'Administration' },
      { id: '6', text: 'Autorisation d\'exercice professionnel', type: 'completion', category: 'Profession' }
    ],
    search: [
      { id: '1', text: 'textes récents publiés', type: 'completion' },
      { id: '2', text: 'jurisprudence 2024 relative à', type: 'completion' },
      { id: '3', text: 'modifications législatives concernant', type: 'completion' },
      { id: '4', text: 'procédures administratives simplifiées', type: 'completion' }
    ]
  };

  // Initialiser la reconnaissance vocale
  useEffect(() => {
    if (withVoiceRecognition && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onChange(value + ' ' + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [withVoiceRecognition]);

  // Générer des suggestions basées sur la saisie
  useEffect(() => {
    if (value.length > 1) {
      const words = value.toLowerCase().split(' ');
      const lastWord = words[words.length - 1];
      
      const contextItems = contextSuggestions[context] || [];
      const filtered = contextItems
        .filter(item => 
          item.text.toLowerCase().includes(lastWord) ||
          item.text.toLowerCase().startsWith(lastWord)
        )
        .slice(0, 6);

      // Ajouter des complétions de mots courants
      const commonCompletions = generateWordCompletions(lastWord, context);
      const allSuggestions = [...filtered, ...commonCompletions].slice(0, 8);
      
      setSuggestions(allSuggestions);
      setShowSuggestions(allSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
    setSelectedIndex(-1);
  }, [value, context]);

  const generateWordCompletions = (word: string, context: string): AutocompleteOption[] => {
    const completions: Record<string, string[]> = {
      legal: ['juridique', 'législatif', 'réglementaire', 'constitutionnel', 'judiciaire'],
      procedure: ['administrative', 'procédurale', 'documentaire', 'officielle', 'réglementaire'],
      general: ['nationale', 'publique', 'officielle', 'générale', 'spéciale']
    };

    const contextCompletions = completions[context] || completions.general;
    return contextCompletions
      .filter(comp => comp.startsWith(word) && comp !== word)
      .map((comp, index) => ({
        id: `comp-${index}`,
        text: comp,
        type: 'completion' as const,
        category: 'Mot'
      }));
  };

  const startVoiceRecognition = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) {
      if (onKeyPress) {
        onKeyPress(e);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const suggestion = suggestions[selectedIndex];
          if (suggestion.type === 'completion') {
            // Remplacer le dernier mot ou ajouter la completion
            const words = value.split(' ');
            const lastWord = words[words.length - 1];
            if (suggestion.text.startsWith(lastWord)) {
              words[words.length - 1] = suggestion.text;
            } else {
              words.push(suggestion.text);
            }
            onChange(words.join(' '));
          } else {
            onChange(suggestion.text);
          }
          setShowSuggestions(false);
        } else if (onKeyPress) {
          onKeyPress(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        if (onKeyPress) {
          onKeyPress(e);
        }
    }
  };

  const handleSuggestionClick = (suggestion: AutocompleteOption) => {
    if (suggestion.type === 'completion') {
      const words = value.split(' ');
      const lastWord = words[words.length - 1];
      if (suggestion.text.startsWith(lastWord)) {
        words[words.length - 1] = suggestion.text;
      } else {
        words.push(suggestion.text);
      }
      onChange(words.join(' '));
    } else {
      onChange(suggestion.text);
    }
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type: AutocompleteOption['type']) => {
    switch (type) {
      case 'recent': return <Clock className="w-3 h-3" />;
      case 'template': return <Command className="w-3 h-3" />;
      case 'legal_term': return <Star className="w-3 h-3" />;
      case 'completion': return <Search className="w-3 h-3" />;
      default: return <Search className="w-3 h-3" />;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length > 1 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className={className}
        />
        
        {withVoiceRecognition && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 ${
              isListening ? 'text-red-500' : 'text-gray-400'
            }`}
            onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
        )}
      </div>
      
      {showSuggestions && (
        <Card 
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto bg-white border shadow-lg"
        >
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                  index === selectedIndex 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {getSuggestionIcon(suggestion.type)}
                <span className="flex-1">{suggestion.text}</span>
                {suggestion.category && (
                  <Badge variant="outline" className="text-xs">
                    {suggestion.category}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
