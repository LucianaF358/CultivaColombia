
"use client";

import { getCropById } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Sprout, Bug, Calendar, Clock, Sun, Trees, ClipboardPlus, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Crop } from '@/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/firebase/auth';
import { startSowingCrop } from '@/lib/firebase/seguimiento';

function CropDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-6 w-48 mb-6 bg-muted rounded-md" />
        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
            <div className="md:col-span-2">
                <div className="relative w-full aspect-square md:aspect-auto rounded-lg overflow-hidden shadow-lg bg-muted" />
            </div>
            <div className="md:col-span-3 space-y-6">
                <Card>
                    <CardHeader>
                        <div className="h-10 w-3/4 bg-muted rounded-md" />
                        <div className="h-6 w-1/2 bg-muted rounded-md mt-2" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-4 w-full bg-muted rounded-md" />
                        <div className="h-4 w-5/6 bg-muted rounded-md mt-2" />
                        <div className="h-4 w-4/6 bg-muted rounded-md mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                       <div className="h-8 w-1/3 bg-muted rounded-md" />
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-md border">
                                <div className="w-5 h-5 bg-muted rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-2/3 bg-muted rounded-md" />
                                    <div className="h-4 w-full bg-muted rounded-md" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                     <CardFooter>
                        <div className="h-12 w-full bg-muted rounded-md" />
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}


export default function CropDetailPage({ params }: { params: { id: string } }) {
  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchCrop() {
      setLoading(true);
      const fetchedCrop = await getCropById(params.id);
      if (fetchedCrop) {
        setCrop(fetchedCrop);
      }
      setLoading(false);
    }
    fetchCrop();
  }, [params.id]);

  const handleStartSowing = async () => {
    if (!user) {
      toast({
        title: "Inicia sesión para empezar a sembrar",
        description: "Debes iniciar sesión para añadir un cultivo a tu seguimiento.",
        variant: "destructive",
        action: {
          altText: "Iniciar Sesión",
          onClick: () => router.push('/login'),
        }
      });
      return;
    }
    
    if (!crop) return;

    setIsSaving(true);
    try {
      await startSowingCrop(user.uid, crop);
      toast({
        title: "¡Cultivo añadido a seguimiento!",
        description: `${crop.nombre} ha sido añadido a tu lista de germinación.`,
        action: {
          altText: "Ir a Seguimiento",
          onClick: () => router.push('/seguimiento'),
        }
      });
    } catch (error) {
       console.error("Error starting sowing:", error);
       toast({
        title: 'Error al añadir cultivo',
        description: 'No se pudo añadir el cultivo a tu seguimiento. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <CropDetailSkeleton />;
  }

  if (!crop) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        Volver a todos los cultivos
      </Link>
      
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
        <div className="md:col-span-2 relative w-full aspect-square md:aspect-auto rounded-lg overflow-hidden shadow-lg">
          <Image
            src={crop.imageUrl}
            alt={`Imagen de ${crop.nombre}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            data-ai-hint={crop.dataAiHint}
          />
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="bg-card/80">
            <CardHeader>
              <CardTitle className="text-4xl font-bold font-headline text-primary">{crop.nombre}</CardTitle>
              <CardDescription className="text-xl text-muted-foreground italic">{crop.nombreCientifico} ({crop.familia})</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{crop.descripcionDetallada}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ficha Técnica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <InfoItem icon={<Sun className="text-accent"/>} label="Clima" value={crop.clima} />
                <InfoItem icon={<Trees className="text-accent"/>} label="Región" value={crop.region} />
                <InfoItem icon={<Calendar className="text-accent"/>} label="Temporada de siembra" value={crop.temporada} />
                <InfoItem icon={<Sprout className="text-accent"/>} label="Tipo de suelo" value={crop.tipoDeSuelo} />
                <InfoItem icon={<Clock className="text-accent"/>} label="Tiempo de siembra" value={crop.tiempoSiembra} />
                <InfoItem icon={<Clock className="text-accent rotate-180" />} label="Tiempo de cosecha" value={crop.tiempoCosecha} />
                <InfoItem icon={<Bug className="text-accent"/>} label="Plagas comunes" value={crop.plagasComunes} />
              </div>
            </CardContent>
             <CardFooter>
              <Button className="w-full" size="lg" onClick={handleStartSowing} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <ClipboardPlus className="mr-2 h-5 w-5" />
                )}
                {isSaving ? "Añadiendo..." : "Empezar a Sembrar"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-card rounded-md border">
      <div className="flex-shrink-0 w-5 h-5 mt-1">{icon}</div>
      <div>
        <p className="font-semibold text-card-foreground">{label}</p>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}
