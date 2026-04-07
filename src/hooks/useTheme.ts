import { useState, useEffect } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio-theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return { isDark, toggleTheme }
}
