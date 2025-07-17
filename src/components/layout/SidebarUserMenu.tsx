
"use client";

import * as React from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/actions';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { UserCircle, Heart, LogIn, LogOut, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function SidebarUserMenu() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
      router.push('/');
    });
  };

  const loggedInLinks = [
    { href: "/profile", label: "Mi Perfil", icon: UserCircle },
    { href: "/favorites", label: "Mis Cultivos", icon: Heart },
  ];

  if (loading) {
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        disabled
                        className="group-data-[collapsible=icon]:justify-center"
                        tooltip={{ children: "Cargando..." }}
                    >
                        <Loader2 className="animate-spin" />
                        <span className="group-data-[collapsible=icon]:hidden">Cargando...</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
  }

  return (
    <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
             {user ? (
               <>
                 {loggedInLinks.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname.startsWith(item.href)}
                            className="w-full justify-start group-data-[collapsible=icon]:justify-center"
                             tooltip={{
                                children: item.label,
                                className: "bg-primary text-primary-foreground",
                            }}
                        >
                            <Link href={item.href}>
                               <item.icon />
                               <span>{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 ))}
                  <SidebarMenuItem>
                      <SidebarMenuButton
                            onClick={handleLogout}
                            disabled={isPending}
                            className="w-full justify-start group-data-[collapsible=icon]:justify-center"
                            tooltip={{
                                children: "Cerrar Sesión",
                                className: "bg-primary text-primary-foreground",
                            }}
                        >
                            {isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
                            <span>Cerrar Sesión</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
               </>
             ) : (
                <>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname.startsWith('/login')}
                            className="w-full justify-start group-data-[collapsible=icon]:justify-center"
                             tooltip={{
                                children: "Iniciar Sesión",
                                className: "bg-primary text-primary-foreground",
                            }}
                        >
                            <Link href="/login">
                                <LogIn />
                                <span>Iniciar Sesión</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname.startsWith('/signup')}
                            className="w-full justify-start group-data-[collapsible=icon]:justify-center"
                            tooltip={{
                                children: "Registrarse",
                                className: "bg-primary text-primary-foreground",
                            }}
                        >
                            <Link href="/signup">
                                <UserCircle />
                                <span>Registrarse</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </>
             )}
        </SidebarMenu>
    </SidebarFooter>
  );
}
