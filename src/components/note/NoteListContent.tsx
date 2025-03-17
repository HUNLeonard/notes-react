import { TNote } from '../../types/Note'
import NoteCard from './NoteCard'
import { Layers } from 'lucide-react'
import AddNoteButton from './AddNoteButton'

interface NoteListContentProps {
  notes: TNote[]
}

const NoteListContent = ({ notes }: NoteListContentProps) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-4 px-2">
        <Layers className="text-gray-500" size={20} />
        <h2 className="text-xl font-semibold text-gray-800">Your Notes ({notes.length})</h2>
      </div>

      <div className='columns-2 md:columns-3 lg:columns-4 space-y-2 xs:space-y-4 mx-auto'>

        {notes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
        <AddNoteButton />
      </div>
    </>
  )
}

export default NoteListContent