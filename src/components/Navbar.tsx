import { useState, useEffect } from 'react'

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
  activeSection: string
}

const NAV_ITEMS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
]

export default function Navbar({ isDark, toggleTheme, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <button className="nav-logo" onClick={() => scrollTo('home')}>
          <span className="logo-bracket">&lt;</span>BT<span className="logo-bracket">/&gt;</span>
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-link${activeSection === item.id ? ' active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" id="theme-toggle">
            <i className={`ph ${isDark ? 'ph-sun' : 'ph-moon'}`} />
          </button>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            id="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((p) => !p)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  )
}
