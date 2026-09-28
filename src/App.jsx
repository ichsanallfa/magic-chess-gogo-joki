import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import brandLogo from './assets/asset logo mcgg.png'
import './App.css'

const sections = ['home', 'services', 'proof', 'faq']

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection) setActiveSection(visibleSection.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId)
      if (section) sectionObserver.observe(section)
    })

    return () => sectionObserver.disconnect()
  }, [])

  return (
    <main>
      <nav className="navbar">
        <a className="brand" href="#home" aria-label="Magic Chess GoGo">
          <img src={brandLogo} alt="Magic Chess GoGo" />
        </a>
        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-links ${menuOpen ? 'menu-open' : ''}`}>
          {sections.map((section) => (
            <a
              className={activeSection === section ? 'active' : ''}
              href={`#${section}`}
              key={section}
              onClick={() => setMenuOpen(false)}
            >
              {section[0].toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </nav>
      <div className="page-content">
        <Home />
      </div>
    </main>
  )
}

export default App
