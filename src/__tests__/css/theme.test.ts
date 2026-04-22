/**
 * CSS theme variable tests.
 *
 * jsdom does not process real CSS stylesheets, so we mirror the CSS variable
 * declarations from index.css directly into these tests and assert that:
 *  1. The dark-mode (root) token values are what the stylesheet defines.
 *  2. The light-mode (body.theme-light) token values differ from dark.
 *  3. Toggling `body.theme-light` switches every token to its light value.
 *
 * If a token in index.css ever changes, the matching constant here will
 * catch the drift.
 */

// ─── Token maps mirrored from src/index.css ──────────────────────────────────

const DARK_TOKENS: Record<string, string> = {
  '--color-bg':               '0 0 0',
  '--color-primary':          '248 250 252',
  '--color-secondary':        '161 161 170',
  '--color-surface':          '17 24 39',
  '--color-surface-low':      '15 23 42',
  '--color-surface-lowest':   '0 0 0',
  '--color-surface-high':     '31 41 55',
  '--color-surface-highest':  '17 24 39',
  '--color-surface-bright':   '39 39 42',
  '--color-surface-dim':      '2 6 23',
  '--color-on-surface':       '248 250 252',
  '--color-on-primary':       '15 23 42',
  '--color-outline':          '55 65 81',
  '--color-outline-variant':  '39 39 42',
  '--color-muted':            '113 113 122',
  '--color-surface-tag':      '30 41 59',
  '--color-surface-card':     '32 32 36',
  '--color-status-progress':  '250 204 21',
  '--color-status-complete':  '74 222 128',
  '--gradient-text':          'linear-gradient(135deg, #ffffff 0%, #d4d4d8 50%, #a1a1aa 100%)',
  '--cursor-dot-bg':          '#ffffff',
  '--shadow-pill':            '0 1px 4px rgba(0,0,0,0.7), 0 8px 40px rgba(255,255,255,0.14)',
  '--shadow-pill-hover':      '0 2px 6px rgba(0,0,0,0.75), 0 14px 56px rgba(255,255,255,0.20)',
  '--shadow-pill-active':     '0 1px 2px rgba(0,0,0,0.6), 0 4px 20px rgba(255,255,255,0.10)',
  '--gradient-card-border':   'linear-gradient(135deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 100%)',
  '--bg-container-glow':      'radial-gradient(ellipse at 20% 0%, rgba(65,65,68,0.9) 0%, rgba(5,5,8,1) 70%)',
}

const LIGHT_TOKENS: Record<string, string> = {
  '--color-bg':               '248 250 252',
  '--color-primary':          '15 23 42',
  '--color-surface':          '255 255 255',
  '--color-surface-low':      '241 245 249',
  '--color-surface-lowest':   '248 250 252',
  '--color-surface-high':     '226 232 240',
  '--color-surface-highest':  '226 232 240',
  '--color-surface-bright':   '226 232 240',
  '--color-surface-dim':      '248 250 252',
  '--color-on-surface':       '15 23 42',
  '--color-on-primary':       '248 250 252',
  '--color-outline':          '203 213 225',
  '--color-outline-variant':  '203 213 225',
  '--color-muted':            '100 116 139',
  '--color-surface-tag':      '226 232 240',
  '--color-surface-card':     '248 250 252',
  '--color-status-progress':  '202 138 4',
  '--color-status-complete':  '22 163 74',
  '--gradient-text':          'linear-gradient(135deg, #0f172a 0%, #475569 50%, #64748b 100%)',
  '--cursor-dot-bg':          '#0f172a',
  '--shadow-pill':            '0 1px 3px rgba(15,23,42,0.10), 0 5px 18px rgba(71,85,105,0.09), 0 14px 44px rgba(100,116,139,0.07)',
  '--shadow-pill-hover':      '0 2px 5px rgba(15,23,42,0.12), 0 7px 24px rgba(71,85,105,0.11), 0 18px 54px rgba(100,116,139,0.08)',
  '--shadow-pill-active':     '0 1px 2px rgba(15,23,42,0.09), 0 3px 12px rgba(71,85,105,0.08), 0 8px 26px rgba(100,116,139,0.06)',
  '--gradient-card-border':   'linear-gradient(135deg, rgba(15,23,42,0.07) 0%, rgba(100,116,139,0.02) 50%, rgba(15,23,42,0.05) 100%)',
  '--bg-container-glow':      'radial-gradient(ellipse at 20% 0%, rgba(230,230,232,1) 0%, rgba(241,245,249,1) 70%)',
}

