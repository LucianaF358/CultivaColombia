"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { getFavoriteCrops } from '@/lib/firebase/firestore';
import { getCropById, getCrops } from '@/lib/data';
import type { Crop } from '@/types';
import { CropCard } from '@/components/crops/CropCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [favoriteCrops, setFavoriteCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function fetchFavorites() {
      if (user) {
        setLoading(true);
        const favoriteIds = await getFavoriteCrops(user.uid);
        const allCrops = await getCrops();
        const crops = allCrops.filter(crop => favoriteIds.some(fav => fav.id === crop.id));
        setFavoriteCrops(crops);
        setLoading(false);
      }
    }
    fetchFavorites();
  }, [user]);

  if (authLoading || loading) {
    return <FavoritesSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">Mis Cultivos Favoritos</h1>
        <p className="text-muted-foreground mt-2">Tu lista personal de cultivos para consultar cuando quieras.</p>
      </header>
      
      {favoriteCrops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteCrops.map(crop => (
            <CropCard key={crop.id} crop={crop} isFavorite={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold text-card-foreground">No tienes cultivos favoritos</h2>
          <p className="text-muted-foreground mt-2 mb-4">Explora los cultivos y marca los que te interesen.</p>
          <Button asChild>
            <Link href="/">Explorar Cultivos</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function FavoritesSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
       <header className="mb-8">
        <Skeleton className="h-10 w-3/4 md:w-1/2" />
        <Skeleton className="h-4 w-1/2 md:w-1/3 mt-4" />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function CardSkeleton() {
    return (
        <div className="space-y-4 p-4 border rounded-lg">
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
