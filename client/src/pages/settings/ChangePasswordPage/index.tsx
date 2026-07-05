import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PasswordField } from '@/components'
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from '@/schemas'

export function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  function handleChangePassword(_values: ChangePasswordFormValues) {
    // TODO: connect this to the backend once auth is done.
    reset()
  }

  return (
    <form
      className="max-w-xl pl-8 pt-8"
      noValidate
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <h2 className="text-title-sm font-semibold tracking-title-sm text-neutral-950 dark:text-neutral-0">
        Change Password
      </h2>

      <div className="mt-8 flex flex-col gap-6">
        <PasswordField
          autoComplete="current-password"
          error={errors.currentPassword?.message}
          id="currentPassword"
          label="Old Password"
          registration={register('currentPassword')}
        />

        <PasswordField
          autoComplete="new-password"
          error={errors.newPassword?.message}
          hint="At least 8 characters"
          id="newPassword"
          label="New Password"
          registration={register('newPassword')}
        />

        <PasswordField
          autoComplete="new-password"
          error={errors.confirmNewPassword?.message}
          id="confirmNewPassword"
          label="Confirm New Password"
          registration={register('confirmNewPassword')}
        />
      </div>

      <button
        className="mt-8 ml-auto block rounded-lg bg-blue-500 px-6 py-3 text-label-sm tracking-label-sm text-neutral-0 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!isDirty || !isValid}
        type="submit"
      >
        Save Password
      </button>
    </form>
  )
}