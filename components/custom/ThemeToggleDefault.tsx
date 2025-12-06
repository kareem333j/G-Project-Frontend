"use client";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleDefault({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className={cn("border border-bluelight-1/50 rounded-full p-2 backdrop-blur-sm hover:bg-bluelight-1/10 cursor-pointer", className)}
    >
      {theme === "dark" ? <Sun size={30} color="var(--color-bluelight-1)" /> : <Moon size={30} color="var(--color-bluelight-1)" />}
    </div>
  );
}