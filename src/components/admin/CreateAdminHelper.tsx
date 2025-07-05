import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CreateAdminHelper() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createAdmin = async () => {
    if (!email.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un email",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simuler la création d'admin pour les tests
    setTimeout(() => {
      toast({
        title: "Succès",
        description: `L'utilisateur ${email} a été promu administrateur`,
      });
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Créer un administrateur
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            <strong>Comptes de test disponibles :</strong><br/>
            • admin@test.com (mot de passe: admin123)<br/>
            • juriste@test.com (mot de passe: juriste123)<br/>
            • citoyen@test.com (mot de passe: citoyen123)
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Email de l'utilisateur à promouvoir</label>
          <Input
            type="email"
            placeholder="exemple@domaine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={createAdmin}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Création...' : 'Créer administrateur'}
        </Button>
      </CardContent>
    </Card>
  );
}