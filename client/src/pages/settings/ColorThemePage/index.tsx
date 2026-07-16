import { useState } from 'react'
import { MoonIcon, SunIcon, SystemThemeIcon } from '@/assets/icons'
import { SettingsOptionCard } from '@/components/settings/SettingsOptionCard'
import { useTheme } from '@/hooks'
import type { ColorTheme } from '@/types'

const colorThemeOptions = [
  {
    value: 'light',
    title: 'Light Mode',
    description: 'Pick a clean and classic light theme',
    icon: SunIcon,
  },
  {
    value: 'dark',
    title: 'Dark Mode',
    description: 'Select a sleek and modern dark theme',
    icon: MoonIcon,
  },
  {
    value: 'system',
    title: 'System',
    description: "Adapts to your device's theme",
    icon: SystemThemeIcon,
  },
] satisfies {
  value: ColorTheme
  title: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}[]

export function ColorThemePage() {
  const { colorTheme, setColorTheme } = useTheme()
  const [selectedColorTheme, setSelectedColorTheme] = useState(colorTheme)

  const hasChanges = selectedColorTheme !== colorTheme

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!hasChanges) return

    setColorTheme(selectedColorTheme)
  }

  return (
    <form className='max-w-xl pl-8 pt-8' onSubmit={handleSubmit}>
      <h2 className='text-title-sm tracking-title-sm font-semibold text-neutral-950 dark:text-neutral-0'>
        Color Theme
      </h2>
      <p className='mt-1 text-body-sm tracking-body-sm text-neutral-700 dark:text-neutral-300'>
        Choose your color theme:
      </p>

      <div className='mt-8 flex flex-col gap-4'>
        {colorThemeOptions.map(({ value, title, description, icon: Icon }) => (
          <SettingsOptionCard
            checked={selectedColorTheme === value}
            description={description}
            key={value}
            name='color-theme'
            onChange={() => setSelectedColorTheme(value)}
            preview={<Icon className='size-6 dark:text-neutral-0 text-neutral-950' />}
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
