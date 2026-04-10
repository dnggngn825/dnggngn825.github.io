import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { owner } from '../../data/owner'
import { ThemeToggle } from '../ui/ThemeToggle'
import { usePrefersDarkMode } from '../../hooks/usePrefersDarkMode'

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
  const [isDarkMode, setIsDarkMode] = usePrefersDarkMode()
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    if (isHome) {
      scrollToId(href.slice(1))
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? `${isDarkMode ? 'bg-bg/50 border-surface-highest/40 shadow-[0_8px_32px_rgba(6,14,32,0.4)]' : 'bg-white/50 border-outline-variant/40 shadow-[0_8px_32px_rgba(15,23,42,0.08)]'} backdrop-blur-md border-b`
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            onClick={() => isHome && window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-on-surface font-display font-black tracking-tighter text-lg uppercase hover:text-primary transition-colors duration-200"
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
            <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(prev => !prev)} />
          </div>

          {/* Mobile right controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(prev => !prev)} />
            <button
              className="text-primary"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className={`md:hidden relative z-50 ${isDarkMode ? 'bg-bg/50 border-t border-surface-highest/40' : 'bg-white/50 border-t border-outline-variant/40'} backdrop-blur-md px-6 py-4 flex flex-col gap-4`}>
            {navLinks.map(link => (
              isHome ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-secondary hover:text-primary transition-colors text-base font-medium text-left"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={`/${link.href}`}
                  className="text-secondary hover:text-primary transition-colors text-base font-medium"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        )}
      </nav>

      {/* Backdrop overlay — outside <nav> to avoid backdrop-filter containing block issue */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-x-0 bottom-0 z-40 backdrop-blur-sm bg-bg/20"
          style={{ top: navRef.current?.offsetHeight ?? 0 }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
