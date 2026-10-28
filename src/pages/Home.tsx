import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaSearch } from 'react-icons/fa';
import { searchTools, getAllTags } from '../lib/tools';
import { useFavorites } from '../hooks/useFavorites';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Card } from '../components/ui/Card';
import styles from './Home.module.css';

export function Home() {
  useDocumentHead(
    'Ferramentas úteis para o dia a dia',
    'Calculadoras, conversores e geradores gratuitos: CPF/CNPJ, CEP, juros, senhas, unidades e mais.',
  );

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const tags = useMemo(() => getAllTags(), []);
  const results = useMemo(() => searchTools(query, category), [query, category]);

  return (
    <div className="container">
      <section className={styles.hero}>
        <h1>Simplify</h1>
        <p>Ferramentas simples e gratuitas para o seu dia a dia, sem anúncios e sem cadastro.</p>
      </section>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FaSearch aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar ferramenta..."
            aria-label="Buscar ferramenta"
          />
        </div>

        <div className={styles.tags} role="group" aria-label="Filtrar por categoria">
          <button
            type="button"
            className={category === null ? styles.tagActive : styles.tag}
            onClick={() => setCategory(null)}
          >
            Todas
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={category === tag ? styles.tagActive : styles.tag}
              onClick={() => setCategory(category === tag ? null : tag)}
              aria-pressed={category === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <p className={styles.empty}>Nenhuma ferramenta encontrada para essa busca.</p>
      ) : (
        <ul className={styles.grid}>
          {results.map((tool) => {
            const favorite = isFavorite(tool.id);
            const Icon = tool.icon;
            return (
              <li key={tool.id}>
                <Card className={styles.card}>
                  <div className={styles.cardHeader}>
                    <Icon aria-hidden="true" className={styles.icon} />
                    <button
                      type="button"
                      onClick={() => toggleFavorite(tool.id)}
                      className={styles.favoriteButton}
                      aria-pressed={favorite}
                      aria-label={
                        favorite
                          ? `Remover ${tool.name} dos favoritos`
                          : `Adicionar ${tool.name} aos favoritos`
                      }
                    >
                      {favorite ? <FaStar aria-hidden="true" /> : <FaRegStar aria-hidden="true" />}
                    </button>
                  </div>
                  <h2>
                    <Link to={tool.path}>{tool.name}</Link>
                  </h2>
                  <p>{tool.shortDescription}</p>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
