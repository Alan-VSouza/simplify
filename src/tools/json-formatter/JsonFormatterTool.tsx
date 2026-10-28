import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { formatJson, minifyJson } from './logic';
import styles from './JsonFormatterTool.module.css';

export default function JsonFormatterTool() {
  useDocumentHead(
    'Formatador e Validador de JSON',
    'Formate, valide e minifique documentos JSON, com detecção de erros de sintaxe.',
  );

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const runAction = (action: typeof formatJson | typeof minifyJson) => {
    const result = action(input);
    setOutput(result.output);
    setError(result.error);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast.success('Copiado para a área de transferência!');
  };

  return (
    <div className="container">
      <h1>Formatador e Validador de JSON</h1>

      <Card className={styles.card}>
        <div className={styles.field}>
          <label htmlFor="json-input">JSON de entrada</label>
          <textarea
            id="json-input"
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"exemplo": true}'
            rows={10}
          />
        </div>

        <div className={styles.actions}>
          <Button onClick={() => runAction(formatJson)}>Formatar</Button>
          <Button variant="secondary" onClick={() => runAction(minifyJson)}>
            Minificar
          </Button>
        </div>

        {error && (
          <p role="alert" className={styles.error}>
            JSON inválido: {error}
          </p>
        )}

        {output && (
          <div className={styles.field}>
            <div className={styles.outputHeader}>
              <label htmlFor="json-output">Resultado</label>
              <Button variant="secondary" onClick={handleCopy}>
                Copiar
              </Button>
            </div>
            <textarea
              id="json-output"
              className={styles.textarea}
              value={output}
              readOnly
              rows={10}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
