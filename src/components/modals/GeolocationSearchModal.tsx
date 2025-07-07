
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Search, Navigation } from 'lucide-react';

interface GeolocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  location?: any;
  onLocationSelect: (location: any) => void;
}

export function GeolocationSearchModal({ isOpen, onClose, location, onLocationSelect }: GeolocationSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isLocating, setIsLocating] = useState(false);

  const getCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setCurrentLocation(coords);
          setIsLocating(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsLocating(false);
        }
      );
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onLocationSelect({ query: searchQuery, type: 'search' });
    }
  };

  const handleCurrentLocation = () => {
    if (currentLocation) {
      onLocationSelect({ ...currentLocation, type: 'current' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Recherche par géolocalisation
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recherche par adresse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="location-search">Adresse ou lieu</Label>
                <Input
                  id="location-search"
                  placeholder="Ville, wilaya, adresse..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="w-full" disabled={!searchQuery.trim()}>
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Position actuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={getCurrentLocation} 
                variant="outline" 
                className="w-full"
                disabled={isLocating}
              >
                <Navigation className="w-4 h-4 mr-2" />
                {isLocating ? 'Localisation...' : 'Utiliser ma position'}
              </Button>
              
              {currentLocation && (
                <div className="text-sm text-gray-600">
                  <p>Position détectée :</p>
                  <p>Lat: {currentLocation.latitude.toFixed(6)}</p>
                  <p>Lng: {currentLocation.longitude.toFixed(6)}</p>
                  <Button onClick={handleCurrentLocation} size="sm" className="mt-2 w-full">
                    Utiliser cette position
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
