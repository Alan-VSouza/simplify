import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { generateCnpj, generateCpf, isValidCnpj, isValidCpf, maskCnpj, maskCpf } from './logic';
import styles from './CpfCnpjTool.module.css';

type DocType = 'cpf' | 'cnpj';

export default function CpfCnpjTool() {
  useDocumentHead(
    'Gerador e Validador de CPF/CNPJ',
    'Gere CPFs e CNPJs válidos para testes e valide documentos existentes, com máscara automática.',
  );

  const [docType, setDocType] = useState<DocType>('cpf');
  const [generated, setGenerated] = useState('');
  const [toValidate, setToValidate] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);

  const mask = docType === 'cpf' ? maskCpf : maskCnpj;
  const validate = docType === 'cpf' ? isValidCpf : isValidCnpj;
  const generate = docType === 'cpf' ? generateCpf : generateCnpj;

  const handleGenerate = () => {
    setGenerated(generate());
  };

  const handleCopy = async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
    toast.success('Copiado!');
  };

  const handleValidate = () => {
    setValid(validate(toValidate));
  };

  return (
    <div className="container">
      <h1>Gerador e Validador de CPF/CNPJ</h1>

      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={docType === 'cpf'}
          className={docType === 'cpf' ? styles.tabActive : styles.tab}
          onClick={() => {
            setDocType('cpf');
            setGenerated('');
            setValid(null);
          }}
        >
          CPF
        </button>
        <button
          role="tab"
          aria-selected={docType === 'cnpj'}
          className={docType === 'cnpj' ? styles.tabActive : styles.tab}
          onClick={() => {
            setDocType('cnpj');
            setGenerated('');
            setValid(null);
          }}
        >
          CNPJ
        </button>
      </div>

      <Card className={styles.card}>
        <section>
          <h2>Gerar {docType.toUpperCase()}</h2>
          <div className={styles.row}>
            <output className={styles.output}>
              {generated || `${docType.toUpperCase()} gerado aparecerá aqui`}
            </output>
            <Button onClick={handleGenerate}>Gerar</Button>
            <Button variant="secondary" onClick={handleCopy} disabled={!generated}>
              Copiar
            </Button>
          </div>
        </section>

        <section>
          <h2>Validar {docType.toUpperCase()}</h2>
          <div className={styles.row}>
            <label htmlFor="to-validate" className="visually-hidden">
              {docType.toUpperCase()} para validar
            </label>
            <input
              id="to-validate"
              value={mask(toValidate)}
              onChange={(e) => {
                setToValidate(e.target.value);
                setValid(null);
              }}
              placeholder={docType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
              className={styles.input}
            />
            <Button onClick={handleValidate}>Validar</Button>
          </div>

          {valid !== null && (
            <p role="status" className={valid ? styles.valid : styles.invalid}>
              {valid ? `${docType.toUpperCase()} válido!` : `${docType.toUpperCase()} inválido!`}
            </p>
          )}
        </section>
      </Card>
    </div>
  );
}
