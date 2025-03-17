import React, { useState } from 'react'
import { useNoteStore } from '../../store/notes.store'
import { colorOptions, MAX_TITLE_LENGTH } from '../lib/conts'

const defaultNoteValue = {
  title: "",
  bgColor: `rgb(${0},${187},${119})`
}


const NewNoteForm = () => {
  const addNote = useNoteStore(store => store.addNote)
  const [newNoteData, setNewNoteData] = useState({ ...defaultNoteValue })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newNoteData.title.trim()) {
      addNote(
        newNoteData.title,
        newNoteData.bgColor
      )
      setNewNoteData({ ...defaultNoteValue })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNoteData({
      ...newNoteData,
      [e.target.name]: e.target.value
    })
  }

  const handleColorSelect = (color: string) => {
    setNewNoteData({
      ...newNoteData,
      bgColor: color
    })
  }

  return (
    <section className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Create New Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title - ({newNoteData.title.length})</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newNoteData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter note title"
            maxLength={MAX_TITLE_LENGTH}
          />
          {newNoteData.title.length === 0 && <p className="text-red-500 text-sm">Note title must contain at least 1 character!</p>}
          {newNoteData.title.length > MAX_TITLE_LENGTH && <p className="text-red-500 text-sm">You can only have a title {MAX_TITLE_LENGTH} long!</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Background Color</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                onClick={() => handleColorSelect(color)}
                className={`size-8 rounded-full cursor-pointer border hover:scale-110 transition-transform ${newNoteData.bgColor === color ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-300'}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-black rounded disabled:!bg-zinc-500 not-disabled:hover:brightness-95 cursor-pointer disabled:cursor-not-allowed shadow-md hover:-translate-y-0.5 transition-all duration-200"
          disabled={newNoteData.title.length > MAX_TITLE_LENGTH || !newNoteData.title.trim()}
          style={{ backgroundColor: newNoteData.bgColor }}
        >
          Create Note
        </button>
      </form>
    </section>
  )
}

export default NewNoteForm