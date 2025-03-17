import React, { useEffect, useState } from "react";
import { usePopup } from "../../hooks/usePopup";
import { useNoteStore } from "../../store/notes.store";
import { TNote } from "../../types/Note";
import { Type, Save, Trash2 } from "lucide-react";
import { colorOptions, MAX_TITLE_LENGTH } from "../../lib/conts";
import cn from "../../utils/cn";
import Input from "./Input";
import ColorPicker from "./ColorPicker";

const delayClosingTimer = 400; //ms

const Popup = () => {
  const { isPopupOpen, closePopup, editNote } = usePopup();
  const [isDelayedClosing, setisDelayedClosing] = useState(false);
  const [noteData, setNoteData] = useState<TNote | null>(null);
  const removeNote = useNoteStore(store => store.removeNote);
  const updateNote = useNoteStore(store => store.updateNote);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (editNote) {
      setNoteData({ ...editNote });
      setIsDeleting(false);
      setisDelayedClosing(false);
    } else {
      closePopup();
    }
  }, [editNote, closePopup]);

  const handleSave = () => {
    if (isDelayedClosing) return;
    if (noteData) {
      updateNote(
        noteData.id,
        noteData.title,
        noteData.bgColor
      );
      handleClose();
    }
  };

  const handleDelete = () => {
    if (isDelayedClosing) return;
    if (isDeleting) {
      if (noteData) {
        removeNote(noteData.id);
        handleClose();
      }
    } else {
      setIsDeleting(true);
    }
  };

  const handleClose = () => {
    setisDelayedClosing(true);
    setTimeout(() => {
      closePopup();
    }, delayClosingTimer)
  }

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

  // title error
  const getTitleError = () => {
    if (!noteData?.title.trim()) {
      return "Title cannot be empty";
    }
    if (noteData.title.length > MAX_TITLE_LENGTH) {
      return `Title exceeds maximum length of ${MAX_TITLE_LENGTH} characters`;
    }
    return "";
  };

  if (!noteData || !isPopupOpen) return null;

  return (
    <div
      className={cn("fixed inset-0 flex items-center justify-center w-full h-full p-4 z-50 transition-all",
        !isDelayedClosing
          ? "bg-black/40 backdrop-blur-xs"
          : `bg-transparent backdrop-blur-[1px]`
      )}
      style={{ transitionDuration: delayClosingTimer + "ms" }}
    >
      <div
        className={cn("relative max-w-md w-full mx-auto bg-gray-800 p-6 ",
          "rounded-xl shadow-2xl opacity-0 animation-slideUp ",
          isDelayedClosing && "animation-disapear")}
        style={{ borderTop: `5px solid ${noteData.bgColor}`, animationDuration: delayClosingTimer + "ms" }}
      >

        <h2 className="text-2xl font-bold mb-5 text-gray-100 flex items-center gap-2">
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
            error={getTitleError()}
            counter={true}
            isTextarea={true}
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
            className={cn("px-5 py-2.5 flex-1 rounded-lg font-medium text-black ",
              "disabled:opacity-50 not-disabled:hover:brightness-95 cursor-pointer disabled:cursor-not-allowed",
              " transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1.5")}
            onClick={handleSave}
            style={{ backgroundColor: noteData.bgColor }}
            disabled={noteData.title.length > MAX_TITLE_LENGTH || !noteData.title.trim()}
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
            className={cn("px-5 py-2.5 flex-1 bg-gray-200 text-gray-700 rounded-lg font-medium",
              " hover:bg-gray-300 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer")}
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;