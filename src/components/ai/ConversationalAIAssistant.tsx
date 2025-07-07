
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Bot, User, Mic, MicOff, FileText, Lightbulb } from 'lucide-react';
import { SmartAutocomplete } from '@/components/common/SmartAutocomplete';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    sources?: string[];
    suggestions?: string[];
  };
}

export function ConversationalAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulation de réponse IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date(),
        metadata: {
          confidence: 0.92,
          sources: ['Code civil', 'Jurisprudence CE 2023'],
          suggestions: [
            'Voulez-vous en savoir plus sur les exceptions ?',
            'Consulter la jurisprudence récente ?',
            'Voir des cas similaires ?'
          ]
        }
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    if (question.toLowerCase().includes('contrat')) {
      return "Concernant les contrats, selon l'article 1101 du Code civil, \"Le contrat est un accord de volontés entre deux ou plusieurs personnes destiné à créer, modifier, transmettre ou éteindre des obligations.\" Les éléments essentiels sont le consentement, la capacité, et un objet certain et licite.";
    }
    if (question.toLowerCase().includes('responsabilité')) {
      return "La responsabilité civile est régie par les articles 1240 et suivants du Code civil. Elle peut être contractuelle ou délictuelle. Pour engager la responsabilité, il faut prouver trois éléments : un fait générateur (faute, fait des choses, fait d'autrui), un dommage, et un lien de causalité.";
    }
    return "Je comprends votre question juridique. Basé sur l'analyse des textes en vigueur et de la jurisprudence récente, voici les éléments pertinents à considérer...";
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.start();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-600" />
            Assistant IA Juridique
            <Badge variant="secondary" className="ml-2">Version Beta</Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Posez vos questions juridiques en langage naturel
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Commencez une conversation</h3>
                <p className="text-gray-600 mb-4">
                  Exemples de questions :
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput("Quelles sont les conditions de validité d'un contrat ?")}
                  >
                    Validité des contrats
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput("Comment engager la responsabilité civile ?")}
                  >
                    Responsabilité civile
                  </Button>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'ai' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                    {message.type === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.metadata && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-xs opacity-75">
                            <span>Confiance: {Math.round(message.metadata.confidence! * 100)}%</span>
                            {message.metadata.sources && (
                              <span>Sources: {message.metadata.sources.join(', ')}</span>
                            )}
                          </div>
                          {message.metadata.suggestions && (
                            <div className="space-y-1">
                              {message.metadata.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-left justify-start text-xs bg-white hover:bg-gray-50"
                                  onClick={() => setInput(suggestion)}
                                >
                                  <Lightbulb className="w-3 h-3 mr-2" />
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">L'IA analyse votre question...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <SmartAutocomplete
              value={input}
              onChange={setInput}
              placeholder="Posez votre question juridique..."
              context="legal"
              className="flex-1"
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={startVoiceRecognition}
              disabled={isListening}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 animate-pulse text-red-500" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
            <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
