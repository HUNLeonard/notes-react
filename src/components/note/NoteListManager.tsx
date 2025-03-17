import { useNoteStore } from '../../store/notes.store'
import EmptyNotesList from './EmptyNotesList'
import NoteListContent from './NoteListContent'

const NoteListManager = () => {
  const notes = useNoteStore(store => store.notes)

  return (
    <section className='px-4'>
      {notes.length > 0 ? (
        <NoteListContent notes={notes} />
      ) : (
        <EmptyNotesList />
      )}
    </section>
  )
}

export default NoteListManager