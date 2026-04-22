import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Navbar } from '../../components/layout/Navbar'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Render Navbar inside a MemoryRouter at a given path */
function renderNavbar(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>
  )
}

/**
 * Simulate a window scroll to the given Y offset.
 * The Navbar listens for the native 'scroll' event on window.
 */
function simulateScroll(y: number) {
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: y })
  act(() => { window.dispatchEvent(new Event('scroll')) })
}

/** Force the matchMedia mock to report a specific dark/light preference */
function setSystemDarkMode(prefersDark: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('Navbar', () => {
  describe('fixed positioning', () => {
    it('is always fixed to the top of the viewport', () => {
      renderNavbar()
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('fixed', 'top-0')
    })

    it('spans the full viewport width', () => {
      renderNavbar()
      expect(screen.getByRole('navigation')).toHaveClass('w-full')
    })

    it('sits above other content (z-50)', () => {
      renderNavbar()
      expect(screen.getByRole('navigation')).toHaveClass('z-50')
    })

    it('has a smooth CSS transition for scroll effects', () => {
      renderNavbar()
      expect(screen.getByRole('navigation')).toHaveClass('transition-all', 'duration-300')
    })
  })

  describe('transparent before scroll', () => {
    it('has bg-transparent class when scrollY is 0', () => {
      simulateScroll(0)
      renderNavbar()
      expect(screen.getByRole('navigation')).toHaveClass('bg-transparent')
    })

    it('has bg-transparent class when scrollY equals threshold (20)', () => {
      simulateScroll(20)
      renderNavbar()
      expect(screen.getByRole('navigation')).toHaveClass('bg-transparent')
    })
  })

  describe('glass background after scroll — dark mode', () => {
    beforeEach(() => setSystemDarkMode(true))

    it('applies dark glass background when scrolled past 20px', () => {
      renderNavbar()
      simulateScroll(21)
      expect(screen.getByRole('navigation')).toHaveClass('bg-bg/50')
    })

    it('applies dark border when scrolled', () => {
      renderNavbar()
      simulateScroll(21)
      expect(screen.getByRole('navigation')).toHaveClass('border-surface-highest/40')
    })

    it('applies backdrop-blur when scrolled', () => {
      renderNavbar()
      simulateScroll(21)
      expect(screen.getByRole('navigation')).toHaveClass('backdrop-blur-md', 'border-b')
    })

    it('does NOT apply light-mode glass classes in dark mode', () => {
      renderNavbar()
      simulateScroll(21)
      expect(screen.getByRole('navigation')).not.toHaveClass('bg-white/50')
      expect(screen.getByRole('navigation')).not.toHaveClass('border-outline-variant/40')
    })
  })

  describe('glass background after scroll — light mode', () => {
    beforeEach(() => setSystemDarkMode(false))

    it('applies light glass background when scrolled past 20px', () => {
      renderNavbar()
      simulateScroll(21)
      expect(screen.getByRole('navigation')).toHaveClass('bg-white/50')
    })

    it('applies light border when scrolled', () => {
      renderNavbar()
      simulateScroll(21)
      expect(screen.getByRole('navigation')).toHaveClass('border-outline-variant/40')
    })

    it('applies backdrop-blur when scrolled', () => {
      renderNavbar()
      simulateScroll(21)
      expect(screen.getByRole('navigation')).toHaveClass('backdrop-blur-md', 'border-b')
    })

    it('does NOT apply dark-mode glass classes in light mode', () => {
      renderNavbar()
      simulateScroll(21)
      expect(screen.getByRole('navigation')).not.toHaveClass('bg-bg/50')
      expect(screen.getByRole('navigation')).not.toHaveClass('border-surface-highest/40')
    })
  })

  describe('brand button', () => {
    it('renders a link to "/"', () => {
      renderNavbar()
      // The brand is the first link — points to home
      const brandLink = screen.getAllByRole('link')[0]
      expect(brandLink).toHaveAttribute('href', '/')
    })

    it('has correct base layout classes', () => {
      renderNavbar()
      const brandLink = screen.getAllByRole('link')[0]
      expect(brandLink).toHaveClass('w-10', 'h-10', 'flex', 'items-center', 'justify-center')
    })

    it('has dark-mode background in dark mode', () => {
      setSystemDarkMode(true)
      renderNavbar()
      const brandLink = screen.getAllByRole('link')[0]
      expect(brandLink).toHaveClass('bg-primary', 'text-bg')
    })

    it('has light-mode background in light mode', () => {
      setSystemDarkMode(false)
      renderNavbar()
      const brandLink = screen.getAllByRole('link')[0]
      expect(brandLink).toHaveClass('bg-on-surface', 'text-bg')
    })

    it('has transition class for color changes', () => {
      renderNavbar()
      const brandLink = screen.getAllByRole('link')[0]
      expect(brandLink).toHaveClass('transition-colors', 'duration-200')
    })
  })

  describe('desktop nav link buttons (home route)', () => {
    it('renders all 4 nav link buttons on home page', () => {
      renderNavbar('/')
      const buttons = screen.getAllByRole('button', { name: /About|Experience|Projects|Contact/ })
      expect(buttons).toHaveLength(4)
    })

    it('each nav link button has text-secondary class', () => {
      renderNavbar('/')
      const buttons = screen.getAllByRole('button', { name: /About|Experience|Projects|Contact/ })
      buttons.forEach(btn => expect(btn).toHaveClass('text-secondary'))
    })

    it('each nav link button has hover:text-primary class', () => {
      renderNavbar('/')
      const buttons = screen.getAllByRole('button', { name: /About|Experience|Projects|Contact/ })
      buttons.forEach(btn => expect(btn).toHaveClass('hover:text-primary'))
    })

    it('each nav link button has transition-colors class', () => {
      renderNavbar('/')
      const buttons = screen.getAllByRole('button', { name: /About|Experience|Projects|Contact/ })
      buttons.forEach(btn => expect(btn).toHaveClass('transition-colors', 'duration-200'))
    })
  })

  describe('ThemeToggle button inside Navbar', () => {
    it('renders the toggle button with aria-label "Toggle theme"', () => {
      renderNavbar()
      // May be rendered twice (desktop + mobile) — at least one must exist
      expect(screen.getAllByRole('button', { name: 'Toggle theme' }).length).toBeGreaterThanOrEqual(1)
    })

    it('shows sun icon in dark mode', () => {
      setSystemDarkMode(true)
      renderNavbar()
      expect(screen.getAllByText('wb_sunny').length).toBeGreaterThanOrEqual(1)
    })

    it('shows moon icon in light mode', () => {
      setSystemDarkMode(false)
      renderNavbar()
      expect(screen.getAllByText('dark_mode').length).toBeGreaterThanOrEqual(1)
    })

    it('toggles dark mode when clicked', async () => {
      setSystemDarkMode(true)
      renderNavbar()
      expect(document.body.classList.contains('theme-light')).toBe(false)

      // Click the desktop toggle (first occurrence)
      await userEvent.click(screen.getAllByRole('button', { name: 'Toggle theme' })[0])
      expect(document.body.classList.contains('theme-light')).toBe(true)
    })

    it('toggles back to dark mode on second click', async () => {
      setSystemDarkMode(true)
      renderNavbar()

      const toggle = screen.getAllByRole('button', { name: 'Toggle theme' })[0]
      await userEvent.click(toggle)  // dark → light
      await userEvent.click(toggle)  // light → dark
      expect(document.body.classList.contains('theme-light')).toBe(false)
    })
  })

  describe('mobile menu toggle button', () => {
    it('renders the hamburger menu button with aria-label', () => {
      renderNavbar()
      expect(screen.getByRole('button', { name: 'Toggle menu' })).toBeInTheDocument()
    })

    it('shows menu icon when closed', () => {
      renderNavbar()
      expect(screen.getByText('menu')).toBeInTheDocument()
    })

    it('shows close icon when opened', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      expect(screen.getByText('close')).toBeInTheDocument()
    })

    it('hides menu icon after opening', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      expect(screen.queryByText('menu')).not.toBeInTheDocument()
    })

    it('has text-primary class', () => {
      renderNavbar()
      expect(screen.getByRole('button', { name: 'Toggle menu' })).toHaveClass('text-primary')
    })
  })

  describe('mobile dropdown — dark mode', () => {
    beforeEach(() => setSystemDarkMode(true))

    it('is hidden by default', () => {
      renderNavbar()
      // Dropdown only mounts when menuOpen — mobile nav links should not be in the dom twice
      // The desktop links use role=button, mobile links also role=button — check count
      const allAboutBtns = screen.getAllByRole('button', { name: 'About' })
      // Only the desktop instance (inside hidden md:flex) should exist when closed
      expect(allAboutBtns).toHaveLength(1)
    })

    it('opens when the hamburger is clicked', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      // Now there are 2 "About" buttons: desktop + mobile
      expect(screen.getAllByRole('button', { name: 'About' })).toHaveLength(2)
    })

    it('dropdown has dark background class when dark mode is active', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      // Find the dropdown container by its unique md:hidden class
      const dropdown = document.querySelector('.md\\:hidden.relative')
      expect(dropdown).toHaveClass('bg-bg/50', 'border-surface-highest/40')
    })

    it('locks body scroll when menu is open', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('restores body scroll when menu is closed', async () => {
      renderNavbar()
      const menuBtn = screen.getByRole('button', { name: 'Toggle menu' })
      await userEvent.click(menuBtn)  // open
      await userEvent.click(menuBtn)  // close
      expect(document.body.style.overflow).toBe('')
    })
  })

  describe('mobile dropdown — light mode', () => {
    beforeEach(() => setSystemDarkMode(false))

    it('dropdown has light background class when light mode is active', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      const dropdown = document.querySelector('.md\\:hidden.relative')
      expect(dropdown).toHaveClass('bg-white/50', 'border-outline-variant/40')
    })

    it('does NOT apply dark-mode dropdown class in light mode', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      const dropdown = document.querySelector('.md\\:hidden.relative')
      expect(dropdown).not.toHaveClass('bg-bg/50')
      expect(dropdown).not.toHaveClass('border-surface-highest/40')
    })
  })

  describe('scroll event cleanup', () => {
    it('removes scroll listener on unmount (no memory leak)', () => {
      const addSpy = vi.spyOn(window, 'addEventListener')
      const removeSpy = vi.spyOn(window, 'removeEventListener')

      const { unmount } = renderNavbar()
      const scrollAdds = addSpy.mock.calls.filter(([e]) => e === 'scroll').length
      unmount()
      const scrollRemoves = removeSpy.mock.calls.filter(([e]) => e === 'scroll').length

      expect(scrollRemoves).toBeGreaterThanOrEqual(scrollAdds)
      addSpy.mockRestore()
      removeSpy.mockRestore()
    })
  })
})
