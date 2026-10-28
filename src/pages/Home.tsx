import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaSearch, FaGithub } from 'react-icons/fa';
import { searchTools, getAllTags, tools } from '../lib/tools';
import { useFavorites } from '../hooks/useFavorites';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Card } from '../components/ui/Card';
import { RootDivider } from '../components/ui/RootDivider';
import styles from './Home.module.css';

const STATS = [
  { value: String(tools.length), label: 'Ferramentas gratuitas' },
  { value: '0', label: 'Anúncios ou cadastros' },
  { value: '100%', label: 'Código aberto' },
  { value: String(tools.filter((tool) => tool.offline).length), label: 'Funcionam offline' },
];

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
    <>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.badge}>🌱 100% gratuito · sem anúncios · sem cadastro</span>
          <h1 className={styles.title}>Ferramentas simples para o seu dia a dia</h1>
          <p className={styles.subtitle}>
            Calculadoras, conversores, geradores e validadores gratuitos — leves, rápidos e
            funcionando até sem internet.
          </p>

          <div className={styles.ctas}>
            <a href="#ferramentas" className="btnPrimary">
              Explorar ferramentas
            </a>
            <a
              href="https://github.com/Alan-VSouza/simplify"
              target="_blank"
              rel="noreferrer"
              className={`btnGhost ${styles.ctaGhost}`}
            >
              <FaGithub aria-hidden="true" />
              Ver código no GitHub
            </a>
          </div>

          <dl className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <RootDivider className={styles.roots} />

      <div className="container" id="ferramentas">
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
                      <span className={styles.iconBadge}>
                        <Icon aria-hidden="true" className={styles.icon} />
                      </span>
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
                        {favorite ? (
                          <FaStar aria-hidden="true" />
                        ) : (
                          <FaRegStar aria-hidden="true" />
                        )}
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
    </>
  );
}
