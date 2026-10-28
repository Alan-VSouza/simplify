import { useEffect, useMemo, useState } from 'react';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AsyncState } from '../../components/ui/AsyncState';
import { CURRENCIES, convertCurrency, fetchRates, type RatesTable } from './logic';
import styles from './CurrencyConverterTool.module.css';

export default function CurrencyConverterTool() {
  useDocumentHead(
    'Conversor de Moedas',
    'Converta valores entre moedas usando taxas de câmbio públicas e atualizadas, sem chave de API.',
  );

  const [rates, setRates] = useState<RatesTable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('BRL');
  const [amount, setAmount] = useState('100');

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchRates()
      .then((data) => {
        if (active) {
          setRates(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Erro ao buscar taxas.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const result = useMemo(() => {
    if (!rates) return null;
    const numeric = parseFloat(amount.replace(',', '.'));
    if (Number.isNaN(numeric)) return null;
    return convertCurrency(numeric, from, to, rates);
  }, [rates, amount, from, to]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="container">
      <h1>Conversor de Moedas</h1>

      <Card className={styles.card}>
        <AsyncState loading={loading} error={error}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="amount">Valor</label>
              <input
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="decimal"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="from">De</label>
              <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={handleSwap}
              aria-label="Inverter moedas"
              title="Inverter moedas"
            >
              ⇄
            </Button>

            <div className={styles.field}>
              <label htmlFor="to">Para</label>
              <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <output className={styles.result}>
            {result === null
              ? 'Digite um valor válido.'
              : `${amount} ${from} = ${result.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} ${to}`}
          </output>
        </AsyncState>
      </Card>
    </div>
  );
}
