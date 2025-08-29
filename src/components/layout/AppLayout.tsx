
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
  sidebarMenuButtonVariants
} from "@/components/ui/sidebar";
import { CultivaColombiaIcon } from "@/components/icons";
import { usePathname } from "next/navigation";
import { Home, Leaf, Map, Book, ClipboardList, BookOpen } from "lucide-react";
import Link from "next/link";
import { Header } from "./Header";
import { Button } from "../ui/button";
import { SidebarUserMenu } from "./SidebarUserMenu";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";


const menuItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/diagnostico", label: "Detección con IA", icon: Leaf },
  { href: "/seguimiento", label: "Seguimiento", icon: ClipboardList },
  { href: "/mapa", label: "Mapa Interactivo", icon: Map },
  { href: "/recursos", label: "Recursos", icon: Book },
  { href: "/glosario", label: "Glosario", icon: BookOpen },
];

function SidebarWrapper({ children }: { children: React.ReactNode }) {
    const { toggleSidebar, isMobile, state, openMobile, setOpenMobile } = useSidebar();
    const pathname = usePathname();
    
    if(isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetContent side="left" className="w-[18rem] bg-card p-0">
               <SheetHeader className="p-2">
                 <SheetTitle className="sr-only">Navegación Principal</SheetTitle>
                 <SheetDescription className="sr-only">Menú principal de la aplicación CultivaColombia.</SheetDescription>
                  <div className="flex w-full items-center justify-between">
                      <Link href="/" className="flex items-center gap-2 text-lg font-bold font-headline text-primary hover:text-primary/80 transition-colors">
                          <CultivaColombiaIcon className="h-6 w-6" />
                          <span>CultivaColombia</span>
                      </Link>
                  </div>
               </SheetHeader>
               <SidebarContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === item.href}
                            onClick={() => setOpenMobile(false)}
                          >
                            <Link href={item.href} >
                                <item.icon />
                                <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarContent>
                <SidebarUserMenu />
            </SheetContent>
        </Sheet>
      )
    }

    return (
        <Sidebar side="left" collapsible="icon" className="z-40">
        <SidebarHeader className="flex flex-col gap-2 p-2">
            <div className="hidden w-full items-center justify-between group-data-[collapsible=icon]:hidden md:flex">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold font-headline text-primary hover:text-primary/80 transition-colors">
                    <CultivaColombiaIcon className="h-6 w-6" />
                    <span>CultivaColombia</span>
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-2xl"
                    onClick={toggleSidebar}
                >
                    ≡
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
            </div>
             <div className="hidden flex-col items-center gap-2 group-data-[collapsible=icon]:flex">
                <Link href="/" className="flex items-center justify-center gap-2 text-lg font-bold font-headline text-primary hover:text-primary/80 transition-colors">
                    <CultivaColombiaIcon className="h-6 w-6" />
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-2xl"
                    onClick={toggleSidebar}
                >
                    ≡
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="group-data-[collapsible=icon]:justify-center"
                    tooltip={{
                        children: item.label,
                        side: "right",
                        align: "center",
                        hidden: state !== "collapsed" || isMobile,
                        className: "bg-primary text-primary-foreground"
                    }}
                  >
                    <Link
                        href={item.href}
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarUserMenu />
      </Sidebar>
    )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <SidebarWrapper>
        </SidebarWrapper>
        <SidebarInset>
            <Header />
            <main className="flex-grow">{children}</main>
        </SidebarInset>
    </SidebarProvider>
  );
}
