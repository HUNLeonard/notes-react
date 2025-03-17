import { Layers } from 'lucide-react';
import AddNoteButton from './AddNoteButton';

const EmptyNotesList = () => {
  return (
    <div className="text-center py-10">
      <div className="inline-flex justify-center items-center size-16 rounded-full bg-gray-100 mb-4">
        <Layers className="text-gray-800" size={28} />
      </div>
      <h3 className="text-lg font-medium text-gray-500 mb-4">No notes yet</h3>

      <div className="max-w-xs mx-auto">
        <AddNoteButton />
      </div>
    </div>
  );
};


export default EmptyNotesList;