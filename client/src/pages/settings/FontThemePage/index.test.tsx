import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FONT_THEME_STORAGE_KEY } from '@/constants'
import { ThemeProvider } from '@/contexts'
import { FontThemePage } from '.'

function renderFontThemePage() {
  const user = userEvent.setup()

  render(
    <ThemeProvider>
      <FontThemePage />
    </ThemeProvider>,
  )

  return { user }
}

describe('FontThemePage', () => {
  it('renders each font theme option', () => {
    renderFontThemePage()

    expect(screen.getByRole('radio', { name: 'Sans-serif' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Serif' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Monospace' })).toBeInTheDocument()
  })

  it('selects the stored font theme on initial render', () => {
    localStorage.setItem(FONT_THEME_STORAGE_KEY, 'mono')

    renderFontThemePage()

    expect(screen.getByRole('radio', { name: 'Monospace' })).toBeChecked()
    expect(screen.getByRole('button', { name: /apply changes/i })).toBeDisabled()
  })

  it('disables the apply button until the user picks a different font theme', async () => {
    const { user } = renderFontThemePage()

    const applyButton = screen.getByRole('button', { name: /apply changes/i })

    expect(applyButton).toBeDisabled()

    await user.click(screen.getByRole('radio', { name: 'Serif' }))

    expect(applyButton).toBeEnabled()
  })

  it('disables the apply button again when the user switches back to the current font theme', async () => {
    const { user } = renderFontThemePage()
    const applyButton = screen.getByRole('button', { name: /apply changes/i })

    await user.click(screen.getByRole('radio', { name: 'Serif' }))

    expect(applyButton).toBeEnabled()

    await user.click(screen.getByRole('radio', { name: 'Sans-serif' }))

    expect(applyButton).toBeDisabled()
  })

  it('applies the selected font theme when the form is submitted', async () => {
    const { user } = renderFontThemePage()

    await user.click(screen.getByRole('radio', { name: 'Serif' }))
    await user.click(screen.getByRole('button', { name: /apply changes/i }))

    expect(localStorage.getItem(FONT_THEME_STORAGE_KEY)).toBe('serif')
    expect(screen.getByRole('button', { name: /apply changes/i })).toBeDisabled()
  })
})
