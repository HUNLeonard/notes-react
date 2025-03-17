import { TNote } from '../../types/Note'
import NoteCard from './NoteCard'
import { Layers } from 'lucide-react'

interface NoteListContentProps {
  notes: TNote[]
}

const NoteListContent = ({ notes }: NoteListContentProps) => {
  return (
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
  )
}

export default NoteListContent