import {
  COLOR_THEME_STORAGE_KEY,
  COLOR_THEMES,
  DEFAULT_COLOR_THEME,
  DEFAULT_FONT_THEME,
  FONT_THEME_STORAGE_KEY,
  FONT_THEMES,
} from '../constants'
import type { ColorTheme, FontTheme, ResolvedColorTheme } from '../types'

function isColorTheme(value: string | null): value is ColorTheme {
  return COLOR_THEMES.includes(value as ColorTheme)
}

function isFontTheme(value: string | null): value is FontTheme {
  return FONT_THEMES.includes(value as FontTheme)
}

export function getStoredColorTheme(): ColorTheme {
  const storedTheme = localStorage.getItem(COLOR_THEME_STORAGE_KEY)

  if (isColorTheme(storedTheme)) {
    return storedTheme
  }

  return DEFAULT_COLOR_THEME
}

export function getStoredFontTheme(): FontTheme {
  const storedTheme = localStorage.getItem(FONT_THEME_STORAGE_KEY)

  if (isFontTheme(storedTheme)) {
    return storedTheme
  }

  return DEFAULT_FONT_THEME
}

export function storeColorTheme(theme: ColorTheme) {
  localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme)
}

export function storeFontTheme(theme: FontTheme) {
  localStorage.setItem(FONT_THEME_STORAGE_KEY, theme)
}

export function getSystemColorTheme(): ResolvedColorTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function resolveColorTheme(theme: ColorTheme): ResolvedColorTheme {
  if (theme === 'system') {
    return getSystemColorTheme()
  }

  return theme
}
