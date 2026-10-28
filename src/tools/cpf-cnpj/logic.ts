function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function randomDigit(): number {
  return crypto.getRandomValues(new Uint8Array(1))[0] % 10;
}

function calculateCpfCheckDigit(digits: number[]): number {
  let sum = 0;
  let weight = digits.length + 1;
  for (const digit of digits) {
    sum += digit * weight;
    weight--;
  }
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function generateCpf(formatted = true): string {
  const base = Array.from({ length: 9 }, randomDigit);
  const firstCheck = calculateCpfCheckDigit(base);
  const secondCheck = calculateCpfCheckDigit([...base, firstCheck]);
  const digits = [...base, firstCheck, secondCheck].join('');
  return formatted ? maskCpf(digits) : digits;
}

export function isValidCpf(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  const numbers = digits.split('').map(Number);
  const base = numbers.slice(0, 9);
  const firstCheck = calculateCpfCheckDigit(base);
  const secondCheck = calculateCpfCheckDigit([...base, firstCheck]);

  return numbers[9] === firstCheck && numbers[10] === secondCheck;
}

export function maskCpf(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

const CNPJ_FIRST_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const CNPJ_SECOND_WEIGHTS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

function calculateCnpjCheckDigit(digits: number[], weights: number[]): number {
  const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function generateCnpj(formatted = true): string {
  const base = Array.from({ length: 12 }, randomDigit);
  const firstCheck = calculateCnpjCheckDigit(base, CNPJ_FIRST_WEIGHTS);
  const secondCheck = calculateCnpjCheckDigit([...base, firstCheck], CNPJ_SECOND_WEIGHTS);
  const digits = [...base, firstCheck, secondCheck].join('');
  return formatted ? maskCnpj(digits) : digits;
}

export function isValidCnpj(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) return false;

  const numbers = digits.split('').map(Number);
  const base = numbers.slice(0, 12);
  const firstCheck = calculateCnpjCheckDigit(base, CNPJ_FIRST_WEIGHTS);
  const secondCheck = calculateCnpjCheckDigit([...base, firstCheck], CNPJ_SECOND_WEIGHTS);

  return numbers[12] === firstCheck && numbers[13] === secondCheck;
}

export function maskCnpj(value: string): string {
  const digits = onlyDigits(value).slice(0, 14);
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}
