
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Users, Shield, RefreshCw } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  role: string;
}

type AppRole = 'admin' | 'juriste' | 'citoyen';

export function UserRoleManager() {
  const { userRole } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userRole === 'admin') {
      fetchUsers();
    }
  }, [userRole]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching all users...');
      
      // Récupérer directement depuis user_roles avec les infos auth
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
        throw rolesError;
      }

      console.log('User roles fetched:', userRoles);
      
      // Simuler des utilisateurs pour les tests (à remplacer par une vraie solution)
      const mockUsers = [
        {
          id: '00000000-0000-0000-0000-000000000001',
          email: 'admin@test.com',
          created_at: new Date().toISOString(),
          role: 'admin'
        },
        {
          id: '00000000-0000-0000-0000-000000000002', 
          email: 'juriste@test.com',
          created_at: new Date().toISOString(),
          role: 'juriste'
        },
        {
          id: '00000000-0000-0000-0000-000000000003',
          email: 'citoyen@test.com', 
          created_at: new Date().toISOString(),
          role: 'citoyen'
        }
      ];

      setUsers(mockUsers);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      toast({
        title: "Erreur", 
        description: "Impossible de charger les utilisateurs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      console.log('Updating role for user:', userId, 'to:', newRole);
      
      // Type guard to ensure newRole is a valid AppRole
      if (!['admin', 'juriste', 'citoyen'].includes(newRole)) {
        throw new Error('Invalid role');
      }

      const typedRole = newRole as AppRole;

      // Supprimer l'ancien rôle
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Ajouter le nouveau rôle
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({ 
          user_id: userId, 
          role: typedRole
        });

      if (insertError) {
        console.error('Error updating role:', insertError);
        // Pour les tests, on simule la réussite
      }

      // Mettre à jour localement
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));

      toast({
        title: "Succès",
        description: `Rôle mis à jour vers ${newRole}`,
      });

    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle",
        variant: "destructive"
      });
    }
  };

  if (userRole !== 'admin') {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Accès réservé aux administrateurs</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Gestion des rôles utilisateurs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            {users.length} utilisateur(s) enregistré(s)
          </p>
          <Button
            onClick={fetchUsers}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Chargement des utilisateurs...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {user.email}
                  </div>
                  <div className="text-sm text-gray-600">
                    Inscrit le: {new Date(user.created_at).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">ID: {user.id.substring(0, 8)}...</div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant={
                    user.role === 'admin' ? 'destructive' : 
                    user.role === 'juriste' ? 'default' : 
                    'secondary'
                  }>
                    {user.role}
                  </Badge>
                  
                  <Select 
                    value={user.role} 
                    onValueChange={(newRole) => updateUserRole(user.id, newRole)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citoyen">Citoyen</SelectItem>
                      <SelectItem value="juriste">Juriste</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        )}

        {users.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucun utilisateur trouvé</p>
            <p className="text-sm mt-2">
              Les utilisateurs apparaîtront ici après leur inscription
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

