
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type Theme = 'dark' | 'light';

export function useThemeMode() {
  const { toast } = useToast();
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme exists in localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = window.localStorage.getItem('theme') as Theme;
      return savedTheme || 'light';
    }
    return 'light';
  });

  // Apply theme when it changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode enabled`,
      description: `The application theme has been changed to ${newTheme} mode.`,
    });
  };

  return { theme, setTheme, toggleTheme };
}
