import { useNoteStore } from '../../store/notes.store'
import NoteCard from './NoteCard'
import { Layers } from 'lucide-react'

const NoteList = () => {
  const notes = useNoteStore(store => store.notes)

  return (
    <section className='py-6 px-4'>
      {notes.length > 0 ? (
        <>
          <div className="flex items-center gap-2 mb-4 px-2">
            <Layers className="text-gray-500" size={20} />
            <h2 className="text-xl font-semibold text-gray-200">Your Notes ({notes.length})</h2>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-4 mx-auto'>
            {notes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <div className="inline-flex justify-center items-center size-16 rounded-full bg-gray-100 mb-4">
            <Layers className="text-gray-800" size={28} />
          </div>
          <h3 className="text-lg font-medium text-gray-500 mb-1">No notes yet</h3>
          <p className="text-gray-700">Create your first note.</p>
        </div>
      )}
    </section>
  )
}

export default NoteList