import { useState, type FormEvent } from 'react';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AsyncState } from '../../components/ui/AsyncState';
import { fetchAddressByCep, maskCep, type Address } from './logic';
import styles from './CepTool.module.css';

export default function CepTool() {
  useDocumentHead(
    'Consulta de CEP',
    'Busque o endereço completo a partir de um CEP brasileiro, usando a API gratuita do ViaCEP.',
  );

  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setAddress(null);
    try {
      setAddress(await fetchAddressByCep(cep));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao consultar o CEP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Consulta de CEP</h1>

      <Card className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="cep">CEP</label>
          <div className={styles.row}>
            <input
              id="cep"
              value={maskCep(cep)}
              onChange={(e) => setCep(e.target.value)}
              placeholder="00000-000"
              inputMode="numeric"
              maxLength={9}
              required
            />
            <Button type="submit" disabled={loading}>
              Buscar
            </Button>
          </div>
        </form>

        <AsyncState loading={loading} error={error} empty={!address} emptyMessage="Digite um CEP para buscar o endereço.">
          {address && (
            <dl className={styles.result}>
              <div>
                <dt>CEP</dt>
                <dd>{address.cep}</dd>
              </div>
              <div>
                <dt>Logradouro</dt>
                <dd>{address.street || '-'}</dd>
              </div>
              <div>
                <dt>Bairro</dt>
                <dd>{address.neighborhood || '-'}</dd>
              </div>
              <div>
                <dt>Cidade</dt>
                <dd>{address.city}</dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>{address.state}</dd>
              </div>
            </dl>
          )}
        </AsyncState>
      </Card>
    </div>
  );
}
