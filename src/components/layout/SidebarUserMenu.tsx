
"use client";

import * as React from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/actions';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { UserCircle, Heart, LogIn, LogOut, Loader2, UserPlus } from 'lucide-react';
import Link from 'next/link';

export function SidebarUserMenu() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  const loggedInLinks = [
    { href: "/profile", label: "Mi Perfil", icon: UserCircle },
    { href: "/favorites", label: "Mis Favoritos", icon: Heart },
  ];

  const loggedOutLinks = [
      { href: "/login", label: "Iniciar Sesión", icon: LogIn },
      { href: "/signup", label: "Registrarse", icon: UserPlus },
  ]

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
                        <Link href={item.href} passHref legacyBehavior>
                            <SidebarMenuButton
                                as="a"
                                isActive={pathname.startsWith(item.href)}
                                className="group-data-[collapsible=icon]:justify-center"
                                tooltip={{
                                    children: item.label,
                                    className: "bg-primary text-primary-foreground",
                                }}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                 ))}
                  <SidebarMenuItem>
                      <SidebarMenuButton
                            onClick={handleLogout}
                            disabled={isPending}
                            className="group-data-[collapsible=icon]:justify-center"
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
                    {loggedOutLinks.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href} passHref legacyBehavior>
                                <SidebarMenuButton
                                    as="a"
                                    isActive={pathname.startsWith(item.href)}
                                    className="group-data-[collapsible=icon]:justify-center"
                                    tooltip={{
                                        children: item.label,
                                        className: "bg-primary text-primary-foreground",
                                    }}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </>
             )}
        </SidebarMenu>
    </SidebarFooter>
  );
}
