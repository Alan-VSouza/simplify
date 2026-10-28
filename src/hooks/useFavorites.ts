import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>('simplify:favorites', []);

  const isFavorite = useCallback((toolId: string) => favorites.includes(toolId), [favorites]);

  const toggleFavorite = useCallback(
    (toolId: string) => {
      setFavorites((current) =>
        current.includes(toolId)
          ? current.filter((id) => id !== toolId)
          : [...current, toolId],
      );
    },
    [setFavorites],
  );

  return { favorites, isFavorite, toggleFavorite };
}
