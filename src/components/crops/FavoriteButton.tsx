
"use client";

import { useTransition } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { toggleFavorite } from '@/lib/firebase/firestore';
import Link from 'next/link';
import { ToastAction } from '../ui/toast';

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
        action: <ToastAction altText="Iniciar sesión" onClick={() => router.push('/login')}>Iniciar sesión</ToastAction>
      });
      return;
    }

    startTransition(async () => {
      try {
        await toggleFavorite(user.uid, cropId, !isFavorite);
        if (!isFavorite) {
            toast({
                title: 'Añadido a Mis Favoritos',
                description: 'El cultivo ha sido añadido a tu lista.',
                action: <ToastAction altText="Ir a favoritos" onClick={() => router.push('/favorites')}>Ir a favoritos</ToastAction>
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
