import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Navbar } from '../../components/layout/Navbar'

function renderNavbar(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>
  )
}

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

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Navbar', () => {
  describe('wrapper positioning', () => {
    it('outer wrapper is fixed at the top', () => {
      renderNavbar()
      // The fixed wrapper is a div — not a nav role
      const wrapper = document.querySelector('.fixed.top-0')
      expect(wrapper).not.toBeNull()
    })

    it('outer wrapper has z-50', () => {
      renderNavbar()
      const wrapper = document.querySelector('.fixed.top-0')
      expect(wrapper?.classList.contains('z-50')).toBe(true)
    })
  })

  describe('brand button', () => {
    it('renders a link to "/"', () => {
      renderNavbar()
      const brandLinks = screen.getAllByRole('link')
      expect(brandLinks[0]).toHaveAttribute('href', '/')
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
  })

  describe('desktop nav link buttons (home route)', () => {
    it('renders all 4 nav link buttons', () => {
      renderNavbar('/')
      const buttons = screen.getAllByRole('button', { name: /About|Experience|Projects|Contact/ })
      // Each link appears once (desktop pill only; mobile dropdown is hidden)
      expect(buttons.length).toBeGreaterThanOrEqual(4)
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
  })

  describe('ThemeToggle inside Navbar', () => {
    it('renders theme toggle button', () => {
      renderNavbar()
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
      await userEvent.click(screen.getAllByRole('button', { name: 'Toggle theme' })[0])
      expect(document.body.classList.contains('theme-light')).toBe(true)
    })
  })

  describe('mobile hamburger button', () => {
    it('renders with aria-label "Toggle menu"', () => {
      renderNavbar()
      expect(screen.getByRole('button', { name: 'Toggle menu' })).toBeInTheDocument()
    })

    it('shows menu icon when closed', () => {
      renderNavbar()
      expect(screen.getByText('menu')).toBeInTheDocument()
    })

    it('has aria-expanded="false" when closed', () => {
      renderNavbar()
      expect(screen.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('aria-expanded', 'false')
    })

    it('shows close icon when opened', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      expect(screen.getByText('close')).toBeInTheDocument()
    })

    it('has aria-expanded="true" when opened', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      expect(screen.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('mobile dropdown', () => {
    it('is hidden by default (nav links not duplicated)', () => {
      renderNavbar()
      // Only desktop instances exist when closed
      expect(screen.getAllByRole('button', { name: 'About' })).toHaveLength(1)
    })

    it('opens when hamburger is clicked', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      // Now 2 × "About": desktop + mobile dropdown
      expect(screen.getAllByRole('button', { name: 'About' })).toHaveLength(2)
    })

    it('closes on Escape key', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      await userEvent.keyboard('{Escape}')
      expect(screen.getAllByRole('button', { name: 'About' })).toHaveLength(1)
    })

    it('closes when a nav link is clicked', async () => {
      renderNavbar()
      await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
      // Click one of the duplicate About buttons (first = desktop, second = mobile)
      const aboutBtns = screen.getAllByRole('button', { name: 'About' })
      await userEvent.click(aboutBtns[1])
      expect(screen.getAllByRole('button', { name: 'About' })).toHaveLength(1)
    })
  })

  describe('event listener cleanup', () => {
    it('removes keydown listener on unmount', () => {
      const addSpy = vi.spyOn(window, 'addEventListener')
      const removeSpy = vi.spyOn(window, 'removeEventListener')

      const { unmount } = renderNavbar()
      unmount()

      const keyAdds = addSpy.mock.calls.filter(([e]) => e === 'keydown').length
      const keyRemoves = removeSpy.mock.calls.filter(([e]) => e === 'keydown').length
      expect(keyRemoves).toBeGreaterThanOrEqual(keyAdds)

      addSpy.mockRestore()
      removeSpy.mockRestore()
    })
  })
})
