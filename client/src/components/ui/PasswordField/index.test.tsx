import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { PasswordField } from '.'

function createRegistration(name = 'password') {
  return {
    name,
    onBlur: vi.fn(),
    onChange: vi.fn(),
    ref: vi.fn(),
  }
}

function renderPasswordField({
  error,
  hint,
}: {
  error?: string
  hint?: string
} = {}) {
  const user = userEvent.setup()
  const registration = createRegistration()

  render(
    <PasswordField
      autoComplete="current-password"
      error={error}
      hint={hint}
      id="password"
      label="Password"
      registration={registration}
    />,
  )

  return { registration, user }
}

describe('PasswordField', () => {
  it('renders a password input with its label', () => {
    renderPasswordField()

    const input = screen.getByLabelText('Password', { selector: 'input' })

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('autocomplete', 'current-password')
  })

  it('toggles password visibility when the user clicks the visibility button', async () => {
    const { user } = renderPasswordField()
    const input = screen.getByLabelText('Password', { selector: 'input' })

    await user.click(screen.getByRole('button', { name: /show password/i }))

    expect(input).toHaveAttribute('type', 'text')

    await user.click(screen.getByRole('button', { name: /hide password/i }))

    expect(input).toHaveAttribute('type', 'password')
  })

  it('passes input events to the registered form handlers', async () => {
    const { registration, user } = renderPasswordField()
    const input = screen.getByLabelText('Password', { selector: 'input' })

    await user.type(input, 'secret')
    await user.tab()

    expect(input).toHaveValue('secret')
    expect(registration.onChange).toHaveBeenCalled()
    expect(registration.onBlur).toHaveBeenCalledOnce()
  })

  it('shows hint text when a hint is provided', () => {
    renderPasswordField({ hint: 'At least 8 characters' })

    const input = screen.getByLabelText('Password', { selector: 'input' })

    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument()
    expect(input).toHaveAccessibleDescription(/at least 8 characters/i)
    expect(input).toHaveAttribute('aria-invalid', 'false')
  })

  it('shows an error message and marks the input as invalid', () => {
    renderPasswordField({ error: 'Password is required' })

    const input = screen.getByLabelText('Password', { selector: 'input' })

    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
    expect(input).toHaveAccessibleDescription(/password is required/i)
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })
})
