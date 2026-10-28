export interface CurrencyOption {
  code: string;
  name: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'BRL', name: 'Real Brasileiro' },
  { code: 'USD', name: 'Dólar Americano' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'Libra Esterlina' },
  { code: 'JPY', name: 'Iene Japonês' },
  { code: 'ARS', name: 'Peso Argentino' },
  { code: 'CAD', name: 'Dólar Canadense' },
  { code: 'CHF', name: 'Franco Suíço' },
];

export type RatesTable = Record<string, number>;

const BASE_CURRENCY = 'USD';

interface FrankfurterRate {
  quote: string;
  rate: number;
}

/**
 * Frankfurter (frankfurter.dev) mirrors the European Central Bank's daily
 * reference rates and needs no API key — unlike currencyapi.com, whose key
 * would still end up exposed in this client-side bundle either way.
 */
export async function fetchRates(): Promise<RatesTable> {
  const response = await fetch(`https://api.frankfurter.dev/v2/rates?base=${BASE_CURRENCY}`);
  if (!response.ok) {
    throw new Error('Não foi possível obter as taxas de câmbio agora. Tente novamente.');
  }

  const data = (await response.json()) as FrankfurterRate[];
  const rates: RatesTable = {};
  for (const { quote, rate } of data) {
    rates[quote] = rate;
  }
  return rates;
}

export function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: RatesTable,
): number | null {
  if (rates[from] === undefined || rates[to] === undefined) return null;
  const rate = rates[to] / rates[from];
  return amount * rate;
}
