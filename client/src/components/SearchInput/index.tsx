import type { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router'

export function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextSearchParams = new URLSearchParams(searchParams)
    const value = event.target.value

    if (value) {
      nextSearchParams.set('search', value)
    } else {
      nextSearchParams.delete('search')
    }

    setSearchParams(nextSearchParams, { replace: true })
  }

  return (
    <input
      aria-label="Search notes"
      className="w-full max-w-80 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
      onChange={handleChange}
      placeholder="Search by title, content, or tags..."
      type="search"
      value={search}
    />
  )
}
