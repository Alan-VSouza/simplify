import { describe, expect, it } from 'vitest';
import { convertUnit } from './logic';

describe('convertUnit', () => {
  it('returns the same value when units match', () => {
    expect(convertUnit(10, 'm', 'm', 'length')).toBe(10);
  });

  it('converts length units', () => {
    expect(convertUnit(1, 'km', 'm', 'length')).toBeCloseTo(1000);
    expect(convertUnit(100, 'cm', 'm', 'length')).toBeCloseTo(1);
  });

  it('converts mass units', () => {
    expect(convertUnit(1, 'kg', 'g', 'mass')).toBeCloseTo(1000);
    expect(convertUnit(1, 'lb', 'kg', 'mass')).toBeCloseTo(0.453592, 5);
  });

  it('converts volume units', () => {
    expect(convertUnit(1, 'l', 'ml', 'volume')).toBeCloseTo(1000);
  });

  it('converts temperature units', () => {
    expect(convertUnit(0, 'c', 'f', 'temperature')).toBeCloseTo(32);
    expect(convertUnit(100, 'c', 'f', 'temperature')).toBeCloseTo(212);
    expect(convertUnit(0, 'c', 'k', 'temperature')).toBeCloseTo(273.15);
  });
});
