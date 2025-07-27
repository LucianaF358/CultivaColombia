
"use client";

import { Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  isFavorite: boolean;
  isLoading: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function FavoriteButton({ isFavorite, isLoading, onClick }: FavoriteButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full bg-background/80 hover:bg-background backdrop-blur-sm"
      onClick={onClick}
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
