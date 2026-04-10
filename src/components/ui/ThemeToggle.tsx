interface ThemeToggleProps {
  isDarkMode: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-outline text-secondary hover:border-primary hover:text-primary transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <span className="material-symbols-outlined text-base">
        {isDarkMode ? 'wb_sunny' : 'dark_mode'}
      </span>
    </button>
  )
}