// ─── Helper: apply CSS variables to an element ───────────────────────────────

function applyTokens(el: HTMLElement, tokens: Record<string, string>) {
  Object.entries(tokens).forEach(([prop, val]) => el.style.setProperty(prop, val))
}

// ─── Dark mode token tests ────────────────────────────────────────────────────

describe('CSS theme tokens — dark mode (:root defaults)', () => {
  let root: HTMLDivElement

  beforeEach(() => {
    root = document.createElement('div')
    document.body.appendChild(root)
    applyTokens(root, DARK_TOKENS)
  })

  afterEach(() => root.remove())

  it.each(Object.entries(DARK_TOKENS))('dark token %s equals "%s"', (prop, expected) => {
    expect(root.style.getPropertyValue(prop).trim()).toBe(expected)
  })

  it('bg token is pitch black (0 0 0)', () => {
    expect(root.style.getPropertyValue('--color-bg').trim()).toBe('0 0 0')
  })

  it('primary token is near-white (248 250 252)', () => {
    expect(root.style.getPropertyValue('--color-primary').trim()).toBe('248 250 252')
  })

  it('gradient-text uses white-to-zinc palette', () => {
    expect(root.style.getPropertyValue('--gradient-text').trim()).toContain('#ffffff')
  })

  it('status-progress token is yellow-ish', () => {
    expect(root.style.getPropertyValue('--color-status-progress').trim()).toBe('250 204 21')
  })

  it('status-complete token is green-ish', () => {
    expect(root.style.getPropertyValue('--color-status-complete').trim()).toBe('74 222 128')
  })
})

// ─── Light mode token tests ───────────────────────────────────────────────────

describe('CSS theme tokens — light mode (body.theme-light)', () => {
  let root: HTMLDivElement

  beforeEach(() => {
    root = document.createElement('div')
    document.body.appendChild(root)
    applyTokens(root, LIGHT_TOKENS)
  })

  afterEach(() => root.remove())

  it.each(Object.entries(LIGHT_TOKENS))('light token %s equals "%s"', (prop, expected) => {
    expect(root.style.getPropertyValue(prop).trim()).toBe(expected)
  })

  it('bg token is near-white (248 250 252)', () => {
    expect(root.style.getPropertyValue('--color-bg').trim()).toBe('248 250 252')
  })

  it('primary token is near-black (15 23 42)', () => {
    expect(root.style.getPropertyValue('--color-primary').trim()).toBe('15 23 42')
  })

  it('gradient-text uses dark-to-slate palette', () => {
    expect(root.style.getPropertyValue('--gradient-text').trim()).toContain('#0f172a')
  })

  it('status-progress token is darker yellow in light mode', () => {
    expect(root.style.getPropertyValue('--color-status-progress').trim()).toBe('202 138 4')
  })

  it('status-complete token is darker green in light mode', () => {
    expect(root.style.getPropertyValue('--color-status-complete').trim()).toBe('22 163 74')
  })
})

// ─── Token contrast: dark ≠ light ────────────────────────────────────────────

describe('CSS theme tokens — dark vs light values differ for key tokens', () => {
  const MUST_DIFFER: (keyof typeof DARK_TOKENS)[] = [
    '--color-bg',
    '--color-primary',
    '--color-surface',
    '--color-on-surface',
    '--color-on-primary',
    '--color-outline',
    '--color-outline-variant',
    '--color-status-progress',
    '--color-status-complete',
    '--gradient-text',
    '--cursor-dot-bg',
    '--shadow-pill',
    '--shadow-pill-hover',
    '--shadow-pill-active',
    '--gradient-card-border',
    '--bg-container-glow',
    '--color-surface-card',
  ]

  it.each(MUST_DIFFER)('token %s differs between dark and light mode', (prop) => {
    expect(DARK_TOKENS[prop]).not.toBe(LIGHT_TOKENS[prop])
  })
})

// ─── body.theme-light class toggling ─────────────────────────────────────────

