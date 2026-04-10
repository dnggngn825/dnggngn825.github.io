import { useState, useEffect } from 'react'

export function usePrefersDarkMode(): [boolean, (value: boolean | ((prev: boolean) => boolean)) => void] {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    document.body.classList.toggle('theme-light', !isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => setIsDarkMode(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return [isDarkMode, setIsDarkMode]
}
