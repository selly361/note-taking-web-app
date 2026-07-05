import clsx from 'clsx'
import type { InputHTMLAttributes, ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { InfoCircleIcon } from '@/assets/icons'

type TextFieldProps = {
  id: string
  label: string
  registration?: UseFormRegisterReturn
  error?: string
  hint?: string
  rightElement?: ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>

export function TextField({
  id,
  label,
  registration,
  error,
  hint,
  rightElement,
  className,
  ...inputProps
}: TextFieldProps) {
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
          'flex h-12 items-center rounded-lg border bg-transparent',
          'focus-within:border-blue-500',
          error
            ? 'border-red-500'
            : 'border-neutral-300 dark:border-neutral-600',
        )}
      >
        <input
          {...inputProps}
          {...registration}
          aria-describedby={hasDescription ? descriptionId : undefined}
          aria-invalid={Boolean(error)}
          className={clsx(
            'min-w-0 flex-1 bg-transparent px-4 text-body-sm tracking-body-sm text-neutral-950 outline-none placeholder:text-neutral-500 dark:text-neutral-0 dark:placeholder:text-neutral-500',
            className,
          )}
          id={id}
        />

        {rightElement}
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