"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 
                 hover:bg-gray-200 dark:hover:bg-slate-600
                 border border-gray-200 dark:border-slate-600
                 transition-all duration-300 ease-in-out
                 focus:outline-none focus:ring-2 focus:ring-azure-500 focus:ring-offset-2
                 dark:focus:ring-offset-slate-900
                 group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun
          className={`absolute inset-0 w-5 h-5 text-amber-500 
                     transform transition-all duration-300 ease-in-out
                     ${theme === 'light' 
                       ? 'rotate-0 scale-100 opacity-100' 
                       : 'rotate-90 scale-0 opacity-0'}`}
        />
        {/* Moon Icon */}
        <Moon
          className={`absolute inset-0 w-5 h-5 text-azure-400 
                     transform transition-all duration-300 ease-in-out
                     ${theme === 'dark' 
                       ? 'rotate-0 scale-100 opacity-100' 
                       : '-rotate-90 scale-0 opacity-0'}`}
        />
      </div>
    </button>
  );
}
