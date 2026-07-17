import { useState } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { EyeIcon, EyeOffIcon } from '@/assets/icons'
import { TextField } from '@/components/ui/TextField'

type PasswordFieldProps = {
  id: string
  label: string
  registration: UseFormRegisterReturn
  error?: string
  hint?: string
  autoComplete?: string
}

export function PasswordField({
  id,
  label,
  registration,
  error,
  hint,
  autoComplete,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <TextField
      autoComplete={autoComplete}
      error={error}
      hint={hint}
      id={id}
      label={label}
      registration={registration}
      rightElement={
        <button
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          className="flex size-12 shrink-0 items-center justify-center text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-0"
          onClick={() => setIsVisible((currentValue) => !currentValue)}
          type="button"
        >
          {isVisible ? (
            <EyeOffIcon className="size-5" />
          ) : (
            <EyeIcon className="size-5" />
          )}
        </button>
      }
      type={isVisible ? 'text' : 'password'}
    />
  )
}
