import { describe, expect, it } from 'vitest';
import {
  annualToMonthlyRate,
  calculateCompoundInterest,
  calculatePriceTable,
  calculateSacTable,
} from './logic';

describe('calculateCompoundInterest', () => {
  it('starts at the principal with zero interest', () => {
    const [first] = calculateCompoundInterest({
      principal: 1000,
      monthlyContribution: 0,
      monthlyRate: 0.01,
      months: 12,
    });
    expect(first).toEqual({ month: 0, balance: 1000, contributed: 1000, interest: 0 });
  });

  it('compounds balance month over month', () => {
    const points = calculateCompoundInterest({
      principal: 1000,
      monthlyContribution: 100,
      monthlyRate: 0.01,
      months: 2,
    });
    expect(points).toHaveLength(3);
    expect(points[1].balance).toBeCloseTo(1110, 2);
    expect(points[2].balance).toBeCloseTo(1221.1, 2);
  });
});

describe('calculatePriceTable', () => {
  it('keeps the installment constant across all months', () => {
    const rows = calculatePriceTable(10000, 0.02, 12);
    const installments = new Set(rows.map((r) => Math.round(r.installment * 100)));
    expect(installments.size).toBe(1);
  });

  it('pays off the full balance by the last installment', () => {
    const rows = calculatePriceTable(10000, 0.02, 12);
    expect(rows[rows.length - 1].balance).toBeCloseTo(0, 2);
  });

  it('falls back to a flat split when the rate is zero', () => {
    const rows = calculatePriceTable(1200, 0, 12);
    expect(rows[0].installment).toBeCloseTo(100, 5);
  });
});

describe('calculateSacTable', () => {
  it('keeps the amortization constant across all months', () => {
    const rows = calculateSacTable(12000, 0.02, 12);
    expect(rows.every((r) => Math.abs(r.amortization - 1000) < 0.01)).toBe(true);
  });

  it('decreases the installment value over time', () => {
    const rows = calculateSacTable(12000, 0.02, 12);
    expect(rows[0].installment).toBeGreaterThan(rows[rows.length - 1].installment);
  });
});

describe('annualToMonthlyRate', () => {
  it('converts a 12% annual rate to the equivalent monthly rate', () => {
    expect(annualToMonthlyRate(12)).toBeCloseTo(0.00949, 4);
  });
});