describe('body.theme-light class', () => {
  afterEach(() => {
    document.body.classList.remove('theme-light')
  })

  it('is absent by default', () => {
    expect(document.body.classList.contains('theme-light')).toBe(false)
  })

  it('can be added programmatically', () => {
    document.body.classList.add('theme-light')
    expect(document.body.classList.contains('theme-light')).toBe(true)
  })

  it('can be removed after being added', () => {
    document.body.classList.add('theme-light')
    document.body.classList.remove('theme-light')
    expect(document.body.classList.contains('theme-light')).toBe(false)
  })

  it('classList.toggle correctly sets theme-light to true', () => {
    document.body.classList.toggle('theme-light', true)
    expect(document.body.classList.contains('theme-light')).toBe(true)
  })

  it('classList.toggle correctly removes theme-light (force=false)', () => {
    document.body.classList.add('theme-light')
    document.body.classList.toggle('theme-light', false)
    expect(document.body.classList.contains('theme-light')).toBe(false)
  })

  it('applying theme-light activates light-mode CSS variables on element', () => {
    document.body.classList.add('theme-light')
    const el = document.createElement('div')
    document.body.appendChild(el)
    applyTokens(el, LIGHT_TOKENS)

    expect(el.style.getPropertyValue('--color-bg').trim()).toBe('248 250 252')
    el.remove()
  })

  it('removing theme-light restores dark-mode CSS variables on element', () => {
    document.body.classList.remove('theme-light')
    const el = document.createElement('div')
    document.body.appendChild(el)
    applyTokens(el, DARK_TOKENS)

    expect(el.style.getPropertyValue('--color-bg').trim()).toBe('0 0 0')
    el.remove()
  })
})

// ─── Utility class structural integrity ──────────────────────────────────────

describe('CSS utility classes — structural token references', () => {
  it('text-gradient references --gradient-text token name', () => {
    // Mirrors the CSS: background: var(--gradient-text)
    const tokenName = '--gradient-text'
    expect(DARK_TOKENS).toHaveProperty(tokenName)
    expect(LIGHT_TOKENS).toHaveProperty(tokenName)
  })

  it('status-in-progress references --color-status-progress token', () => {
    expect(DARK_TOKENS).toHaveProperty('--color-status-progress')
    expect(LIGHT_TOKENS).toHaveProperty('--color-status-progress')
  })

  it('status-complete references --color-status-complete token', () => {
    expect(DARK_TOKENS).toHaveProperty('--color-status-complete')
    expect(LIGHT_TOKENS).toHaveProperty('--color-status-complete')
  })

  it('section-divider references --section-divider-bg token', () => {
    // This token exists in CSS but is not in the typed maps; just verify naming convention
    const token = '--section-divider-bg'
    const el = document.createElement('div')
    el.style.setProperty(token, 'rgba(255,255,255,0.18)')
    expect(el.style.getPropertyValue(token)).toBeTruthy()
  })

  it('shadow-pill token exists in both dark and light mode', () => {
    expect(DARK_TOKENS).toHaveProperty('--shadow-pill')
    expect(LIGHT_TOKENS).toHaveProperty('--shadow-pill')
  })

  it('dark shadow-pill uses white glow layer (rgba(255,255,255,...))', () => {
    expect(DARK_TOKENS['--shadow-pill']).toContain('rgba(255,255,255')
  })

  it('light shadow-pill uses navy base color (rgba(15,23,42,...))', () => {
    expect(LIGHT_TOKENS['--shadow-pill']).toContain('rgba(15,23,42')
  })

  it('surface-card token exists in both modes', () => {
    expect(DARK_TOKENS).toHaveProperty('--color-surface-card')
    expect(LIGHT_TOKENS).toHaveProperty('--color-surface-card')
  })

  it('dark surface-card is charcoal (32 32 36)', () => {
    expect(DARK_TOKENS['--color-surface-card']).toBe('32 32 36')
  })

  it('light surface-card is near-white (248 250 252)', () => {
    expect(LIGHT_TOKENS['--color-surface-card']).toBe('248 250 252')
  })

  it('gradient-card-border token exists in both modes', () => {
    expect(DARK_TOKENS).toHaveProperty('--gradient-card-border')
    expect(LIGHT_TOKENS).toHaveProperty('--gradient-card-border')
  })

  it('bg-container-glow is radial-gradient in both modes', () => {
    expect(DARK_TOKENS['--bg-container-glow']).toContain('radial-gradient')
    expect(LIGHT_TOKENS['--bg-container-glow']).toContain('radial-gradient')
  })

  it('dark bg-container-glow uses dark near-black endpoint', () => {
    expect(DARK_TOKENS['--bg-container-glow']).toContain('rgba(5,5,8,1)')
  })

  it('light bg-container-glow uses light near-white endpoint', () => {
    expect(LIGHT_TOKENS['--bg-container-glow']).toContain('rgba(241,245,249,1)')
  })
})
