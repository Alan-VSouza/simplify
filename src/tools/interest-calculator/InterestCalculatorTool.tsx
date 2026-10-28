import { useMemo, useState } from 'react';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import { Card } from '../../components/ui/Card';
import { LineChart } from '../../components/ui/LineChart';
import {
  annualToMonthlyRate,
  calculateCompoundInterest,
  calculatePriceTable,
  calculateSacTable,
} from './logic';
import styles from './InterestCalculatorTool.module.css';

const currency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function InterestCalculatorTool() {
  useDocumentHead(
    'Calculadora de Juros Compostos e Financiamento',
    'Simule investimentos com juros compostos e financiamentos pelas tabelas Price e SAC.',
  );

  const [mode, setMode] = useState<'investment' | 'financing'>('investment');

  return (
    <div className="container">
      <h1>Juros Compostos e Financiamento</h1>

      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={mode === 'investment'}
          className={mode === 'investment' ? styles.tabActive : styles.tab}
          onClick={() => setMode('investment')}
        >
          Investimento
        </button>
        <button
          role="tab"
          aria-selected={mode === 'financing'}
          className={mode === 'financing' ? styles.tabActive : styles.tab}
          onClick={() => setMode('financing')}
        >
          Financiamento
        </button>
      </div>

      {mode === 'investment' ? <InvestmentPanel /> : <FinancingPanel />}
    </div>
  );
}

function InvestmentPanel() {
  const [principal, setPrincipal] = useState('1000');
  const [contribution, setContribution] = useState('200');
  const [annualRate, setAnnualRate] = useState('10');
  const [months, setMonths] = useState('24');

  const points = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const c = parseFloat(contribution) || 0;
    const rate = annualToMonthlyRate(parseFloat(annualRate) || 0);
    const m = Math.max(1, Math.min(600, parseInt(months, 10) || 0));
    return calculateCompoundInterest({ principal: p, monthlyContribution: c, monthlyRate: rate, months: m });
  }, [principal, contribution, annualRate, months]);

  const last = points[points.length - 1];

  return (
    <Card className={styles.card}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="principal">Valor inicial (R$)</label>
          <input id="principal" value={principal} onChange={(e) => setPrincipal(e.target.value)} inputMode="decimal" />
        </div>
        <div className={styles.field}>
          <label htmlFor="contribution">Aporte mensal (R$)</label>
          <input id="contribution" value={contribution} onChange={(e) => setContribution(e.target.value)} inputMode="decimal" />
        </div>
        <div className={styles.field}>
          <label htmlFor="rate">Taxa de juros anual (%)</label>
          <input id="rate" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} inputMode="decimal" />
        </div>
        <div className={styles.field}>
          <label htmlFor="months">Período (meses)</label>
          <input id="months" value={months} onChange={(e) => setMonths(e.target.value)} inputMode="numeric" />
        </div>
      </div>

      <dl className={styles.summary}>
        <div>
          <dt>Total investido</dt>
          <dd>{currency(last.contributed)}</dd>
        </div>
        <div>
          <dt>Juros acumulados</dt>
          <dd>{currency(last.interest)}</dd>
        </div>
        <div>
          <dt>Saldo final</dt>
          <dd>{currency(last.balance)}</dd>
        </div>
      </dl>

      <LineChart
        ariaLabel="Evolução do saldo e do valor investido ao longo do tempo"
        series={[
          { label: 'Saldo', color: 'var(--accent)', values: points.map((p) => p.balance) },
          { label: 'Investido', color: 'var(--earth-brown)', values: points.map((p) => p.contributed) },
        ]}
      />
    </Card>
  );
}

function FinancingPanel() {
  const [system, setSystem] = useState<'price' | 'sac'>('price');
  const [principal, setPrincipal] = useState('100000');
  const [annualRate, setAnnualRate] = useState('10');
  const [months, setMonths] = useState('60');

  const rows = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const rate = annualToMonthlyRate(parseFloat(annualRate) || 0);
    const m = Math.max(1, Math.min(420, parseInt(months, 10) || 0));
    return system === 'price' ? calculatePriceTable(p, rate, m) : calculateSacTable(p, rate, m);
  }, [system, principal, annualRate, months]);

  const totalPaid = rows.reduce((sum, row) => sum + row.installment, 0);

  return (
    <Card className={styles.card}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="system">Sistema de amortização</label>
          <select id="system" value={system} onChange={(e) => setSystem(e.target.value as 'price' | 'sac')}>
            <option value="price">Price (parcelas fixas)</option>
            <option value="sac">SAC (amortização constante)</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="financing-principal">Valor financiado (R$)</label>
          <input id="financing-principal" value={principal} onChange={(e) => setPrincipal(e.target.value)} inputMode="decimal" />
        </div>
        <div className={styles.field}>
          <label htmlFor="financing-rate">Taxa de juros anual (%)</label>
          <input id="financing-rate" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} inputMode="decimal" />
        </div>
        <div className={styles.field}>
          <label htmlFor="financing-months">Prazo (meses)</label>
          <input id="financing-months" value={months} onChange={(e) => setMonths(e.target.value)} inputMode="numeric" />
        </div>
      </div>

      <dl className={styles.summary}>
        <div>
          <dt>1ª parcela</dt>
          <dd>{currency(rows[0]?.installment ?? 0)}</dd>
        </div>
        <div>
          <dt>Última parcela</dt>
          <dd>{currency(rows[rows.length - 1]?.installment ?? 0)}</dd>
        </div>
        <div>
          <dt>Total pago</dt>
          <dd>{currency(totalPaid)}</dd>
        </div>
      </dl>

      <LineChart
        ariaLabel="Evolução do valor das parcelas e do saldo devedor ao longo do tempo"
        series={[
          { label: 'Parcela', color: 'var(--accent)', values: rows.map((r) => r.installment) },
          { label: 'Saldo devedor', color: 'var(--earth-brown)', values: rows.map((r) => r.balance) },
        ]}
      />

      <div className={styles.tableWrapper}>
        <table>
          <caption className="visually-hidden">Tabela de amortização mês a mês</caption>
          <thead>
            <tr>
              <th scope="col">Mês</th>
              <th scope="col">Parcela</th>
              <th scope="col">Juros</th>
              <th scope="col">Amortização</th>
              <th scope="col">Saldo devedor</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.month}>
                <td>{row.month}</td>
                <td>{currency(row.installment)}</td>
                <td>{currency(row.interest)}</td>
                <td>{currency(row.amortization)}</td>
                <td>{currency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
