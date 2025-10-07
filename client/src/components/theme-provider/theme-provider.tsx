import { useEffect, useState } from "react";
import { StorageKey } from "../../constants/storage-keys";
import { ThemeContext } from "../../hooks/use-theme";
import { TTheme, TThemeProviderProps } from "../../types/components-types";

function ThemeProvider({ children }: TThemeProviderProps) {
  const [theme, setTheme] = useState<TTheme>(() => {
    const savedTheme = localStorage.getItem(StorageKey.Theme) as TTheme;
    if (savedTheme) return savedTheme;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    localStorage.setItem(StorageKey.Theme, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
