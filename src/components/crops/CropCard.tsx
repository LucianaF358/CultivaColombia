
"use client";

import Image from 'next/image';
import type { Crop } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from './FavoriteButton';
import { Mountain, Thermometer, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { toggleFavorite } from '@/lib/firebase/firestore';


interface CropCardProps {
  crop: Crop;
  isFavorite: boolean;
}

export function CropCard({ crop, isFavorite }: CropCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: 'Inicia sesión para guardar',
        description: 'Debes iniciar sesión para añadir cultivos a tus favoritos.',
        variant: 'destructive',
        action: {
          altText: "Iniciar sesión",
          onClick: () => router.push('/login'),
        },
      });
      return;
    }

    setIsLoading(true);

    try {
      await toggleFavorite(user.uid, crop.id, !isFavorite);
      
      if (!isFavorite) {
        toast({
          title: 'Añadido a Mis Favoritos',
          description: 'El cultivo ha sido añadido a tu lista.',
          action: {
            altText: "Ir a favoritos",
            onClick: () => router.push('/favorites'),
          },
        });
      } else {
        toast({
          title: 'Eliminado de Mis Favoritos',
          description: 'El cultivo ha sido eliminado de tu lista.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : "No se pudo realizar la acción.",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Link href={`/cultivos/${crop.id}`} className="group block h-full">
      <Card className="flex flex-col h-full overflow-hidden group-hover:shadow-xl transition-shadow duration-300 bg-card">
        <div className="relative w-full h-48">
          <Image
            src={crop.imageUrl}
            alt={`Imagen de ${crop.nombre}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={crop.dataAiHint}
          />
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton 
              isFavorite={isFavorite} 
              isLoading={isLoading}
              onClick={handleFavoriteClick} 
            />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">
            {crop.nombre}
          </CardTitle>
          <CardDescription className="line-clamp-2">{crop.descripcionDetallada}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2.5">
               <Mountain className="h-4 w-4 text-muted-foreground" /> {crop.region}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2.5">
               <Thermometer className="h-4 w-4 text-muted-foreground" /> {crop.clima}
            </Badge>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Temporada: {crop.temporada}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
