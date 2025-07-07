
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProcedureForm } from "@/components/ProcedureForm";

interface ProcedureFormViewProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export function ProcedureFormView({ onBack, onSubmit }: ProcedureFormViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="gap-2 text-emerald-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
      </div>
      <ProcedureForm 
        onClose={onBack} 
        onSubmit={onSubmit}
      />
    </div>
  );
}
