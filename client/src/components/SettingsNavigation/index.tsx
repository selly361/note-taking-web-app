import clsx from 'clsx'
import { NavLink } from 'react-router'
import {
  ChevronRightIcon,
  FontIcon,
  LogoutIcon,
  PasswordIcon,
  SunIcon,
} from '../../assets/icons'

const settingsLinks = [
  {
    label: 'Color Theme',
    to: '/settings/color-theme',
    icon: SunIcon,
  },
  {
    label: 'Font Theme',
    to: '/settings/font-theme',
    icon: FontIcon,
  },
  {
    label: 'Change Password',
    to: '/settings/change-password',
    icon: PasswordIcon,
  },
]

export function SettingsNavigation() {
  return (
    <nav
      aria-label='Settings navigation'
      className='flex flex-col gap-2 border-r border-neutral-200 p-4 text-body-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-200'
    >
      {settingsLinks.map(({ label, to, icon: Icon }) => (
        <NavLink
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-2 rounded-lg px-3 py-2',
              isActive
                ? 'bg-neutral-100 text-neutral-950 dark:bg-neutral-800 dark:text-neutral-0'
                : 'hover:bg-neutral-100 hover:text-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-0',
            )
          }
          key={to}
          to={to}
        >
          {({ isActive }) => (
            <>
              <Icon className={clsx('size-5 shrink-0', isActive && 'text-blue-500')} />

              <span>{label}</span>

              {isActive && <ChevronRightIcon className='ml-auto size-5 shrink-0' />}
            </>
          )}
        </NavLink>
      ))}

      <button
        className='mt-4 flex items-center gap-2 border-t border-neutral-200 px-3 pt-4 text-left hover:text-neutral-950 dark:border-neutral-800 dark:hover:text-neutral-0'
        type='button'
      >
        <LogoutIcon className='size-5 shrink-0' />
        Logout
      </button>
    </nav>
  )
}
