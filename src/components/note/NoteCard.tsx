import { TNote } from '../../types/Note'
import { usePopup } from '../../hooks/usePopup';

interface NoteCardProps {
  note: TNote;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const { openPopup, setEditNote } = usePopup()

  const handleClick = () => {
    setEditNote(note);
    openPopup()
  }

  return (
    <article
      onClick={handleClick}
      className='p-4 rounded-lg shadow-md cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 flex-1 max-w-78 min-w-30 break-words'
      style={{ background: note.bgColor }}>
      „{note.title}”
    </article>
  )
}

export default NoteCard