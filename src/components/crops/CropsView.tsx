
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Crop } from '@/types';
import { CropCard } from './CropCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/firebase/auth';
import { collection, onSnapshot, type Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase/db';

interface CropsViewProps {
  initialCrops: Crop[];
  regions: string[];
  climates: string[];
  types: string[];
}

export function CropsView({ initialCrops, regions, climates, types }: CropsViewProps) {
  const [regionFilter, setRegionFilter] = useState('all');
  const [climateFilter, setClimateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [favoriteCropIds, setFavoriteCropIds] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  useEffect(() => {
    let unsubscribe: Unsubscribe = () => {};
    
    if (user) {
      const favsRef = collection(db, 'usuarios', user.uid, 'cultivosFavoritos');
      
      unsubscribe = onSnapshot(favsRef, (snapshot) => {
        const newFavoriteIds = new Set<string>();
        snapshot.forEach((doc) => {
          newFavoriteIds.add(doc.id);
        });
        setFavoriteCropIds(newFavoriteIds);
      }, (error) => {
        console.error("Error listening to favorite crops:", error);
      });

    } else {
      setFavoriteCropIds(new Set());
    }

    return () => unsubscribe();
  }, [user]);

  const filteredCrops = useMemo(() => {
    return initialCrops.filter(crop => {
      const regionMatch = regionFilter === 'all' || crop.region === regionFilter;
      const climateMatch = climateFilter === 'all' || crop.clima === climateFilter;
      const typeMatch = typeFilter === 'all' || crop.tipo === typeFilter;
      return regionMatch && climateMatch && typeMatch;
    });
  }, [initialCrops, regionFilter, climateFilter, typeFilter]);

  return (
    <section>
      <div className="mb-8 p-6 bg-card rounded-lg shadow-sm flex flex-col md:flex-row flex-wrap gap-6 items-center">
        <h2 className="text-xl font-semibold text-card-foreground flex-shrink-0">Filtrar Cultivos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-auto flex-grow">
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
          <div>
            <Label htmlFor="type-filter" className="text-sm font-medium text-muted-foreground">Tipo de Cultivo</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type-filter" className="w-full mt-1">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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
