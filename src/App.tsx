import Popup from './components/common/Popup'
import NoteListManager from './components/note/NoteListManager'
import PopupProvider from './components/providers/PopupProvider'

export default function App() {
  return (
    <PopupProvider>
      <main className='max-w-8xl min-h-screen mx-auto py-6'>
        <NoteListManager />
        <Popup />
      </main>
    </PopupProvider>
  )
}