import { useMemo, useState } from 'react';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import { Card } from '../../components/ui/Card';
import { getTextStats } from './logic';
import styles from './TextCounterTool.module.css';

export default function TextCounterTool() {
  useDocumentHead(
    'Contador de Caracteres e Palavras',
    'Conte caracteres, palavras, frases e estime o tempo de leitura de um texto em tempo real.',
  );

  const [text, setText] = useState('');
  const stats = useMemo(() => getTextStats(text), [text]);

  return (
    <div className="container">
      <h1>Contador de Caracteres e Palavras</h1>

      <Card className={styles.card}>
        <label htmlFor="text-input" className={styles.label}>
          Cole ou digite seu texto
        </label>
        <textarea
          id="text-input"
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Digite aqui..."
        />

        <dl className={styles.stats}>
          <div>
            <dt>Caracteres</dt>
            <dd>{stats.characters}</dd>
          </div>
          <div>
            <dt>Caracteres (sem espaços)</dt>
            <dd>{stats.charactersNoSpaces}</dd>
          </div>
          <div>
            <dt>Palavras</dt>
            <dd>{stats.words}</dd>
          </div>
          <div>
            <dt>Frases</dt>
            <dd>{stats.sentences}</dd>
          </div>
          <div>
            <dt>Parágrafos</dt>
            <dd>{stats.paragraphs}</dd>
          </div>
          <div>
            <dt>Tempo de leitura</dt>
            <dd>{stats.readingTimeMinutes} min</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
