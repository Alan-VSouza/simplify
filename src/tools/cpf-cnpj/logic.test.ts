import { describe, expect, it } from 'vitest';
import { generateCnpj, generateCpf, isValidCnpj, isValidCpf, maskCnpj, maskCpf } from './logic';

describe('CPF', () => {
  it('generates a CPF that passes its own validator', () => {
    for (let i = 0; i < 20; i++) {
      expect(isValidCpf(generateCpf())).toBe(true);
    }
  });

  it('formats the generated CPF with dots and a dash', () => {
    expect(generateCpf()).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
  });

  it('can generate an unformatted CPF', () => {
    expect(generateCpf(false)).toMatch(/^\d{11}$/);
  });

  it('rejects a CPF with an invalid check digit', () => {
    expect(isValidCpf('111.111.111-12')).toBe(false);
  });

  it('rejects a CPF with all repeated digits', () => {
    expect(isValidCpf('111.111.111-11')).toBe(false);
  });

  it('rejects a CPF with the wrong length', () => {
    expect(isValidCpf('123')).toBe(false);
  });

  it('masks raw digits as ###.###.###-##', () => {
    expect(maskCpf('11144477735')).toBe('111.444.777-35');
  });
});

describe('CNPJ', () => {
  it('generates a CNPJ that passes its own validator', () => {
    for (let i = 0; i < 20; i++) {
      expect(isValidCnpj(generateCnpj())).toBe(true);
    }
  });

  it('formats the generated CNPJ as ##.###.###/####-##', () => {
    expect(generateCnpj()).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
  });

  it('rejects a CNPJ with all repeated digits', () => {
    expect(isValidCnpj('11.111.111/1111-11')).toBe(false);
  });

  it('rejects a CNPJ with the wrong length', () => {
    expect(isValidCnpj('123')).toBe(false);
  });

  it('masks raw digits as ##.###.###/####-##', () => {
    expect(maskCnpj('11222333000181')).toBe('11.222.333/0001-81');
  });
});
