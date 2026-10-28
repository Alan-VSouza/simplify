import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchAddressByCep, isValidCep, maskCep, sanitizeCep } from './logic';

describe('sanitizeCep', () => {
  it('strips non-digit characters and caps at 8 digits', () => {
    expect(sanitizeCep('01310-100')).toBe('01310100');
    expect(sanitizeCep('0131010099')).toBe('01310100');
  });
});

describe('isValidCep', () => {
  it('accepts exactly 8 digits', () => {
    expect(isValidCep('01310100')).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isValidCep('123')).toBe(false);
    expect(isValidCep('')).toBe(false);
  });
});

describe('maskCep', () => {
  it('inserts a hyphen after the 5th digit once there are enough digits', () => {
    expect(maskCep('01310100')).toBe('01310-100');
    expect(maskCep('0131')).toBe('0131');
  });
});

describe('fetchAddressByCep', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('rejects an invalid CEP before calling the network', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    await expect(fetchAddressByCep('123')).rejects.toThrow('CEP inválido');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('maps a successful ViaCEP response to an Address', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          cep: '01310-100',
          logradouro: 'Avenida Paulista',
          bairro: 'Bela Vista',
          localidade: 'São Paulo',
          uf: 'SP',
        }),
      }),
    );

    const address = await fetchAddressByCep('01310100');
    expect(address).toEqual({
      cep: '01310-100',
      street: 'Avenida Paulista',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
    });
  });

  it('throws when ViaCEP reports the CEP does not exist', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ erro: true }) }),
    );
    await expect(fetchAddressByCep('00000000')).rejects.toThrow('não encontrado');
  });

  it('throws a friendly error when the network request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    await expect(fetchAddressByCep('01310100')).rejects.toThrow('Não foi possível consultar');
  });
});
