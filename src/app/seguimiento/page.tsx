
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ClipboardList, PlusCircle, Leaf, Thermometer, Siren } from 'lucide-react';
import { collection, onSnapshot, type Unsubscribe, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/db';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import type { TrackedPlant } from '@/types';


export default function SeguimientoPage() {
  const { user, loading: authLoading } = useAuth();
  const [trackedPlants, setTrackedPlants] = useState<TrackedPlant[]>([]);
  const [loadingPlants, setLoadingPlants] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    let unsubscribe: Unsubscribe = () => {};

    if (user) {
      setLoadingPlants(true);
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

  const { plantsInCare, plantsInGermination } = useMemo(() => {
    const plantsInCare = trackedPlants.filter(p => !p.isGermination);
    const plantsInGermination = trackedPlants.filter(p => p.isGermination);
    return { plantsInCare, plantsInGermination };
  }, [trackedPlants]);


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
        <p className="text-muted-foreground mt-2">Aquí están los diagnósticos y cultivos que has guardado para monitorear.</p>
      </header>
      
      <Tabs defaultValue="care" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="care" className="py-2 flex items-center gap-2"><Siren className="h-4 w-4"/> Plantas en Cuidado ({plantsInCare.length})</TabsTrigger>
          <TabsTrigger value="germination" className="py-2 flex items-center gap-2"><Thermometer className="h-4 w-4"/> Cultivos en Germinación ({plantsInGermination.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="care">
          {plantsInCare.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plantsInCare.map(plant => <TrackedPlantCard key={plant.id} plant={plant} />)}
            </div>
          ) : (
            <EmptyState 
              icon={PlusCircle}
              title="No tienes plantas en cuidado"
              description="Usa la herramienta de diagnóstico con IA y guarda los resultados para verlos aquí."
              buttonLink="/diagnostico"
              buttonText="Hacer un Diagnóstico"
            />
          )}
        </TabsContent>
        <TabsContent value="germination">
            {plantsInGermination.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plantsInGermination.map(plant => <TrackedPlantCard key={plant.id} plant={plant} />)}
            </div>
          ) : (
            <EmptyState 
              icon={Leaf}
              title="No tienes cultivos en germinación"
              description="Explora los cultivos y presiona 'Empezar a Sembrar' para añadirlos aquí."
              buttonLink="/"
              buttonText="Explorar Cultivos"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TrackedPlantCard({ plant }: { plant: TrackedPlant }) {
  const photoUrl = plant.photoDataUri || plant.imageUrl;
  return (
      <Link href={`/seguimiento/${plant.id}`} className="group block h-full">
        <Card className="flex flex-col h-full overflow-hidden group-hover:shadow-xl transition-shadow duration-300 bg-card">
            <CardHeader className="p-0">
                <div className="relative w-full h-48">
                    {photoUrl ? (
                         <Image
                            src={photoUrl}
                            alt={`Imagen de ${plant.plantName || 'planta en seguimiento'}`}
                            fill
                            className="object-cover rounded-t-lg"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Leaf className="w-16 h-16 text-muted-foreground/50"/>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
                <CardTitle>{plant.plantName || "Planta no identificada"}</CardTitle>
                <CardDescription className="mt-2 line-clamp-2">
                    {plant.isGermination 
                        ? `Añadido para seguimiento de germinación y crecimiento.` 
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
      </Link>
  )
}

function EmptyState({ icon: Icon, title, description, buttonLink, buttonText }: { icon: React.ElementType, title: string, description: string, buttonLink: string, buttonText: string }) {
    return (
        <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center">
          <Icon className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold text-card-foreground">{title}</h2>
          <p className="text-muted-foreground mt-2 mb-4 max-w-md">
            {description}
          </p>
          <Button asChild>
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        </div>
    )
}

function SeguimientoSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
       <header className="mb-8">
        <Skeleton className="h-10 w-3/4 md:w-1/2" />
        <Skeleton className="h-4 w-1/2 md:w-1/3 mt-4" />
      </header>
       <div className="space-y-8">
        <div className="flex gap-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
            ))}
        </div>
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
