
"use client";

import Link from 'next/link';
import { useAuth } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { logout } from '@/lib/actions';
import { LogOut, UserCircle, Heart } from 'lucide-react';
import { useTransition } from 'react';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { useSidebar } from '../ui/sidebar';

export function Header() {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-20">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-7 w-7 text-2xl"
            onClick={toggleSidebar}
        >
            ≡
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.email?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Mi Cuenta</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Mi Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/favorites">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Mis Cultivos</span>
                    </Link>
                  </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={isPending}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button asChild>
              <Link href="/login">
                Iniciar Sesión
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
