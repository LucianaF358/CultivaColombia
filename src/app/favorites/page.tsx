
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { getCrops } from '@/lib/data';
import type { Crop } from '@/types';
import { CropCard } from '@/components/crops/CropCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { getFirestore, collection, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { app } from '@/lib/firebase/config';

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const [favoriteCrops, setFavoriteCrops] = useState<Crop[]>([]);
  const [loadingCrops, setLoadingCrops] = useState(true);

  useEffect(() => {
    let unsubscribe: Unsubscribe = () => {};

    if (user) {
      setLoadingCrops(true);
      const db = getFirestore(app);
      const favsRef = collection(db, 'usuarios', user.uid, 'cultivosFavoritos');

      unsubscribe = onSnapshot(favsRef, async (snapshot) => {
        const favoriteIds = snapshot.docs.map(doc => doc.id);
        const allCrops = await getCrops();
        const crops = allCrops.filter(crop => favoriteIds.includes(crop.id));
        setFavoriteCrops(crops);
        setLoadingCrops(false);
      }, (error) => {
        console.error("Error fetching favorite crops:", error);
        setLoadingCrops(false);
      });

    } else if (!authLoading) {
      setFavoriteCrops([]);
      setLoadingCrops(false);
    }

    return () => unsubscribe();
  }, [user, authLoading]);

  // While auth is loading, or if the user is logged in but we are still fetching their crops
  if (authLoading || (user && loadingCrops)) {
    return <FavoritesSkeleton />;
  }

  // After loading, if there's no user, show a prompt to log in
  if (!user) {
      return (
          <div className="container mx-auto px-4 py-8">
              <header className="mb-8">
                  <h1 className="text-4xl font-bold font-headline text-primary">Mis Favoritos</h1>
                   <p className="text-muted-foreground mt-2">Inicia sesión para ver tus cultivos guardados.</p>
              </header>
              <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center">
                  <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h2 className="text-2xl font-semibold text-card-foreground">Inicia sesión para ver tus favoritos</h2>
                  <p className="text-muted-foreground mt-2 mb-4 max-w-md">
                      Una vez que inicies sesión, podrás ver aquí los cultivos que has guardado.
                  </p>
                  <Button asChild>
                      <Link href="/login">Iniciar Sesión</Link>
                  </Button>
              </div>
          </div>
      );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">Mis Favoritos</h1>
        <p className="text-muted-foreground mt-2">Tu lista personal de cultivos guardados para consultar cuando quieras.</p>
      </header>
      
      {favoriteCrops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteCrops.map(crop => (
            <CropCard key={crop.id} crop={crop} isFavorite={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center">
          <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold text-card-foreground">Aún no tienes favoritos</h2>
          <p className="text-muted-foreground mt-2 mb-4 max-w-md">
            Explora los cultivos y haz clic en el icono del corazón (
            <Heart className="inline-block h-4 w-4 text-accent fill-accent" />
            ) para añadirlos a esta lista.
          </p>
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
