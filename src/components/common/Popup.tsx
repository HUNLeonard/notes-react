import React, { useEffect, useState } from "react";
import { usePopup } from "../../hooks/usePopup";
import { useNoteStore } from "../../store/notes.store";
import { TNote } from "../../types/Note";
import { colorOptions, MAX_TITLE_LENGTH } from "../lib/conts";

const Popup = () => {
  const { isPopupOpen, closePopup, editNote } = usePopup();
  const [noteData, setNoteData] = useState<TNote | null>(null);
  const removeNote = useNoteStore(store => store.removeNote);
  const updateNote = useNoteStore(store => store.updateNote);

  useEffect(() => {
    if (editNote) {
      setNoteData({ ...editNote });
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
    if (noteData) {
      removeNote(noteData.id);
      closePopup();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      className="fixed inset-0 grid place-content-center w-full h-full sm:px-4 bg-black/20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-128 w-full mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Edit card</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title - ({noteData.title.length})</label>
          <input
            type="text"
            name="title"
            required
            value={noteData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {noteData.title.length > MAX_TITLE_LENGTH && <p className="text-red-500 text-sm">You cant have a title longer then {MAX_TITLE_LENGTH}!</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Background Color</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                onClick={() => handleColorSelect(color)}
                className={`size-8 rounded-full cursor-pointer border hover:scale-110 transition-transform ${noteData.bgColor === color ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-300'}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            className="px-4 py-2 flex-1 text-black rounded disabled:!bg-zinc-500 not-disabled:hover:saturate-200 cursor-pointer disabled:cursor-not-allowed"
            onClick={handleSave}
            style={{ backgroundColor: noteData.bgColor }}
            disabled={noteData.title.length > MAX_TITLE_LENGTH || !noteData.title.trim()}
          >
            Save
          </button>
          <button
            className="px-4 py-2 flex-1 bg-red-600 text-white rounded hover:bg-red-500 shadow-md cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 flex-1 bg-gray-400 text-white rounded hover:bg-gray-300 shadow-md cursor-pointer"
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