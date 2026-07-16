import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SettingsOptionCard } from '.'

function renderSettingsOptionCard({
  checked = false,
  onChange = vi.fn(),
}: {
  checked?: boolean
  onChange?: () => void
} = {}) {
  const user = userEvent.setup()

  render(
    <SettingsOptionCard
      checked={checked}
      description="Use the dark color theme"
      name="color-theme"
      onChange={onChange}
      preview={<span aria-hidden="true">Preview</span>}
      title="Dark Mode"
      value="dark"
    />,
  )

  return { onChange, user }
}

describe('SettingsOptionCard', () => {
  it('renders a radio option with its title and description', () => {
    renderSettingsOptionCard()

    const radio = screen.getByRole('radio', { name: /dark mode/i })

    expect(radio).toBeInTheDocument()
    expect(screen.getByText(/use the dark color theme/i)).toBeInTheDocument()
  })

  it('shows the radio as checked when checked is true', () => {
    renderSettingsOptionCard({ checked: true })

    expect(screen.getByRole('radio', { name: /dark mode/i })).toBeChecked()
  })

  it('calls onChange when the user selects the option', async () => {
    const { onChange, user } = renderSettingsOptionCard()

    await user.click(screen.getByRole('radio', { name: /dark mode/i }))

    expect(onChange).toHaveBeenCalledOnce()
  })

  it('does not call onChange when the checked option is clicked again', async () => {
    const { onChange, user } = renderSettingsOptionCard({ checked: true })

    await user.click(screen.getByRole('radio', { name: /dark mode/i }))

    expect(onChange).not.toHaveBeenCalled()
  })
})
