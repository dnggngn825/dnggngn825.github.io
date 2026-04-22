import { renderHook, act } from '@testing-library/react'
import { usePrefersDarkMode } from '../../hooks/usePrefersDarkMode'

/**
 * Helper: create a mock matchMedia that reports a given preference.
 * Returns the listener registry so tests can fire `change` events.
 */
function mockMatchMedia(prefersDark: boolean) {
  const listeners: ((e: Partial<MediaQueryListEvent>) => void)[] = []

  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: (_: string, cb: (e: Partial<MediaQueryListEvent>) => void) =>
      listeners.push(cb),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))

  return listeners
}

describe('usePrefersDarkMode', () => {
  describe('initial state', () => {
    it('defaults to true when system prefers dark', () => {
      mockMatchMedia(true)
      const { result } = renderHook(() => usePrefersDarkMode())
      expect(result.current[0]).toBe(true)
    })

    it('defaults to false when system prefers light', () => {
      mockMatchMedia(false)
      const { result } = renderHook(() => usePrefersDarkMode())
      expect(result.current[0]).toBe(false)
    })
  })

  describe('body class toggling', () => {
    it('adds theme-light class to body when isDarkMode is false', () => {
      mockMatchMedia(false)
      renderHook(() => usePrefersDarkMode())
      expect(document.body.classList.contains('theme-light')).toBe(true)
    })

    it('does not add theme-light class when isDarkMode is true', () => {
      mockMatchMedia(true)
      renderHook(() => usePrefersDarkMode())
      expect(document.body.classList.contains('theme-light')).toBe(false)
    })

    it('removes theme-light class when switching to dark', () => {
      mockMatchMedia(false)
      const { result } = renderHook(() => usePrefersDarkMode())
      expect(document.body.classList.contains('theme-light')).toBe(true)

      act(() => result.current[1](true))
      expect(document.body.classList.contains('theme-light')).toBe(false)
    })

    it('adds theme-light class when switching to light', () => {
      mockMatchMedia(true)
      const { result } = renderHook(() => usePrefersDarkMode())
      expect(document.body.classList.contains('theme-light')).toBe(false)

      act(() => result.current[1](false))
      expect(document.body.classList.contains('theme-light')).toBe(true)
    })
  })

  describe('setter', () => {
    it('returns a setter that accepts a boolean directly', () => {
      mockMatchMedia(true)
      const { result } = renderHook(() => usePrefersDarkMode())
      act(() => result.current[1](false))
      expect(result.current[0]).toBe(false)
    })

    it('returns a setter that accepts a function updater', () => {
      mockMatchMedia(true)
      const { result } = renderHook(() => usePrefersDarkMode())
      act(() => result.current[1](prev => !prev))
      expect(result.current[0]).toBe(false)
    })
  })

  describe('responds to system preference changes', () => {
    it('updates isDarkMode when OS switches to light', () => {
      const listeners = mockMatchMedia(true)
      const { result } = renderHook(() => usePrefersDarkMode())
      expect(result.current[0]).toBe(true)

      act(() => listeners.forEach(cb => cb({ matches: false })))
      expect(result.current[0]).toBe(false)
    })

    it('updates isDarkMode when OS switches to dark', () => {
      const listeners = mockMatchMedia(false)
      const { result } = renderHook(() => usePrefersDarkMode())
      expect(result.current[0]).toBe(false)

      act(() => listeners.forEach(cb => cb({ matches: true })))
      expect(result.current[0]).toBe(true)
    })
  })
})
