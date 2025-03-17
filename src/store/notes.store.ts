import { create } from "zustand";
import { TNote } from "../types/Note";
import { persist } from "zustand/middleware";

interface NoteStore {
  notes: TNote[];
  addNote: (title: string, bgColor?: string) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, title: string, bgColor?: string) => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (title, bgColor = `rgb(${0},${187},${119})`) => {
        const newNote: TNote = {
          id: crypto.randomUUID(),
          title,
          bgColor: bgColor,
        };
        return set((store) => ({ notes: [...store.notes, newNote] }));
      },
      removeNote: (id) => {
        return set((store) => ({
          notes: store.notes.filter((note) => note.id !== id),
        }));
      },
      updateNote: (id, title, bgColor) => {
        return set((store) => ({
          notes: store.notes.map((note) =>
            note.id === id
              ? {
                  id: note.id,
                  title,
                  bgColor: bgColor !== undefined ? bgColor : note.bgColor,
                }
              : note,
          ),
        }));
      },
    }),
    { name: "notes" },
  ),
);
