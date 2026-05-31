import { NavLink } from 'react-router'

const settingsLinks = [
  {
    label: 'Color Theme',
    to: '/settings/color-theme',
  },
  {
    label: 'Font Theme',
    to: '/settings/font-theme',
  },
  {
    label: 'Change Password',
    to: '/settings/change-password',
  },
]

export function SettingsNavigation() {
  return (
    <nav
      aria-label="Settings navigation"
      className="flex flex-col gap-2 border-r border-slate-800 p-4"
    >
      {settingsLinks.map((link) => (
        <NavLink
          className="rounded-lg px-3 py-2 hover:bg-slate-800"
          key={link.to}
          to={link.to}
        >
          {link.label}
        </NavLink>
      ))}

      <button
        className="mt-4 border-t border-slate-800 px-3 pt-4 text-left"
        type="button"
      >
        Logout
      </button>
    </nav>
  )
}
