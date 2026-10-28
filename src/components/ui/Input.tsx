import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function Input({ label, hint, id, className = '', ...rest }: InputProps) {
  const inputId = id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, '-');
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={`${styles.input} ${className}`}
        aria-describedby={hintId}
        {...rest}
      />
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
    </div>
  );
}
