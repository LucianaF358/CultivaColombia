
"use client";

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      await toggleFavorite(user.uid, cropId, !isFavorite);
      
      // The onSnapshot listener in CropsView will handle the UI update automatically.
      // We can still show a toast for better user feedback.
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
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full bg-background/80 hover:bg-background backdrop-blur-sm"
      onClick={handleFavorite}
      disabled={isLoading}
      aria-label="Marcar como favorito"
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <Heart className={cn(
          "h-6 w-6 transition-all",
          isFavorite ? 'text-accent fill-accent' : 'text-muted-foreground'
        )} />
      )}
    </Button>
  );
}
