import { Link, NavLink } from 'react-router'

export function AppSidebar() {
  return (
    <aside className="border-r border-slate-800 p-4">
      <p className="mb-8 text-xl font-semibold">Notes</p>

      <nav aria-label="Main navigation" className="flex flex-col gap-2">
        <NavLink
          className="rounded-lg px-3 py-2 hover:bg-slate-800"
          end
          to="/notes"
        >
          All Notes
        </NavLink>

        <Link
          className="rounded-lg px-3 py-2 hover:bg-slate-800"
          to="/notes?view=archived"
        >
          Archived Notes
        </Link>

        <div className="my-3 border-t border-slate-800" />

        <p className="px-3 text-sm text-slate-500">Tags</p>

        <Link
          className="rounded-lg px-3 py-2 hover:bg-slate-800"
          to="/notes?tag=cooking"
        >
          Cooking
        </Link>

        <Link
          className="rounded-lg px-3 py-2 hover:bg-slate-800"
          to="/notes?tag=dev"
        >
          Dev
        </Link>

        <Link
          className="rounded-lg px-3 py-2 hover:bg-slate-800"
          to="/notes?tag=fitness"
        >
          Fitness
        </Link>

        <div className="my-3 border-t border-slate-800" />

        <NavLink
          className="rounded-lg px-3 py-2 hover:bg-slate-800"
          to="/settings/color-theme"
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}
