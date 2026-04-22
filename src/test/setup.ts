import '@testing-library/jest-dom'

// Default matchMedia mock (dark mode preferred by default)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
})

// Suppress console.error for React Router warnings in tests
const originalError = console.error
beforeEach(() => {
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('React Router')) return
    originalError(...args)
  }
})
afterEach(() => {
  console.error = originalError
  document.body.className = ''
  document.body.style.overflow = ''
})
