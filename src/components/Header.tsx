import React, { useState, useEffect } from 'react';
import './Header.css';

const sections = [
  { id: 'inicio' },
  { id: 'quienes-somos' },
  { id: 'productos' },
  { id: 'servicios' },
  { id: 'clientes' },
  { id: 'contacto' },
];

export default function Header() {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPos) {
          setCurrentSection(sections[i].id);
          break;
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isInicio = currentSection === 'inicio';

  return (
    <>
      <header
        className={`header ${menuOpen ? 'menu-open' : ''} ${
          isInicio ? 'inicio' : 'scrolled'
        }`}
      >
        <div className="header-inner">
          <div className="logo">
            <img
              src={isInicio ? "/logos/publicominicio.png" : "/logos/publicom.png"}
              alt="Logo Publicom"
              className="logo-img"
            />
          </div>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <ul>
              {sections.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={
                      isInicio
                        ? 'nav-link-white'
                        : currentSection === item.id
                        ? 'nav-link-dark active'
                        : 'nav-link-dark'
                    }
                  >
                    {item.id.replace('-', ' ').toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
