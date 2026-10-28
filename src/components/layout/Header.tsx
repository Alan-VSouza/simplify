import { NavLink } from 'react-router-dom';
import { FaMoon, FaSun, FaLeaf } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';
import styles from './Header.module.css';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand} aria-label="Simplify, página inicial">
          <FaLeaf aria-hidden="true" />
          <span>Simplify</span>
        </NavLink>

        <nav aria-label="Navegação principal" className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')} end>
            Início
          </NavLink>
          <NavLink to="/sobre" className={({ isActive }) => (isActive ? styles.active : '')}>
            Sobre
          </NavLink>
          <NavLink to="/contato" className={({ isActive }) => (isActive ? styles.active : '')}>
            Contato
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
        >
          {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
