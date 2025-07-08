import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar localStorage primeiro
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Verificar preferência do sistema
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    
    return "dark";
  });

  useEffect(() => {
    console.log("Theme changed to:", theme);
    
    // Salvar no localStorage
    localStorage.setItem("theme", theme);
    
    // Aplicar tema no documento
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.add("light");
    }
    
    console.log("Applied theme class:", theme, "to document");
  }, [theme]);

  const toggleTheme = () => {
    console.log("toggleTheme called, current theme:", theme);
    setTheme(prev => {
      const newTheme = prev === "dark" ? "light" : "dark";
      console.log("Switching to theme:", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 