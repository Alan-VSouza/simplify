import { afterEach, describe, expect, it, vi } from 'vitest';
import { convertCurrency, fetchRates } from './logic';

describe('convertCurrency', () => {
  const rates = { USD: 1, BRL: 5, EUR: 0.9 };

  it('converts using the cross rate between two currencies', () => {
    expect(convertCurrency(10, 'USD', 'BRL', rates)).toBeCloseTo(50);
    expect(convertCurrency(100, 'BRL', 'EUR', rates)).toBeCloseTo(18);
  });

  it('returns the same amount when converting a currency to itself', () => {
    expect(convertCurrency(42, 'USD', 'USD', rates)).toBeCloseTo(42);
  });

  it('returns null when a currency is missing from the rates table', () => {
    expect(convertCurrency(10, 'USD', 'XYZ', rates)).toBeNull();
  });
});

describe('fetchRates', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('builds a flat rates table from the Frankfurter v2 response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          { date: '2026-01-01', base: 'USD', quote: 'BRL', rate: 5 },
          { date: '2026-01-01', base: 'USD', quote: 'USD', rate: 1 },
        ],
      }),
    );
    const rates = await fetchRates();
    expect(rates).toEqual({ BRL: 5, USD: 1 });
  });

  it('throws a friendly error when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    await expect(fetchRates()).rejects.toThrow('Não foi possível obter as taxas');
  });
});
