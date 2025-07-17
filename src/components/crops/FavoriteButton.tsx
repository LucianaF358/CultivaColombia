
"use client";

import { useTransition } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { toggleFavorite } from '@/lib/firebase/firestore';

interface FavoriteButtonProps {
  cropId: string;
  isFavorite: boolean;
}

export function FavoriteButton({ cropId, isFavorite }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: 'Inicia sesión para guardar',
        description: 'Debes iniciar sesión para añadir cultivos a tus favoritos.',
        variant: 'destructive',
        action: <Button onClick={() => router.push('/login')}>Iniciar sesión</Button>
      });
      return;
    }

    startTransition(async () => {
      try {
        await toggleFavorite(user.uid, cropId, !isFavorite);
        toast({
            title: isFavorite ? 'Eliminado de Mis Favoritos' : 'Añadido a Mis Favoritos',
            description: `El cultivo ha sido ${isFavorite ? 'eliminado de' : 'añadido a'} tu lista.`,
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : "No se pudo realizar la acción.",
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full bg-background/80 hover:bg-background backdrop-blur-sm"
      onClick={handleFavorite}
      disabled={isPending}
      aria-label="Marcar como favorito"
    >
      <Heart className={cn(
        "h-6 w-6 transition-all",
        isFavorite ? 'text-accent fill-accent' : 'text-muted-foreground'
      )} />
    </Button>
  );
}
