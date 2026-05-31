export function NoteActionsPanel() {
  return (
    <aside className="flex flex-col gap-3 border-l border-slate-800 p-4">
      <button
        className="rounded-lg border border-slate-700 px-4 py-2 text-left disabled:opacity-50"
        disabled
        type="button"
      >
        Archive Note
      </button>

      <button
        className="rounded-lg border border-slate-700 px-4 py-2 text-left disabled:opacity-50"
        disabled
        type="button"
      >
        Delete Note
      </button>
    </aside>
  )
}
