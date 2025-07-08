import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../styles/footer.css";

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-main">
      <div className="footer-links">
        <a href="/sobre">Sobre</a>
        <a href="/privacidade">Política de Privacidade</a>
        <a href="/suporte">Suporte</a>
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter size={24} />
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2025 <span className="footer-brand">SIMPLIFY</span>. Todos os direitos reservados.</p>
      <p className="footer-credits">Criado por: Alan Souza</p>
    </div>
  </footer>
);

export default Footer;
