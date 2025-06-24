"use client";

import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("theme-default")}>
          Predeterminado
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("theme-forest")}>
          Bosque
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("theme-ocean")}>
          Océano
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("theme-sunset")}>
          Atardecer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("theme-desert")}>
          Desierto
        </DropdownMenuItem>
         <DropdownMenuItem onClick={() => setTheme("theme-mountain")}>
          Montaña
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
