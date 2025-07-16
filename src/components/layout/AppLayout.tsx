
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
  useSidebar,
} from "@/components/ui/sidebar";
import { CultivaColombiaIcon } from "@/components/icons";
import { usePathname } from "next/navigation";
import { Home, Leaf, Map, Heart, Book, UserCircle, PanelLeft } from "lucide-react";
import Link from "next/link";
import { Header } from "./Header";
import { Button } from "../ui/button";

const menuItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/favorites", label: "Mis Cultivos", icon: Heart },
  { href: "/diagnostico", label: "Detección con IA", icon: Leaf },
  { href: "/mapa", label: "Mapa Interactivo", icon: Map },
  { href: "/recursos", label: "Recursos", icon: Book },
  { href: "/profile", label: "Mi Perfil", icon: UserCircle },
];

function SidebarWrapper({ children }: { children: React.ReactNode }) {
    const { toggleSidebar } = useSidebar();
    const pathname = usePathname();

    return (
        <Sidebar side="left" collapsible="icon" className="z-40">
        <SidebarHeader className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold font-headline text-primary hover:text-primary/80 transition-colors">
            <CultivaColombiaIcon className="h-6 w-6" />
            <span className="group-data-[collapsible=icon]:hidden">CultivaColombia</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 group-data-[collapsible=icon]:hidden"
            onClick={toggleSidebar}
          >
            <PanelLeft />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
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
        {children}
      </Sidebar>
    )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <SidebarWrapper>
            <SidebarInset>
                <Header />
                <main className="flex-grow">{children}</main>
            </SidebarInset>
        </SidebarWrapper>
    </SidebarProvider>
  );
}
