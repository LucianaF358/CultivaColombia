import Image from 'next/image';
import type { Crop } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from './FavoriteButton';
import { Mountain, Thermometer, Calendar } from 'lucide-react';
import Link from 'next/link';

interface CropCardProps {
  crop: Crop;
  isFavorite: boolean;
}

export function CropCard({ crop, isFavorite }: CropCardProps) {
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
            <FavoriteButton cropId={crop.id} isFavorite={isFavorite} />
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
