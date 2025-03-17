import { TNote } from '../../types/Note'
import { usePopup } from '../../hooks/usePopup';
// import { MessageSquareQuote } from 'lucide-react';
import cn from '../../utils/cn';

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
      className={cn('p-4 rounded-lg shadow-lg cursor-pointer hover:-translate-y-1 hover:shadow-xl',
        ' [transition:all_0.2s] relative overflow-hidden animation-popin')} // For some reason the regular transition-all tailwind DID NOT work when I tried
      style={{ background: note.bgColor }}
    >
      <div className="flex items-start">
        {/* <MessageSquareQuote className="h-5 w-5 opacity-60 mt-1 mr-1.5 flex-shrink-0" /> */}
        <p className="text-lg font-medium leading-tight [word-break:break-word;] text-white">„{note.title}”</p>
      </div>

      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-black/5"></div>
      <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-white/10"></div>
    </article>
  )
}

export default NoteCard