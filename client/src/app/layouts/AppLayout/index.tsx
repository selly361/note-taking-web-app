import { Outlet } from 'react-router'
import { AppHeader, AppSidebar } from '../../../components'

export function AppLayout() {
  return (
    <div className="grid min-h-screen grid-cols-[15rem_minmax(0,1fr)] bg-slate-950 text-slate-100">
      <AppSidebar />

      <div className="grid min-w-0 grid-rows-[auto_1fr]">
        <AppHeader />
        <Outlet />
      </div>
    </div>
  )
}
