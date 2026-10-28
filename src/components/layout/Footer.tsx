import { FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          &copy; {new Date().getFullYear()} Simplify — feito por{' '}
          <a href="https://github.com/Alan-VSouza" target="_blank" rel="noreferrer">
            Alan Souza
          </a>
        </p>
        <a
          href="https://github.com/Alan-VSouza/simplify"
          target="_blank"
          rel="noreferrer"
          aria-label="Repositório no GitHub"
          className={styles.githubLink}
        >
          <FaGithub aria-hidden="true" />
          <span>Código no GitHub</span>
        </a>
      </div>
    </footer>
  );
}
