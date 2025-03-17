
import Popup from './components/common/Popup'
import NewNoteForm from './components/note/NewNoteForm'
import NoteList from './components/note/NoteList'
import PopupProvider from './components/providers/PopupProvider'

export default function App() {
  return (
    <PopupProvider>
      <main className='max-w-8xl min-h-screen mx-auto'>
        <NewNoteForm />
        <NoteList />
        <Popup />
      </main>
    </PopupProvider>
  )
}
