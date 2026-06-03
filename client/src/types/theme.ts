export type ColorTheme = 'light' | 'dark' | 'system'

export type ResolvedColorTheme = Exclude<ColorTheme, 'system'>

export type FontTheme = 'sans' | 'serif' | 'mono'