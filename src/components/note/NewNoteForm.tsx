import React, { useState } from "react";
import { useNoteStore } from "../../store/notes.store";
import { PlusCircle, Type, Palette } from "lucide-react";
import { colorOptions, MAX_TITLE_LENGTH } from "../../lib/conts";
import cn from "../../utils/cn";

const defaultNoteValue = {
  title: "",
  bgColor: `rgb(${0},${187},${119})`,
};

const NewNoteForm = () => {
  const addNote = useNoteStore((store) => store.addNote);
  const [newNoteData, setNewNoteData] = useState({ ...defaultNoteValue });
  const [isExpanded, setIsExpanded] = useState(false);
  const [titleTouched, setTitleTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteData.title.trim()) {
      addNote(newNoteData.title, newNoteData.bgColor);
      reset();
    }
  };

  const reset = () => {
    setNewNoteData({ ...defaultNoteValue });
    setTitleTouched(false);
  }

  const handleBlur = () => {
    setTitleTouched(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNoteData({
      ...newNoteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorSelect = (color: string) => {
    setNewNoteData({
      ...newNoteData,
      bgColor: color,
    });
  };

  return (
    <section className="p-6 rounded-lg shadow-md mx-4 my-6 bg-gray-800">
      <div
        className={`flex max-xs:flex-col max-xs:gap-4 items-center justify-between`}
      >
        <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
          Create New Note
        </h2>

        <button
          onClick={() => setIsExpanded(true)}
          disabled={isExpanded}
          className={cn(
            `px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center`,
            `gap-1 transition-[translate,opacity,margin] duration-400 `,
            `${isExpanded
              ? "-translate-y-2 opacity-0 -mb-12 pointer-events-none"
              : "opacity-100 cursor-pointer"
            }`,
          )}
        >
          <PlusCircle size={16} />
          New Note
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`space-y-5  overflow-hidden transition-all duration-700 ${isExpanded ? "max-h-80 mt-4" : "max-h-0"
          }`}
      >
        <div>
          <label
            htmlFor="title"
            className="flex items-center gap-1.5 text-sm font-medium mb-2 text-gray-200"
          >
            <Type size={16} />
            Title{" "}
            <span className="text-gray-400 text-xs">
              ({newNoteData.title.length}/{MAX_TITLE_LENGTH})
            </span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newNoteData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 bg-gray-200 rounded-lg transition-all"
            placeholder="Enter notes title..."
            maxLength={MAX_TITLE_LENGTH}
            autoFocus={isExpanded}
          />
          {titleTouched && newNoteData.title.length === 0 && (
            <p className="text-red-500 text-sm mt-1 font-bold">
              Note title must contain at least 1 character
            </p>
          )}
          {newNoteData.title.length > MAX_TITLE_LENGTH && (
            <p className="text-red-500 text-sm mt-1font-bold">
              Maximum length is {MAX_TITLE_LENGTH} characters
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium mb-2 text-gray-200">
            <Palette size={16} />
            Background Color
          </label>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                onClick={() => handleColorSelect(color)}
                className={`size-10 rounded-full cursor-pointer border hover:scale-110 transition-transform ${newNoteData.bgColor === color
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : "border-gray-300"
                  }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className={cn("px-5 py-2.5 text-black rounded-lg font-medium ",
              "disabled:opacity-50 not-disabled:hover:brightness-95",
              "cursor-pointer disabled:cursor-not-allowed shadow-md not-disabled:hover:-translate-y-0.5",
              "transition-all duration-200 flex items-center gap-1.5")}
            disabled={
              newNoteData.title.length > MAX_TITLE_LENGTH ||
              !newNoteData.title.trim()
            }
            style={{ backgroundColor: newNoteData.bgColor }}
          >
            <PlusCircle size={18} />
            Create Note
          </button>

          <button
            type="button"
            onClick={() => { setIsExpanded(false); reset() }}
            className={cn(
              "px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium ",
              "hover:bg-gray-300 hover:-translate-y-0.5  transition-all cursor-pointer",
            )}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewNoteForm;
