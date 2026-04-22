import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '../../components/ui/ThemeToggle'

describe('ThemeToggle', () => {
  describe('icon display', () => {
    it('shows sun icon (wb_sunny) in dark mode', () => {
      render(<ThemeToggle isDarkMode={true} onToggle={() => {}} />)
      expect(screen.getByText('wb_sunny')).toBeInTheDocument()
    })

    it('shows moon icon (dark_mode) in light mode', () => {
      render(<ThemeToggle isDarkMode={false} onToggle={() => {}} />)
      expect(screen.getByText('dark_mode')).toBeInTheDocument()
    })

    it('does not show moon icon in dark mode', () => {
      render(<ThemeToggle isDarkMode={true} onToggle={() => {}} />)
      expect(screen.queryByText('dark_mode')).not.toBeInTheDocument()
    })

    it('does not show sun icon in light mode', () => {
      render(<ThemeToggle isDarkMode={false} onToggle={() => {}} />)
      expect(screen.queryByText('wb_sunny')).not.toBeInTheDocument()
    })
  })

  describe('button attributes', () => {
    it('has aria-label "Toggle theme"', () => {
      render(<ThemeToggle isDarkMode={true} onToggle={() => {}} />)
      expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument()
    })

    it('renders as a button element', () => {
      render(<ThemeToggle isDarkMode={true} onToggle={() => {}} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('layout classes', () => {
    it('has flex + centered + sized + rounded-full classes', () => {
      render(<ThemeToggle isDarkMode={true} onToggle={() => {}} />)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('flex', 'items-center', 'justify-center', 'w-10', 'h-10', 'rounded-full')
    })

    it('has border class for outline', () => {
      render(<ThemeToggle isDarkMode={true} onToggle={() => {}} />)
      expect(screen.getByRole('button')).toHaveClass('border', 'border-outline')
    })

    it('has text-secondary base color class', () => {
      render(<ThemeToggle isDarkMode={true} onToggle={() => {}} />)
      expect(screen.getByRole('button')).toHaveClass('text-secondary')
    })

    it('has hover color transition classes', () => {
      render(<ThemeToggle isDarkMode={true} onToggle={() => {}} />)
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('hover:border-primary', 'hover:text-primary', 'transition-colors', 'duration-200')
    })
  })

  describe('interaction', () => {
    it('calls onToggle once when clicked', async () => {
      const onToggle = vi.fn()
      render(<ThemeToggle isDarkMode={true} onToggle={onToggle} />)
      await userEvent.click(screen.getByRole('button'))
      expect(onToggle).toHaveBeenCalledTimes(1)
    })

    it('calls onToggle on each click independently', async () => {
      const onToggle = vi.fn()
      render(<ThemeToggle isDarkMode={false} onToggle={onToggle} />)
      const btn = screen.getByRole('button')
      await userEvent.click(btn)
      await userEvent.click(btn)
      expect(onToggle).toHaveBeenCalledTimes(2)
    })

    it('calls onToggle when activated via keyboard (Enter)', async () => {
      const onToggle = vi.fn()
      render(<ThemeToggle isDarkMode={true} onToggle={onToggle} />)
      screen.getByRole('button').focus()
      await userEvent.keyboard('{Enter}')
      expect(onToggle).toHaveBeenCalledTimes(1)
    })

    it('calls onToggle when activated via keyboard (Space)', async () => {
      const onToggle = vi.fn()
      render(<ThemeToggle isDarkMode={true} onToggle={onToggle} />)
      screen.getByRole('button').focus()
      await userEvent.keyboard(' ')
      expect(onToggle).toHaveBeenCalledTimes(1)
    })
  })
})
