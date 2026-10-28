import { useMemo, useState } from 'react';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import { Card } from '../../components/ui/Card';
import { convertUnit, UNITS, type UnitCategory } from './logic';
import styles from './UnitConverterTool.module.css';

const CATEGORY_LABEL: Record<UnitCategory, string> = {
  length: 'Comprimento',
  mass: 'Massa',
  volume: 'Volume',
  temperature: 'Temperatura',
};

export default function UnitConverterTool() {
  useDocumentHead(
    'Conversor de Unidades',
    'Converta valores entre unidades de comprimento, massa, volume e temperatura.',
  );

  const [category, setCategory] = useState<UnitCategory>('length');
  const units = UNITS[category];

  const [from, setFrom] = useState(units[0].id);
  const [to, setTo] = useState(units[1].id);
  const [value, setValue] = useState('1');

  const result = useMemo(() => {
    const numeric = parseFloat(value.replace(',', '.'));
    if (Number.isNaN(numeric)) return null;
    return convertUnit(numeric, from, to, category);
  }, [value, from, to, category]);

  const handleCategoryChange = (next: UnitCategory) => {
    setCategory(next);
    setFrom(UNITS[next][0].id);
    setTo(UNITS[next][1].id);
  };

  return (
    <div className="container">
      <h1>Conversor de Unidades</h1>

      <Card className={styles.card}>
        <div className={styles.field}>
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value as UnitCategory)}
          >
            {Object.entries(CATEGORY_LABEL).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="value">Valor</label>
            <input
              id="value"
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="from">De</label>
            <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="to">Para</label>
            <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <output className={styles.result}>
          {result === null ? 'Digite um valor numérico válido.' : result.toLocaleString('pt-BR', {
            maximumFractionDigits: 6,
          })}
        </output>
      </Card>
    </div>
  );
}
