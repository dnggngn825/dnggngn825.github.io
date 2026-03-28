import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { owner } from '../../data/owner'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    if (isHome) {
      scrollToId(href.slice(1))
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-md border-b border-surface-highest/40 shadow-[0_8px_32px_rgba(6,14,32,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => isHome && window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-on-surface font-black tracking-tighter text-lg uppercase hover:text-primary transition-colors duration-200"
        >
          {owner.name.toUpperCase()}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            isHome ? (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-secondary hover:text-primary transition-colors duration-200 text-sm font-medium tracking-tight cursor-pointer"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={`/${link.href}`}
                className="text-secondary hover:text-primary transition-colors duration-200 text-sm font-medium tracking-tight"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-bg/95 backdrop-blur-md border-t border-surface-highest/40 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            isHome ? (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-secondary hover:text-primary transition-colors text-sm font-medium text-left"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={`/${link.href}`}
                className="text-secondary hover:text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  )
}
