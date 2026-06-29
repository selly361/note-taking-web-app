import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ColorTheme, FontTheme, ResolvedColorTheme } from '@/types'
import {
  getStoredColorTheme,
  getStoredFontTheme,
  getSystemColorTheme,
  storeColorTheme,
  storeFontTheme,
} from '@/utils'

type ThemeContextValue = {
  colorTheme: ColorTheme
  resolvedColorTheme: ResolvedColorTheme
  fontTheme: FontTheme
  setColorTheme: (theme: ColorTheme) => void
  setFontTheme: (theme: FontTheme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: PropsWithChildren) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() =>
    getStoredColorTheme(),
  )

  const [fontTheme, setFontThemeState] = useState<FontTheme>(() =>
    getStoredFontTheme(),
  )

  const [systemColorTheme, setSystemColorTheme] =
    useState<ResolvedColorTheme>(() => getSystemColorTheme())

  const resolvedColorTheme: ResolvedColorTheme =
    colorTheme === 'system' ? systemColorTheme : colorTheme

  const setColorTheme = useCallback((theme: ColorTheme) => {
    setColorThemeState(theme)
    storeColorTheme(theme)
  }, [])

  const setFontTheme = useCallback((theme: FontTheme) => {
    setFontThemeState(theme)
    storeFontTheme(theme)
  }, [])

  useEffect(() => {
    if (colorTheme !== 'system') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    function handleSystemThemeChange(event: MediaQueryListEvent) {
      setSystemColorTheme(event.matches ? 'dark' : 'light')
    }

    setSystemColorTheme(mediaQuery.matches ? 'dark' : 'light')

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [colorTheme])

  useEffect(() => {
    document.documentElement.dataset.colorTheme = resolvedColorTheme
  }, [resolvedColorTheme])

  useEffect(() => {
    document.documentElement.dataset.fontTheme = fontTheme
  }, [fontTheme])

  const value = useMemo(
    () => ({
      colorTheme,
      resolvedColorTheme,
      fontTheme,
      setColorTheme,
      setFontTheme,
    }),
    [colorTheme, resolvedColorTheme, fontTheme, setColorTheme, setFontTheme],
  )

  return (
    <ThemeContext value={value}>{children}</ThemeContext>
  )
}