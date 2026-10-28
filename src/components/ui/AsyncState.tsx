import type { ReactNode } from 'react';
import styles from './AsyncState.module.css';

interface AsyncStateProps {
  loading: boolean;
  error: string | null;
  empty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
}

/**
 * Standard loading/error/empty wrapper so every network-backed tool
 * (ViaCEP, currency rates, ...) surfaces failures the same way.
 */
export function AsyncState({
  loading,
  error,
  empty = false,
  emptyMessage = 'Nenhum resultado encontrado.',
  children,
}: AsyncStateProps) {
  if (loading) {
    return (
      <p className={styles.status} role="status">
        Carregando...
      </p>
    );
  }

  if (error) {
    return (
      <p className={styles.error} role="alert">
        {error}
      </p>
    );
  }

  if (empty) {
    return <p className={styles.status}>{emptyMessage}</p>;
  }

  return <>{children}</>;
}
