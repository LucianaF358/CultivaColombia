"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Crop } from '@/types';
import { CropCard } from './CropCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/firebase/auth';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase/config';

interface CropsViewProps {
  initialCrops: Crop[];
  regions: string[];
  climates: string[];
}

export function CropsView({ initialCrops, regions, climates }: CropsViewProps) {
  const [regionFilter, setRegionFilter] = useState('all');
  const [climateFilter, setClimateFilter] = useState('all');
  const [favoriteCropIds, setFavoriteCropIds] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const db = getFirestore(app);
      const favsRef = collection(db, 'usuarios', user.uid, 'cultivosFavoritos');
      
      const unsubscribe = onSnapshot(favsRef, (snapshot) => {
        const newFavoriteIds = new Set<string>();
        snapshot.forEach((doc) => {
          newFavoriteIds.add(doc.id);
        });
        setFavoriteCropIds(newFavoriteIds);
      });

      return () => unsubscribe();
    } else {
      setFavoriteCropIds(new Set());
    }
  }, [user]);

  const filteredCrops = useMemo(() => {
    return initialCrops.filter(crop => {
      const regionMatch = regionFilter === 'all' || crop.region === regionFilter;
      const climateMatch = climateFilter === 'all' || crop.clima === climateFilter;
      return regionMatch && climateMatch;
    });
  }, [initialCrops, regionFilter, climateFilter]);

  return (
    <section>
      <div className="mb-8 p-6 bg-card rounded-lg shadow-sm flex flex-col md:flex-row gap-6 items-center">
        <h2 className="text-xl font-semibold text-card-foreground flex-shrink-0">Filtrar Cultivos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto flex-grow">
          <div>
            <Label htmlFor="region-filter" className="text-sm font-medium text-muted-foreground">Región</Label>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger id="region-filter" className="w-full mt-1">
                <SelectValue placeholder="Selecciona una región" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las regiones</SelectItem>
                {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="climate-filter" className="text-sm font-medium text-muted-foreground">Clima</Label>
            <Select value={climateFilter} onValueChange={setClimateFilter}>
              <SelectTrigger id="climate-filter" className="w-full mt-1">
                <SelectValue placeholder="Selecciona un clima" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los climas</SelectItem>
                {climates.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredCrops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCrops.map(crop => (
            <CropCard 
              key={crop.id} 
              crop={crop} 
              isFavorite={favoriteCropIds.has(crop.id)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground text-lg">No se encontraron cultivos con los filtros seleccionados.</p>
        </div>
      )}
    </section>
  );
}
