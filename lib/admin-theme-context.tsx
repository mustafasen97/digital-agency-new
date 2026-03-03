'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return
    }

    // Load theme from localStorage or system preference
    const stored = localStorage.getItem('admin-theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = stored || (prefersDark ? 'dark' : 'light')
    
    setTheme(initialTheme)
    
    // Apply theme to document
    const root = document.documentElement
    root.setAttribute('data-admin-theme', initialTheme)
    
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (typeof window === 'undefined') {
      return
    }

    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    
    // Apply theme to document and localStorage
    const root = document.documentElement
    root.setAttribute('data-admin-theme', newTheme)
    localStorage.setItem('admin-theme', newTheme)
  }

  // Render children immediately but without theme context until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useAdminTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useAdminTheme must be used within AdminThemeProvider')
  }
  return context
}
