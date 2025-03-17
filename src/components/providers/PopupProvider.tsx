import React, { createContext, useState } from 'react'
import { TNote } from '../../types/Note';

export const PopupProviderContext = createContext<PopupProviderContext | null>(null)

interface PopupProviderContext {
  isPopupOpen: boolean,
  openPopup: () => void;
  closePopup: () => void;
  isClosing: boolean;
  editNote: TNote | null;
  setEditNote: (arg: TNote | null) => void;
  isCreateMode: boolean;
  setCreateMode: (arg: boolean) => void;
}

const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [editNote, setEditNote] = useState<TNote | null>(null);
  const [isCreateMode, setCreateMode] = useState(false);

  const delayClosingTimer = 400; // ms

  const openPopup = () => {
    setIsPopupOpen(true);
    setIsClosing(false);
  }

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setIsClosing(false);
      setCreateMode(false);
      setEditNote(null);
    }, delayClosingTimer)
  }

  return (
    <PopupProviderContext.Provider value={{
      isPopupOpen,
      isClosing,
      closePopup,
      openPopup,
      editNote,
      setEditNote,
      isCreateMode,
      setCreateMode
    }}>
      {children}
    </PopupProviderContext.Provider>
  )
}

export default PopupProvider