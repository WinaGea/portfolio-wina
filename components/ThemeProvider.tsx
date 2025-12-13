"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  /* ---------------------------------------------
     ⬇⬇⬇ INI TEMPAT KODE YANG KAMU TANYAKAN ⬇⬇⬇
  ---------------------------------------------- */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme") as Theme | null;
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      // kalau belum pernah pilih sendiri -> ikut sistem
      const initial: Theme = stored ?? (prefersDark ? "dark" : "light");

      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    } catch {
      // abaikan error
    }
  }, []);
  /* ---------------------------------------------
     ⬆⬆⬆ BATAS KODE YANG KAMU TANYAKAN ⬆⬆⬆
  ---------------------------------------------- */

  // update html.dark ketika user toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggleButton() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;

  const { theme, toggleTheme } = ctx;

  return (
    <button
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-50 rounded-full border border-slate-300/70 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm backdrop-blur hover:bg-slate-100 dark:border-slate-600/70 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      {theme === "dark" ? "☀ Light mode" : "🌙 Dark mode"}
    </button>
  );
}
