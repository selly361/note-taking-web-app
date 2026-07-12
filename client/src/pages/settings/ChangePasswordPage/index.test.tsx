import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ChangePasswordPage } from '.'

function renderChangePasswordPage() {
  const user = userEvent.setup()

  render(<ChangePasswordPage />)

  return { user }
}

describe('ChangePasswordPage', () => {
  it('starts with the save button disabled', () => {
    renderChangePasswordPage()

    const saveButton = screen.getByRole('button', { name: /save password/i })

    expect(saveButton).toBeDisabled()
  })

  it('shows an error when the new password is too short', async () => {
    const { user } = renderChangePasswordPage()

    await user.type(screen.getByLabelText(/old password/i), 'password123')
    await user.type(screen.getByLabelText(/^new password$/i), 'short')
    await user.type(screen.getByLabelText(/confirm new password/i), 'short')

    expect(
      await screen.findByText(/new password must be at least 8 characters/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save password/i })).toBeDisabled()
  })

  it('shows an error when password confirmation does not match', async () => {
    const { user } = renderChangePasswordPage()

    await user.type(screen.getByLabelText(/old password/i), 'old-password')
    await user.type(screen.getByLabelText(/^new password$/i), 'new-password')
    await user.type(screen.getByLabelText(/confirm new password/i), 'different-password')

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save password/i })).toBeDisabled()
  })

  it('shows an error when the new password matches the old password', async () => {
    const { user } = renderChangePasswordPage()

    await user.type(screen.getByLabelText(/old password/i), 'same-password')
    await user.type(screen.getByLabelText(/^new password$/i), 'same-password')
    await user.type(screen.getByLabelText(/confirm new password/i), 'same-password')

    expect(
      await screen.findByText(/new password must be different from old password/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save password/i })).toBeDisabled()
  })

  it('enables the save button when all password fields are valid', async () => {
    const { user } = renderChangePasswordPage()

    await user.type(screen.getByLabelText(/old password/i), 'old-password')
    await user.type(screen.getByLabelText(/^new password$/i), 'new-password')
    await user.type(screen.getByLabelText(/confirm new password/i), 'new-password')

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /save password/i })).toBeEnabled()
    })
  })

  it('clears the form after a valid submit', async () => {
    const { user } = renderChangePasswordPage()

    const oldPasswordInput = screen.getByLabelText(/old password/i)
    const newPasswordInput = screen.getByLabelText(/^new password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm new password/i)

    await user.type(oldPasswordInput, 'old-password')
    await user.type(newPasswordInput, 'new-password')
    await user.type(confirmPasswordInput, 'new-password')
    await user.click(screen.getByRole('button', { name: /save password/i }))

    await waitFor(() => {
      expect(oldPasswordInput).toHaveValue('')
      expect(newPasswordInput).toHaveValue('')
      expect(confirmPasswordInput).toHaveValue('')
    })
  })
})