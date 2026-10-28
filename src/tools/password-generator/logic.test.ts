import { describe, expect, it } from 'vitest';
import { buildCharset, generatePassword, getPasswordStrength } from './logic';

describe('buildCharset', () => {
  it('combines only the selected character sets', () => {
    const charset = buildCharset({
      uppercase: true,
      lowercase: false,
      numbers: true,
      symbols: false,
    });
    expect(charset).toMatch(/^[A-Z0-9]+$/);
  });

  it('returns an empty string when nothing is selected', () => {
    expect(
      buildCharset({ uppercase: false, lowercase: false, numbers: false, symbols: false }),
    ).toBe('');
  });
});

describe('generatePassword', () => {
  it('generates a password of the requested length', () => {
    const password = generatePassword({
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    });
    expect(password).toHaveLength(16);
  });

  it('only uses characters from the selected sets', () => {
    const password = generatePassword({
      length: 50,
      uppercase: false,
      lowercase: true,
      numbers: true,
      symbols: false,
    });
    expect(password).toMatch(/^[a-z0-9]+$/);
  });

  it('throws when no character set is selected', () => {
    expect(() =>
      generatePassword({
        length: 10,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
      }),
    ).toThrow();
  });
});

describe('getPasswordStrength', () => {
  it('rates an empty password as weak', () => {
    expect(getPasswordStrength('')).toBe('weak');
  });

  it('rates a short, simple password as weak', () => {
    expect(getPasswordStrength('abc')).toBe('weak');
  });

  it('rates a long password with mixed character types as very strong', () => {
    expect(getPasswordStrength('Abcdefgh123!@#')).toBe('very-strong');
  });
});
