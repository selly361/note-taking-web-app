import { useLocation, useSearchParams } from 'react-router'
import { SearchInput } from '../SearchInput'

export function AppHeader() {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const view = searchParams.get('view')
  const tag = searchParams.get('tag')

  let title = 'All Notes'

  if (pathname.startsWith('/settings')) {
    title = 'Settings'
  } else if (view === 'archived') {
    title = 'Archived Notes'
  } else if (tag) {
    title = `Notes Tagged: ${tag}`
  }

  return (
    <header className="flex items-center justify-between gap-6 border-b border-slate-800 px-6 py-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <SearchInput />
    </header>
  )
}
