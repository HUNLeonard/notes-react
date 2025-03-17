import React, { useCallback, useMemo, useState } from "react";
import { Type, PlusCircle } from "lucide-react";
import { colorOptions, MAX_TITLE_LENGTH } from "../../lib/conts";
import cn from "../../utils/cn";
import Input from "../common/Input";
import ColorPicker from "../common/ColorPicker";
import { useNoteStore } from "../../store/notes.store";

interface CreateNoteFormProps {
  onClose: () => void;
}

const CreateNoteForm = ({ onClose }: CreateNoteFormProps) => {
  const addNote = useNoteStore((store) => store.addNote);
  const [newNote, setNewNote] = useState({
    title: "",
    bgColor: `rgb(${0},${187},${119})`,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewNote(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, [setNewNote]);

  const handleColorSelect = useCallback((color: string) => {
    setNewNote(prev => ({
      ...prev,
      bgColor: color,
    }));
  }, [setNewNote]);

  const handleCreate = useCallback(() => {
    if (newNote.title.trim()) {
      addNote(newNote.title, newNote.bgColor);
      onClose();
    }
  }, [newNote.title, newNote.bgColor, addNote, onClose]);


  const titleError = useMemo(() => {
    if (!newNote.title.trim()) {
      return "Title cannot be empty";
    }
    if (newNote.title.length > MAX_TITLE_LENGTH) {
      return `Title exceeds maximum length of ${MAX_TITLE_LENGTH} characters`;
    }
    return "";
  }, [newNote.title]);

  const isCreateDisabled = useMemo(() =>
    newNote.title.length > MAX_TITLE_LENGTH || !newNote.title.trim(),
    [newNote.title]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-5 text-gray-900 flex items-center gap-2">
        Create New Note
      </h2>

      <div className="mb-5">
        <Input
          id="create-title"
          name="title"
          label="Title"
          value={newNote.title}
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
          selectedColor={newNote.bgColor}
          colorOptions={colorOptions}
          onColorSelect={handleColorSelect}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          className={cn("px-5 py-2.5 flex-1 rounded-lg font-medium text-white ",
            "disabled:opacity-50 not-disabled:hover:brightness-95 cursor-pointer disabled:cursor-not-allowed",
            " transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1.5")}
          onClick={handleCreate}
          style={{ backgroundColor: newNote.bgColor }}
          disabled={isCreateDisabled}
        >
          <PlusCircle size={18} />
          Create Note
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

export default CreateNoteForm;