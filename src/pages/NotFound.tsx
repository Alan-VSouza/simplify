import { Link } from 'react-router-dom';
import { useDocumentHead } from '../hooks/useDocumentHead';
import styles from './StaticPage.module.css';

export function NotFound() {
  useDocumentHead('Página não encontrada', 'A página que você procura não existe.');

  return (
    <div className={`container ${styles.page}`}>
      <h1>Página não encontrada</h1>
      <p>
        A página que você procura não existe. <Link to="/">Voltar para a página inicial</Link>.
      </p>
    </div>
  );
}
