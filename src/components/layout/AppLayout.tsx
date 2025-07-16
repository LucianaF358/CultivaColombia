
"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { CultivaColombiaIcon } from "@/components/icons";
import { usePathname } from "next/navigation";
import { Home, Leaf, Map, Heart, Book, UserCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "./Header";

const menuItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/favorites", label: "Mis Cultivos", icon: Heart },
  { href: "/diagnostico", label: "Detección con IA", icon: Leaf },
  { href: "/mapa", label: "Mapa Interactivo", icon: Map },
  { href: "/recursos", label: "Recursos", icon: Book },
  { href: "/profile", label: "Mi Perfil", icon: UserCircle },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="offcanvas">
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold font-headline text-primary hover:text-primary/80 transition-colors">
            <CultivaColombiaIcon className="h-6 w-6" />
            <span>CultivaColombia</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
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
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-grow">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
