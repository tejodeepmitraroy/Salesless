import { useThemeMode } from "@/hooks/useThemeMode";
import { createContext, useContext, } from "react";
import { Toaster } from "./ui/sonner";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: "dark" | "light" | "system";
  storageKey?: string;
};

type ThemeContextType = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  // defaultTheme ="system",
  // storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const { theme, toggleTheme } = useThemeMode();

  return (
		<ThemeContext.Provider value={{ theme, toggleTheme }} {...props}>
			<Toaster />
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
