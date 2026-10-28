export interface CompoundInterestInput {
  principal: number;
  monthlyContribution: number;
  monthlyRate: number;
  months: number;
}

export interface CompoundInterestPoint {
  month: number;
  balance: number;
  contributed: number;
  interest: number;
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestPoint[] {
  const points: CompoundInterestPoint[] = [];
  let balance = input.principal;
  let contributed = input.principal;

  points.push({ month: 0, balance, contributed, interest: 0 });

  for (let month = 1; month <= input.months; month++) {
    balance = balance * (1 + input.monthlyRate) + input.monthlyContribution;
    contributed += input.monthlyContribution;
    points.push({ month, balance, contributed, interest: balance - contributed });
  }

  return points;
}

export interface FinancingInstallment {
  month: number;
  installment: number;
  interest: number;
  amortization: number;
  balance: number;
}

/** French amortization system: fixed installments, interest share decreases over time. */
export function calculatePriceTable(
  principal: number,
  monthlyRate: number,
  months: number,
): FinancingInstallment[] {
  const installment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  const rows: FinancingInstallment[] = [];
  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    const amortization = installment - interest;
    balance -= amortization;
    rows.push({ month, installment, interest, amortization, balance: Math.max(balance, 0) });
  }

  return rows;
}

/** Constant amortization system: fixed principal share, installments decrease over time. */
export function calculateSacTable(
  principal: number,
  monthlyRate: number,
  months: number,
): FinancingInstallment[] {
  const amortization = principal / months;
  const rows: FinancingInstallment[] = [];
  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    balance -= amortization;
    rows.push({
      month,
      installment: amortization + interest,
      interest,
      amortization,
      balance: Math.max(balance, 0),
    });
  }

  return rows;
}

export function annualToMonthlyRate(annualRatePercent: number): number {
  return Math.pow(1 + annualRatePercent / 100, 1 / 12) - 1;
}
