import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme | null>('simplify:theme', null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
  }, [theme]);

  const resolvedTheme: Theme =
    theme ??
    (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return { theme: resolvedTheme, toggleTheme };
}
