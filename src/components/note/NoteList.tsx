import { useNoteStore } from '../../store/notes.store'
import NoteCard from './NoteCard'

const NoteList = () => {
  const notes = useNoteStore(store => store.notes)

  return (
    <section className='flex flex-wrap gap-4 my-4 justify-center mx-2 sm:mx-4'>
      {notes.map(note =>
        <NoteCard key={note.id} note={note} />
      )}
    </section>
  )
}

export default NoteList