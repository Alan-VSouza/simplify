import { useDocumentHead } from '../hooks/useDocumentHead';
import styles from './StaticPage.module.css';

export function About() {
  useDocumentHead(
    'Sobre',
    'Simplify é um projeto open source de ferramentas úteis para o dia a dia, criado por Alan Souza.',
  );

  return (
    <div className={`container ${styles.page}`}>
      <h1>Sobre o Simplify</h1>
      <p>
        O Simplify é uma coleção de ferramentas simples e gratuitas para tarefas do dia a dia: gerar
        e validar documentos, converter moedas e unidades, calcular juros, criar senhas seguras e
        muito mais.
      </p>
      <p>
        O projeto é open source e foi criado como um espaço para praticar boas práticas de
        front-end: código testado, arquitetura por módulos, acessibilidade e performance.
      </p>
      <p>
        Quer contribuir ou sugerir uma ferramenta? Veja o{' '}
        <a href="https://github.com/Alan-VSouza/simplify" target="_blank" rel="noreferrer">
          repositório no GitHub
        </a>
        .
      </p>
    </div>
  );
}
