
"use client";

import { useState, useEffect, useTransition, useMemo } from 'react';
import type { Crop } from '@/types';
import { CropCard } from './CropCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/db';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface CropsViewProps {
  initialCrops: Crop[];
  regions: string[];
  climates: string[];
  types: string[];
}

export function CropsView({ initialCrops, regions, climates, types }: CropsViewProps) {
  const [filters, setFilters] = useState({
    region: 'all',
    climate: 'all',
    type: 'all',
  });
  const [sortBy, setSortBy] = useState('default');
  const [favoriteCropIds, setFavoriteCropIds] = useState<Set<string>>(new Set());
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();

  // Listener for favorite changes
  useEffect(() => {
    if (!user) {
      setFavoriteCropIds(new Set());
      return;
    }

    const favsRef = collection(db, 'usuarios', user.uid, 'cultivosFavoritos');
    const unsubscribe = onSnapshot(favsRef, (snapshot) => {
      const newFavoriteIds = new Set(snapshot.docs.map(doc => doc.id));
      setFavoriteCropIds(newFavoriteIds);
    }, (error) => {
      console.error("Error listening to favorite crops:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // Derived state for displayed crops based on filters
  const displayedCrops = useMemo(() => {
    const filtered = initialCrops.filter(crop => {
      const regionMatch = filters.region === 'all' || crop.region === filters.region;
      const climateMatch = filters.climate === 'all' || crop.clima === filters.climate;
      const typeMatch = filters.type === 'all' || crop.tipo === filters.type;
      return regionMatch && climateMatch && typeMatch;
    });

    if (sortBy === 'az') {
      return filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    if (sortBy === 'za') {
      return filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
    
    return filtered;

  }, [filters, sortBy, initialCrops]);

  const handleFilterChange = (filterName: keyof typeof filters) => (value: string) => {
    startTransition(() => {
      setFilters(prev => ({ ...prev, [filterName]: value }));
    });
  };

  const handleSortChange = (value: string) => {
    startTransition(() => {
      setSortBy(value);
    });
  };

  const handleClearFilters = () => {
    startTransition(() => {
      setFilters({
        region: 'all',
        climate: 'all',
        type: 'all',
      });
      setSortBy('default');
    });
  };

  const areFiltersActive = useMemo(() => {
    return filters.region !== 'all' || filters.climate !== 'all' || filters.type !== 'all' || sortBy !== 'default';
  }, [filters, sortBy]);

  return (
    <section>
      <div className="mb-8 p-6 bg-card rounded-lg shadow-sm flex flex-col md:flex-row flex-wrap gap-4 items-center">
        <h2 className="text-xl font-semibold text-card-foreground flex-shrink-0">Filtrar y Ordenar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-auto flex-grow">
          <div>
            <Label htmlFor="region-filter" className="text-sm font-medium text-muted-foreground">Región</Label>
            <Select value={filters.region} onValueChange={handleFilterChange('region')}>
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
            <Select value={filters.climate} onValueChange={handleFilterChange('climate')}>
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
            <Select value={filters.type} onValueChange={handleFilterChange('type')}>
              <SelectTrigger id="type-filter" className="w-full mt-1">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-filter" className="text-sm font-medium text-muted-foreground">Ordenar por</Label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger id="sort-filter" className="w-full mt-1">
                <SelectValue placeholder="Ordenar..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Por defecto</SelectItem>
                <SelectItem value="az">Nombre (A-Z)</SelectItem>
                <SelectItem value="za">Nombre (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {areFiltersActive && (
          <div className="pt-2 md:pt-0 md:pl-2">
            <Button variant="ghost" onClick={handleClearFilters}>
              <X className="mr-2 h-4 w-4" />
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>

      {isPending ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
               <CardSkeleton key={i} />
            ))}
        </div>
      ) : displayedCrops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCrops.map(crop => (
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

function CardSkeleton() {
    return (
        <div className="space-y-4 p-4 border rounded-lg bg-card">
            <Skeleton className="h-48 w-full" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="flex gap-2 pt-4">
                 <Skeleton className="h-6 w-24" />
                 <Skeleton className="h-6 w-24" />
            </div>
        </div>
    )
}
