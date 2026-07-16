import clsx from 'clsx'
import { useState, type FormEventHandler } from 'react'
import { SettingsOptionCard } from '@/components/settings/SettingsOptionCard'
import { useTheme } from '@/hooks'
import type { FontTheme } from '@/types'

const fontThemeOptions = [
  {
    value: 'sans',
    title: 'Sans-serif',
    description: 'Clean and modern, easy to read.',
    previewClassName: 'font-sans',
  },
  {
    value: 'serif',
    title: 'Serif',
    description: 'Classic and elegant for a timeless feel.',
    previewClassName: 'font-serif',
  },
  {
    value: 'mono',
    title: 'Monospace',
    description: 'Code-like, great for a technical vibe.',
    previewClassName: 'font-mono',
  },
] satisfies {
  value: FontTheme
  title: string
  description: string
  previewClassName: string
}[]

export function FontThemePage() {
  const { fontTheme, setFontTheme } = useTheme()
  const [selectedFontTheme, setSelectedFontTheme] = useState(fontTheme)

  const hasChanges = selectedFontTheme !== fontTheme

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    if (!hasChanges) return

    setFontTheme(selectedFontTheme)
  }

  return (
    <form className='max-w-xl pl-8 pt-8' onSubmit={handleSubmit}>
      <h2 className='text-title-sm tracking-title-sm font-semibold text-neutral-950 dark:text-neutral-0'>
        Font Theme
      </h2>

      <p className='mt-1 text-body-sm tracking-body-sm text-neutral-700 dark:text-neutral-300'>
        Choose your font theme:
      </p>

      <div className='mt-8 flex flex-col gap-4'>
        {fontThemeOptions.map(({ value, title, description, previewClassName }) => (
          <SettingsOptionCard
            checked={selectedFontTheme === value}
            description={description}
            key={value}
            name='font-theme'
            onChange={() => setSelectedFontTheme(value)}
            preview={
              <span
                className={clsx(
                  'text-title-sm tracking-title-sm font-semibold text-neutral-950 dark:text-neutral-0',
                  previewClassName,
                )}
              >
                Aa
              </span>
            }
            title={title}
            value={value}
          />
        ))}
      </div>

      <button
        className='mt-8 ml-auto text-label-sm tracking-label-sm block rounded-lg bg-blue-500 px-6 py-3 text-neutral-0 disabled:cursor-not-allowed disabled:opacity-50'
        disabled={!hasChanges}
        type='submit'
      >
        Apply Changes
      </button>
    </form>
  )
}
