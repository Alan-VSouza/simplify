export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

export function buildCharset(options: Omit<PasswordOptions, 'length'>): string {
  let charset = '';
  if (options.uppercase) charset += CHARSETS.uppercase;
  if (options.lowercase) charset += CHARSETS.lowercase;
  if (options.numbers) charset += CHARSETS.numbers;
  if (options.symbols) charset += CHARSETS.symbols;
  return charset;
}

/**
 * Generates a password using the Web Crypto API (crypto.getRandomValues),
 * which is a cryptographically secure source of randomness, unlike Math.random.
 */
export function generatePassword(options: PasswordOptions): string {
  const charset = buildCharset(options);
  if (!charset) {
    throw new Error('Selecione ao menos um tipo de caractere.');
  }

  const randomValues = new Uint32Array(options.length);
  crypto.getRandomValues(randomValues);

  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += charset[randomValues[i] % charset.length];
  }
  return password;
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 'weak';

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return 'weak';
  if (score <= 3) return 'medium';
  if (score <= 5) return 'strong';
  return 'very-strong';
}
