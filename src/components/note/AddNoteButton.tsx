import { PlusCircle } from 'lucide-react';
import { usePopup } from '../../hooks/usePopup';
import cn from '../../utils/cn';

const AddNoteButton = () => {
  const { openPopup, setCreateMode } = usePopup();

  const handleClick = () => {
    setCreateMode(true);
    openPopup();
  };

  return (
    <article
      onClick={handleClick}
      className={cn('p-4 rounded-lg shadow-lg cursor-pointer hover:-translate-y-1 hover:shadow-xl',
        ' [transition:all_0.2s] relative overflow-hidden animation-popin bg-gray-300')}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="flex justify-center items-center rounded-full bg-gray-200">
          <PlusCircle className="text-gray-600" size={24} />
        </div>
        <p className="text-gray-700 font-medium">Add New Note</p>
      </div>
    </article>
  );
};

export default AddNoteButton;