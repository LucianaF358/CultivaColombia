
"use client";

import * as React from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/actions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { UserCircle, Heart, LogIn, LogOut, Loader2, Home } from 'lucide-react';
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
       <SidebarMenuItem>
        <SidebarMenuButton
            disabled
            className="group-data-[collapsible=icon]:justify-center"
            tooltip={{ children: "Cargando..." }}
        >
            <Loader2 className="animate-spin" />
            <span>Cargando...</span>
        </SidebarMenuButton>
       </SidebarMenuItem>
    )
  }

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue={user ? (loggedInLinks.some(link => pathname.startsWith(link.href)) ? 'user-menu' : undefined) : (pathname.startsWith('/login') ? 'user-menu' : undefined)}>
      <AccordionItem value="user-menu" className="border-none">
         <SidebarMenuItem>
            <AccordionTrigger className="w-full hover:no-underline [&[data-state=open]>svg]:hidden">
               <SidebarMenuButton
                  asChild={false}
                  className="w-full group-data-[collapsible=icon]:justify-center"
                  tooltip={{
                     children: "Cuenta",
                     className: "bg-primary text-primary-foreground",
                  }}
               >
                     <UserCircle />
                     <span>Cuenta</span>
               </SidebarMenuButton>
            </AccordionTrigger>
         </SidebarMenuItem>
        <AccordionContent className="pb-0 group-data-[collapsible=icon]:hidden">
          <div className="pl-8 pr-2 space-y-1">
             {user ? (
               <>
                 {loggedInLinks.map((item) => (
                    <SidebarMenuButton
                        key={item.href}
                        asChild
                        isActive={pathname.startsWith(item.href)}
                        size="sm"
                        className="w-full justify-start"
                    >
                        <Link href={item.href}>
                           <item.icon />
                           <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                 ))}
                  <SidebarMenuButton
                        onClick={handleLogout}
                        disabled={isPending}
                        size="sm"
                        className="w-full justify-start"
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : <LogOut />}
                        <span>Cerrar Sesión</span>
                  </SidebarMenuButton>
               </>
             ) : (
               <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/login')}
                  size="sm"
                  className="w-full justify-start"
               >
                  <Link href="/login">
                     <LogIn />
                     <span>Iniciar Sesión</span>
                  </Link>
               </SidebarMenuButton>
             )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
