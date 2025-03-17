import React, { useCallback, useMemo, useState } from "react";
import { TNote } from "../../types/Note";
import { Type, Save, Trash2 } from "lucide-react";
import { colorOptions, MAX_TITLE_LENGTH } from "../../lib/conts";
import cn from "../../utils/cn";
import Input from "../common/Input";
import ColorPicker from "../common/ColorPicker";
import { useNoteStore } from "../../store/notes.store";

interface EditNoteFormProps {
  note: TNote;
  onClose: () => void;
}

const EditNoteForm = ({ note, onClose }: EditNoteFormProps) => {
  const updateNote = useNoteStore(store => store.updateNote);
  const removeNote = useNoteStore(store => store.removeNote);
  const [noteData, setNoteData] = useState<TNote>({ ...note });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNoteData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, [setNoteData]);

  const handleColorSelect = useCallback((color: string) => {
    setNoteData(prev => ({
      ...prev,
      bgColor: color
    }));
  }, [setNoteData]);

  const handleSave = useCallback(() => {
    if (noteData.title.trim()) {
      updateNote(
        noteData.id,
        noteData.title,
        noteData.bgColor
      );
      onClose();
    }
  }, [noteData.id, noteData.title, noteData.bgColor, updateNote, onClose]);

  const handleDelete = useCallback(() => {
    if (isDeleting) {
      removeNote(noteData.id);
      onClose();
    } else {
      setIsDeleting(true);
    }
  }, [isDeleting, noteData.id, removeNote, onClose]);


  const titleError = useMemo(() => {
    if (!noteData.title.trim()) {
      return "Title cannot be empty";
    }
    if (noteData.title.length > MAX_TITLE_LENGTH) {
      return `Title exceeds maximum length of ${MAX_TITLE_LENGTH} characters`;
    }
    return "";
  }, [noteData.title]);

  const isSaveDisabled = useMemo(() =>
    noteData.title.length > MAX_TITLE_LENGTH || !noteData.title.trim(),
    [noteData.title]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-5 text-gray-900 flex items-center gap-2">
        Edit Note
      </h2>

      <div className="mb-5">
        <Input
          id="edit-title"
          name="title"
          label="Title"
          value={noteData.title}
          onChange={handleChange}
          icon={<Type size={16} />}
          maxLength={MAX_TITLE_LENGTH}
          error={titleError}
          counter={true}
          isTextarea={true}
          autoFocus={true}
        />
      </div>

      <div className="mb-6">
        <ColorPicker
          selectedColor={noteData.bgColor}
          colorOptions={colorOptions}
          onColorSelect={handleColorSelect}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          className={cn("px-5 py-2.5 flex-1 rounded-lg font-medium text-white ",
            "disabled:opacity-50 not-disabled:hover:brightness-95 cursor-pointer disabled:cursor-not-allowed",
            " transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1.5")}
          onClick={handleSave}
          style={{ backgroundColor: noteData.bgColor }}
          disabled={isSaveDisabled}
        >
          <Save size={18} />
          Save
        </button>

        <button
          className={`px-5 py-2.5 flex-1 text-white rounded-lg font-medium transition-all duration-200",
            " shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1.5",
            " whitespace-nowrap cursor-pointer ${isDeleting ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-500 hover:bg-gray-600'}`}
          onClick={handleDelete}
        >
          <Trash2 size={18} />
          {isDeleting ? 'Confirm Delete' : 'Delete'}
        </button>

        <button
          className={cn("px-5 py-2.5 flex-1 bg-white text-gray-700 rounded-lg font-medium",
            " hover:bg-gray-100 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer")}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditNoteForm;