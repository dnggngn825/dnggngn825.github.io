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
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [isDarkMode, setIsDarkMode] = usePrefersDarkMode()
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const onPointer = (e: PointerEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('pointerdown', onPointer)
    return () => window.removeEventListener('pointerdown', onPointer)
  }, [menuOpen])

  useEffect(() => { setMenuOpen(false) }, [location])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    if (isHome) scrollToId(href.slice(1))
  }

  const pillBase = 'bg-surface-card/40 border-outline-variant/50 [box-shadow:var(--shadow-pill)]'

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4 md:px-6 pointer-events-none">
      {/* Desktop floating pill */}
      <nav
        className={`
          hidden md:flex items-center gap-2 px-3 py-2
          rounded-full border backdrop-blur-md
          transition-all duration-300 pointer-events-auto
          ${pillBase}
        `}
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={() => isHome && window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-xs tracking-tight transition-colors duration-200 flex-shrink-0 ${
            isDarkMode
              ? 'bg-primary text-bg hover:bg-primary/80'
              : 'bg-on-surface text-bg hover:bg-on-surface/80'
          }`}
        >
          {owner.name.split(' ').map(n => n[0]).join('')}
        </Link>

        {/* Divider */}
        <span className={`w-px h-5 mx-1 ${isDarkMode ? 'bg-surface-highest/60' : 'bg-outline-variant/60'}`} />

        {/* Nav links */}
        {navLinks.map(link => (
          isHome ? (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-secondary hover:text-primary transition-colors duration-200 text-sm font-medium tracking-tight cursor-pointer px-3 py-1.5 rounded-full hover:bg-surface-high/40"
            >
              {link.label}
            </button>
          ) : (
            <Link
              key={link.label}
              to={`/${link.href}`}
              className="text-secondary hover:text-primary transition-colors duration-200 text-sm font-medium tracking-tight px-3 py-1.5 rounded-full hover:bg-surface-high/40"
            >
              {link.label}
            </Link>
          )
        ))}

        {/* Divider */}
        <span className={`w-px h-5 mx-1 ${isDarkMode ? 'bg-surface-highest/60' : 'bg-outline-variant/60'}`} />

        <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(prev => !prev)} />
      </nav>

      {/* Mobile bar — single continuous box that expands when menu opens */}
      <div
        ref={menuRef}
        className={`md:hidden w-full pointer-events-auto rounded-2xl border backdrop-blur-md transition-all duration-300 ${pillBase}`}
      >
        <nav className="flex items-center justify-between px-4 py-2.5">
          {/* Brand */}
          <Link
            to="/"
            onClick={() => isHome && window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-xs tracking-tight transition-colors duration-200 ${
              isDarkMode
                ? 'bg-primary text-bg hover:bg-primary/80'
                : 'bg-on-surface text-bg hover:bg-on-surface/80'
            }`}
          >
            {owner.name.split(' ').map(n => n[0]).join('')}
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(prev => !prev)} />
            <button
              ref={buttonRef}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                menuOpen
                  ? isDarkMode ? 'bg-surface-high text-primary' : 'bg-surface-high/60 text-primary'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Dropdown — no gap, flows inside the same box */}
        {menuOpen && (
          <>
            <div className={`mx-4 h-px ${isDarkMode ? 'bg-surface-highest/50' : 'bg-outline-variant/50'}`} />
            <div className="px-3 py-3 flex flex-col gap-1">
              {navLinks.map(link => (
                isHome ? (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-secondary hover:text-primary transition-colors text-sm font-medium text-left px-4 py-2.5 rounded-xl hover:bg-surface-high/40 w-full"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={`/${link.href}`}
                    className="text-secondary hover:text-primary transition-colors text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-surface-high/40 block"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
