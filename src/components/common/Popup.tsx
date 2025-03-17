import React, { useEffect, useState } from "react";
import { usePopup } from "../../hooks/usePopup";
import { useNoteStore } from "../../store/notes.store";
import { TNote } from "../../types/Note";
import { colorOptions, MAX_TITLE_LENGTH } from "../lib/conts";
import { Type, Palette, Save, Trash2 } from "lucide-react";

const Popup = () => {
  const { isPopupOpen, closePopup, editNote } = usePopup();
  const [noteData, setNoteData] = useState<TNote | null>(null);
  const removeNote = useNoteStore(store => store.removeNote);
  const updateNote = useNoteStore(store => store.updateNote);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (editNote) {
      setNoteData({ ...editNote });
      setIsDeleting(false);
    } else {
      closePopup();
    }
  }, [editNote, closePopup]);

  const handleSave = () => {
    if (noteData) {
      updateNote(
        noteData.id,
        noteData.title,
        noteData.bgColor
      );
      closePopup();
    }
  };

  const handleDelete = () => {
    if (isDeleting) {
      if (noteData) {
        removeNote(noteData.id);
        closePopup();
      }
    } else {
      setIsDeleting(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (noteData) {
      setNoteData({
        ...noteData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleColorSelect = (color: string) => {
    if (noteData) {
      setNoteData({
        ...noteData,
        bgColor: color
      });
    }
  };

  if (!noteData || !isPopupOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full h-full p-4 bg-black/40 backdrop-blur-xs z-50"
    >
      <div
        className="relative max-w-md w-full mx-auto bg-gray-800 p-6 rounded-xl shadow-2xl"
        style={{ borderTop: `5px solid ${noteData.bgColor}` }}
      >

        <h2 className="text-2xl font-bold mb-5 text-gray-100 flex items-center gap-2">
          Edit Note
        </h2>

        <div className="mb-5">
          <label className="flex items-center gap-1.5 text-sm font-medium mb-2 text-gray-200">
            <Type size={16} />
            Title <span className="text-gray-400 text-xs ml-1">({noteData.title.length}/{MAX_TITLE_LENGTH})</span>
          </label>
          <textarea
            name="title"
            value={noteData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg transition-all min-h-24 resize-y bg-gray-200"
            maxLength={MAX_TITLE_LENGTH}
          />
          {noteData.title.length > MAX_TITLE_LENGTH && (
            <p className="text-red-500 text-sm mt-1">
              Title exceeds maximum length of {MAX_TITLE_LENGTH} characters
            </p>
          )}
          {!noteData.title.trim() && (
            <p className="text-red-500 text-sm mt-1 font-bold">
              Title cannot be empty
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-1.5 text-sm font-medium mb-2 text-gray-200">
            <Palette size={16} />
            Background Color
          </label>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                onClick={() => handleColorSelect(color)}
                className={`size-10 rounded-full cursor-pointer border hover:scale-110 transition-transform ${noteData.bgColor === color ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-300'}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="px-5 py-2.5 flex-1 rounded-lg font-medium text-black disabled:opacity-50 not-disabled:hover:brightness-95 cursor-pointer disabled:cursor-not-allowed transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
            onClick={handleSave}
            style={{ backgroundColor: noteData.bgColor }}
            disabled={noteData.title.length > MAX_TITLE_LENGTH || !noteData.title.trim()}
          >
            <Save size={18} />
            Save
          </button>

          <button
            className={`px-5 py-2.5 flex-1 text-white rounded-lg font-medium transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${isDeleting ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-500 hover:bg-gray-600'}`}
            onClick={handleDelete}
          >
            <Trash2 size={18} />
            {isDeleting ? 'Confirm Delete' : 'Delete'}
          </button>

          <button
            className="px-5 py-2.5 flex-1 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all shadow-md cursor-pointer"
            onClick={closePopup}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;