"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeCtx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void; };

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme") as Theme | null;
      const initial = saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      setThemeState(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    } catch {}
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    try { localStorage.setItem("theme", t); } catch {}
    document.documentElement.classList.toggle("dark", t === "dark");
  }
  function toggle() { setTheme(theme === "dark" ? "light" : "dark"); }

  return <ThemeContext.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeProvider");
  return ctx;
}