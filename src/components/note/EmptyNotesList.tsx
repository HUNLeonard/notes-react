import { Layers } from 'lucide-react';

const EmptyNotesList = () => {
  return (
    <div className="text-center py-10">
      <div className="inline-flex justify-center items-center size-16 rounded-full bg-gray-100 mb-4">
        <Layers className="text-gray-800" size={28} />
      </div>
      <h3 className="text-lg font-medium text-gray-500 mb-1">No notes yet</h3>
      <p className="text-gray-700">Create your first note.</p>
    </div>
  );
};

export default EmptyNotesList;