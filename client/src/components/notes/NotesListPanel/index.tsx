import { Link } from 'react-router'

const sampleNotes = [
  {
    id: 'react-performance',
    title: 'React Performance Optimisation',
  },
  {
    id: 'japan-travel',
    title: 'Japan Travel Planning',
  },
  {
    id: 'pasta-recipes',
    title: 'Favourite Pasta Recipes',
  },
]

export function NotesListPanel() {
  return (
    <aside className="border-r border-slate-800 p-4">
      <Link
        className="mb-4 block rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white"
        to="/notes/new"
      >
        Create New Note
      </Link>

      <div className="flex flex-col">
        {sampleNotes.map((note) => (
          <Link
            className="border-b border-slate-800 px-2 py-4 hover:bg-slate-900"
            key={note.id}
            to={`/notes/${note.id}`}
          >
            {note.title}
          </Link>
        ))}
      </div>
    </aside>
  )
}
