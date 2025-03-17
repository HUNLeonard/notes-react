import React, { createContext, useState } from 'react'
import { TNote } from '../../types/Note';

export const PopupProviderContext = createContext<PopupProviderContext | null>(null)

interface PopupProviderContext {
  isPopupOpen: boolean,
  openPopup: () => void;
  closePopup: () => void;
  editNote: TNote | null
  setEditNote: (arg: TNote | null) => void;
}

const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editNote, setEditNote] = useState<TNote | null>(null)

  const openPopup = () => {
    setIsPopupOpen(true)
  }
  const closePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <PopupProviderContext.Provider value={{ isPopupOpen, closePopup, openPopup, editNote, setEditNote }}>
      {children}
    </PopupProviderContext.Provider>
  )
}

export default PopupProvider