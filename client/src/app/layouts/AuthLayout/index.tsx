import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-800 p-6 text-slate-100">
      <section className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-950">
        <Outlet />
      </section>
    </main>
  )
}
