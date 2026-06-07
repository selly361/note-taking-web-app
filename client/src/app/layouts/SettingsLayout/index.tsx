import { Outlet } from 'react-router'
import { SettingsNavigation } from '../../../components'

export function SettingsLayout() {
  return (
    <div className="grid min-h-0 grid-cols-[15rem_minmax(0,1fr)]">
      <SettingsNavigation />

      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
