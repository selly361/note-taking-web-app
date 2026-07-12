import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { COLOR_THEME_STORAGE_KEY } from '@/constants'
import { ThemeProvider } from '@/contexts'
import { ColorThemePage } from '.'

function renderColorThemePage() {
  const user = userEvent.setup()

  render(
    <ThemeProvider>
      <ColorThemePage />
    </ThemeProvider>,
  )

  return { user }
}

describe('ColorThemePage', () => {
  it('renders each color theme option', () => {
    renderColorThemePage()

    expect(screen.getByRole('radio', { name: /light mode/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /dark mode/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /system/i })).toBeInTheDocument()
  })

  it('selects the stored color theme on initial render', () => {
    localStorage.setItem(COLOR_THEME_STORAGE_KEY, 'dark')

    renderColorThemePage()

    expect(screen.getByRole('radio', { name: /dark mode/i })).toBeChecked()
    expect(screen.getByRole('button', { name: /apply changes/i })).toBeDisabled()
  })

  it('disables the apply button until the user picks a different color theme', async () => {
    const { user } = renderColorThemePage()

    const applyButton = screen.getByRole('button', { name: /apply changes/i })

    expect(applyButton).toBeDisabled()

    await user.click(screen.getByRole('radio', { name: /dark mode/i }))

    expect(applyButton).toBeEnabled()
  })

  it('disables the apply button again when the user switches back to the current color theme', async () => {
    const { user } = renderColorThemePage()
    const applyButton = screen.getByRole('button', { name: /apply changes/i })

    await user.click(screen.getByRole('radio', { name: /dark mode/i }))

    expect(applyButton).toBeEnabled()

    await user.click(screen.getByRole('radio', { name: /system/i }))

    expect(applyButton).toBeDisabled()
  })

  it('applies the selected color theme when the form is submitted', async () => {
    const { user } = renderColorThemePage()

    await user.click(screen.getByRole('radio', { name: /dark mode/i }))
    await user.click(screen.getByRole('button', { name: /apply changes/i }))

    expect(localStorage.getItem(COLOR_THEME_STORAGE_KEY)).toBe('dark')
    expect(screen.getByRole('button', { name: /apply changes/i })).toBeDisabled()
  })
})
