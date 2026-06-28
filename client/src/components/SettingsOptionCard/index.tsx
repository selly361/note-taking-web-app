import clsx from 'clsx'
import type { ReactNode } from 'react'

type SettingsOptionCardProps = {
  name: string
  value: string
  title: string
  description: string
  checked: boolean
  onChange: () => void
  preview: ReactNode
}

export function SettingsOptionCard({
  name,
  value,
  title,
  description,
  checked,
  onChange,
  preview,
}: SettingsOptionCardProps) {
  return (
    <label
      className={clsx(
        'flex cursor-pointer items-center gap-4 rounded-xl border p-4 ',
        'has-:focus-visible:ring-2 has-:focus-visible:ring-blue-500 ',
        checked
          ? 'border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800'
          : 'border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800  dark:hover:bg-neutral-900',
      )}
    >
      <input
        checked={checked}
        className='sr-only'
        name={name}
        onChange={onChange}
        type='radio'
        value={value}
      />

      <span className='flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900'>
        {preview}
      </span>

      <span className='flex flex-1 flex-col'>
        <span className='text-label-sm tracking-title-sm text-neutral-950 dark:text-neutral-0 mb-1.5'>{title}</span>
        <span className='text-body-sm tracking-body-sm text-neutral-700 dark:text-neutral-300'>
          {description}
        </span>
      </span>

      <span
        aria-hidden='true'
        className={clsx(
          'flex size-5 shrink-0 items-center justify-center rounded-full border-2',
          checked ? 'border-blue-500' : 'border-neutral-500',
        )}
      >
        {checked && <span className='size-2 rounded-full bg-blue-500' />}
      </span>
    </label>
  )
}
