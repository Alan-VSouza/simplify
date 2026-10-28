import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { generatePassword, getPasswordStrength, type PasswordOptions } from './logic';
import styles from './PasswordGeneratorTool.module.css';

const STRENGTH_LABEL: Record<string, string> = {
  weak: 'Fraca',
  medium: 'Média',
  strong: 'Forte',
  'very-strong': 'Muito forte',
};

const defaultOptions: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

export default function PasswordGeneratorTool() {
  useDocumentHead(
    'Gerador de Senhas Seguras',
    'Gere senhas fortes e aleatórias com a Web Crypto API, com opções de tamanho e tipos de caracteres.',
  );

  const [options, setOptions] = useState<PasswordOptions>(defaultOptions);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const handleGenerate = () => {
    try {
      setPassword(generatePassword(options));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar senha.');
      setPassword('');
    }
  };

  useEffect(() => {
    handleGenerate();
    // Regenerate whenever the options change; `handleGenerate` is stable enough here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    toast.success('Senha copiada!');
  };

  const toggle = (key: keyof Omit<PasswordOptions, 'length'>) =>
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="container">
      <h1>Gerador de Senhas Seguras</h1>

      <Card className={styles.card}>
        <div className={styles.output}>
          <output className={styles.password}>{password || 'Selecione ao menos uma opção'}</output>
          <Button variant="secondary" onClick={handleCopy} disabled={!password}>
            Copiar
          </Button>
        </div>

        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}

        {password && (
          <p className={styles.strength} data-strength={strength}>
            Força: {STRENGTH_LABEL[strength]}
          </p>
        )}

        <div className={styles.field}>
          <label htmlFor="length">Tamanho: {options.length}</label>
          <input
            id="length"
            type="range"
            min={6}
            max={64}
            value={options.length}
            onChange={(e) => setOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          />
        </div>

        <fieldset className={styles.fieldset}>
          <legend>Tipos de caractere</legend>
          <label>
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={() => toggle('uppercase')}
            />
            Letras maiúsculas (A-Z)
          </label>
          <label>
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={() => toggle('lowercase')}
            />
            Letras minúsculas (a-z)
          </label>
          <label>
            <input type="checkbox" checked={options.numbers} onChange={() => toggle('numbers')} />
            Números (0-9)
          </label>
          <label>
            <input type="checkbox" checked={options.symbols} onChange={() => toggle('symbols')} />
            Símbolos (!@#$...)
          </label>
        </fieldset>

        <Button onClick={handleGenerate}>Gerar nova senha</Button>
      </Card>
    </div>
  );
}
