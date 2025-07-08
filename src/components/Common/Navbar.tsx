import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../../styles/navbar.css';

const navItems = [
  { label: "Sobre", href: "#about-section" },
  {
    label: "Calculadoras",
    dropdown: true,
    submenu: [
      { label: "🌍 Pegada de Carbono", href: "/calculadora-pegada" },
      { label: "💰 Investimentos", href: "/calculadora-investimentos" },
      { label: "📊 Produtividade", href: "/calculadora-produtividade" },
    ],
  },
  {
    label: "Conversores",
    dropdown: true,
    submenu: [
      { label: "💱 Moedas", href: "/conversor-moedas" },
      { label: "📏 Unidades", href: "/conversor-unidades" },
      { label: "🕒 Fusos Horários", href: "/conversor-fusos" },
    ],
  },
  {
    label: "Geradores",
    dropdown: true,
    submenu: [
      { label: "📄 CPF/CNPJ", href: "/gerador-cpf" },
      { label: "🔐 Senhas", href: "/gerador-senhas" },
      { label: "📱 QR Codes", href: "/gerador-qrcode" },
    ],
  },
  {
    label: "Validadores",
    dropdown: true,
    submenu: [
      { label: "✅ E-mails", href: "/validador-email" },
      { label: "🔍 CPF/CNPJ", href: "/validador-cpf-cnpj" },
    ],
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => setMenuActive((v) => !v);

  const scrollToAbout = () => {
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById('about-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < 10) {
        setTimeout(() => tryScroll(attempts + 1), 50);
      }
    };
    tryScroll();
  };

  const handleAboutClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMenuActive(false); 
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToAbout, 200);
    } else {
      scrollToAbout();
    }
  };

  return (
    <header>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="logo" href="/">Simplify</a>
        <div 
          className={`mobile-menu${menuActive ? " active" : ""}`}
          onClick={handleMenuToggle}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <ul className={`nav-list${menuActive ? " active" : ""}`}>
          {navItems.map((item, index) => {
            if (item.label === "Sobre") {
              return (
                <li
                  key={index}
                  className={`${hoveredIndex === index ? "hovered" : ""}${hoveredIndex !== null && hoveredIndex !== index ? " faded" : ""}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <a
                    className="nav-link"
                    href={item.href}
                    onClick={handleAboutClick}
                  >
                    {item.label}
                  </a>
                </li>
              );
            }
            return item.dropdown ? (
              <li
                key={index}
                className={`dropdown${hoveredIndex === index ? " hovered" : ""}${hoveredIndex !== null && hoveredIndex !== index ? " faded" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a className="nav-link" href="#" tabIndex={-1}>{item.label} ▾</a>
                {hoveredIndex === index && (
                  <ul className="dropdown-menu">
                    {item.submenu?.map((submenuItem, idx) => (
                      <li key={idx}>
                        <a href={submenuItem.href}>{submenuItem.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={index}
                className={`${hoveredIndex === index ? "hovered" : ""}${hoveredIndex !== null && hoveredIndex !== index ? " faded" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a className="nav-link" href={item.href}>{item.label}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
