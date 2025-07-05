
import { AILegalAssistant } from './AILegalAssistant';

interface AISearchSectionProps {
  language?: string;
}

export function AISearchSection({ language = "fr" }: AISearchSectionProps) {
  return <AILegalAssistant />;
}
