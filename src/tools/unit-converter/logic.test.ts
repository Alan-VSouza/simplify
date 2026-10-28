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

  it('converts digital storage units', () => {
    expect(convertUnit(1, 'gb', 'mb', 'digital')).toBeCloseTo(1024);
    expect(convertUnit(1024, 'kb', 'mb', 'digital')).toBeCloseTo(1);
    expect(convertUnit(1, 'tb', 'gb', 'digital')).toBeCloseTo(1024);
  });

  it('converts speed units', () => {
    expect(convertUnit(1, 'kmh', 'mps', 'speed')).toBeCloseTo(0.277778, 5);
    expect(convertUnit(1, 'mps', 'kmh', 'speed')).toBeCloseTo(3.6);
    expect(convertUnit(1, 'knot', 'mps', 'speed')).toBeCloseTo(0.514444, 5);
  });
});
