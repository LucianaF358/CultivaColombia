
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
  sidebarMenuButtonVariants,
  useSidebar
} from '@/components/ui/sidebar';
import { UserCircle, Heart, LogIn, LogOut, Loader2, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase/config';

export function SidebarUserMenu() {
  const { user, loading } = useAuth();
  const { isMobile, state } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const auth = getAuth(app);
      await signOut(auth);
      await logout();
      router.push('/');
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
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Link
                                  href={item.href}
                                  data-active={pathname === item.href}
                                  className={cn(
                                      sidebarMenuButtonVariants({ size: "default" }),
                                      "group-data-[collapsible=icon]:justify-center"
                                  )}
                              >
                                  <item.icon />
                                  <span>{item.label}</span>
                              </Link>
                          </TooltipTrigger>
                          <TooltipContent
                              side="right"
                              align="center"
                              hidden={state !== "collapsed" || isMobile}
                              className="bg-primary text-primary-foreground"
                          >
                            {item.label}
                          </TooltipContent>
                      </Tooltip>
                    </SidebarMenuItem>
                 ))}
                  <SidebarMenuItem>
                      <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                                onClick={handleLogout}
                                disabled={isPending}
                                className="group-data-[collapsible=icon]:justify-center w-full"
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
                                <span>Cerrar Sesión</span>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent
                                side="right"
                                align="center"
                                hidden={state !== "collapsed" || isMobile}
                                className="bg-primary text-primary-foreground"
                          >
                            Cerrar Sesión
                          </TooltipContent>
                      </Tooltip>
                  </SidebarMenuItem>
               </>
             ) : (
                <>
                    {loggedOutLinks.map((item) => (
                        <SidebarMenuItem key={item.href}>
                             <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link
                                      href={item.href}
                                      data-active={pathname === item.href}
                                      className={cn(
                                          sidebarMenuButtonVariants({ size: "default" }),
                                          "group-data-[collapsible=icon]:justify-center"
                                      )}
                                  >
                                      <item.icon />
                                      <span>{item.label}</span>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    align="center"
                                    hidden={state !== "collapsed" || isMobile}
                                    className="bg-primary text-primary-foreground"
                                >
                                  {item.label}
                                </TooltipContent>
                            </Tooltip>
                        </SidebarMenuItem>
                    ))}
                </>
             )}
        </SidebarMenu>
    </SidebarFooter>
  );
}
