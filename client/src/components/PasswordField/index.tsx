import clsx from 'clsx'
import { useState } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { EyeIcon, EyeOffIcon, InfoCircleIcon } from '@/assets/icons'

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

  const descriptionId = `${id}-description`
  const hasDescription = Boolean(error || hint)

  return (
    <div>
      <label
        className="mb-2 block text-label-sm tracking-label-sm text-neutral-950 dark:text-neutral-0"
        htmlFor={id}
      >
        {label}
      </label>

      <div
        className={clsx(
          'flex items-center rounded-lg border bg-transparent',
          'focus-within:border-blue-500',
          error
            ? 'border-red-500'
            : 'border-neutral-300 dark:border-neutral-600',
        )}
      >
        <input
          {...registration}
          aria-describedby={hasDescription ? descriptionId : undefined}
          aria-invalid={Boolean(error)}
          autoComplete={autoComplete}
          className="h-12 min-w-0 flex-1 bg-transparent px-4 text-body-sm tracking-body-sm text-neutral-950 outline-none dark:text-neutral-0"
          id={id}
          type={isVisible ? 'text' : 'password'}
        />

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
      </div>

      {hasDescription && (
        <p
          className={clsx(
            'mt-2 flex items-center gap-2 text-body-sm tracking-body-sm',
            error ? 'text-red-500' : 'text-neutral-500 dark:text-neutral-400',
          )}
          id={descriptionId}
        >
          <InfoCircleIcon className="size-4 shrink-0" />
          {error || hint}
        </p>
      )}
    </div>
  )
}