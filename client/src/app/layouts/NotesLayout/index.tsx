import { Outlet } from 'react-router'
import {
  NoteActionsPanel,
  NotesListPanel,
} from '../../../components'

export function NotesLayout() {
  return (
    <div className="grid min-h-0 grid-cols-[20rem_minmax(0,1fr)_14rem]">
      <NotesListPanel />

      <main className="min-w-0">
        <Outlet />
      </main>

      <NoteActionsPanel />
    </div>
  )
}
