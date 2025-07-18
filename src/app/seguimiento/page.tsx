
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ClipboardList, PlusCircle } from 'lucide-react';
import { getFirestore, collection, onSnapshot, type Unsubscribe, query, orderBy, type Timestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase/config';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface TrackedPlant {
    id: string;
    photoDataUri: string;
    plantName?: string;
    diagnosis?: {
        problem?: string;
    };
    isHealthy?: boolean;
    trackedAt: Timestamp | null;
}

export default function SeguimientoPage() {
  const { user, loading: authLoading } = useAuth();
  const [trackedPlants, setTrackedPlants] = useState<TrackedPlant[]>([]);
  const [loadingPlants, setLoadingPlants] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    let unsubscribe: Unsubscribe = () => {};

    if (user) {
      setLoadingPlants(true);
      const db = getFirestore(app);
      const plantsRef = collection(db, 'usuarios', user.uid, 'plantasSeguimiento');
      const q = query(plantsRef, orderBy('trackedAt', 'desc'));

      unsubscribe = onSnapshot(q, (snapshot) => {
        const plants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TrackedPlant));
        setTrackedPlants(plants);
        setLoadingPlants(false);
      }, (error) => {
        console.error("Error fetching tracked plants:", error);
        setLoadingPlants(false);
      });

    } else {
      setTrackedPlants([]);
      setLoadingPlants(false);
    }

    return () => unsubscribe();
  }, [user, authLoading]);

  if (authLoading || loadingPlants) {
    return <SeguimientoSkeleton />;
  }

  if (!user) {
      return (
          <div className="container mx-auto px-4 py-8">
              <header className="mb-8">
                  <h1 className="text-4xl font-bold font-headline text-primary">Seguimiento de Plantas</h1>
                   <p className="text-muted-foreground mt-2">Inicia sesión para ver las plantas que has guardado.</p>
              </header>
              <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center">
                  <ClipboardList className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h2 className="text-2xl font-semibold text-card-foreground">Inicia sesión para ver tu seguimiento</h2>
                  <p className="text-muted-foreground mt-2 mb-4 max-w-md">
                      Una vez que inicies sesión, podrás ver aquí los diagnósticos que has guardado.
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
        <h1 className="text-4xl font-bold font-headline text-primary">Seguimiento de Plantas</h1>
        <p className="text-muted-foreground mt-2">Aquí están los diagnósticos que has guardado para monitorear.</p>
      </header>
      
      {trackedPlants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trackedPlants.map(plant => (
            <Card key={plant.id}>
                <CardHeader className="p-0">
                    <div className="relative w-full h-48">
                        <Image
                            src={plant.photoDataUri}
                            alt={`Imagen de ${plant.plantName || 'planta diagnosticada'}`}
                            fill
                            className="object-cover rounded-t-lg"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <CardTitle>{plant.plantName || "Planta no identificada"}</CardTitle>
                    <CardDescription className="mt-2">
                        {plant.isHealthy 
                            ? "La planta parece estar sana." 
                            : `Problema: ${plant.diagnosis?.problem || "No especificado"}`
                        }
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    {plant.trackedAt && (
                        <p className="text-sm text-muted-foreground">
                            Guardado {formatDistanceToNow(plant.trackedAt.toDate(), { addSuffix: true, locale: es })}
                        </p>
                    )}
                </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center">
          <PlusCircle className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold text-card-foreground">Aún no tienes plantas en seguimiento</h2>
          <p className="text-muted-foreground mt-2 mb-4 max-w-md">
            Usa la herramienta de diagnóstico con IA y guarda los resultados para hacerles seguimiento aquí.
          </p>
          <Button asChild>
            <Link href="/diagnostico">Hacer un Diagnóstico</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function SeguimientoSkeleton() {
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
            <div className="space-y-2 p-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
            </div>
             <div className="p-2 pt-0">
                 <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    )
}
