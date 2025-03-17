import { usePopup } from "../../hooks/usePopup";
import PopupWrapper from "./PopupWrapper";
import CreateNoteForm from "../note/CreateNoteForm";
import EditNoteForm from "../note/EditNoteForm";

const Popup = () => {
  const {
    isPopupOpen,
    isClosing,
    closePopup,
    editNote,
    isCreateMode
  } = usePopup();

  const getTopBorderColor = () => {
    if (isCreateMode) {
      return "rgb(0,187,119)";
    }
    return editNote?.bgColor || "rgb(0,187,119)";
  };

  const renderContent = () => {
    if (isCreateMode) {
      return <CreateNoteForm onClose={closePopup} />;
    } else if (editNote) {
      return <EditNoteForm note={editNote} onClose={closePopup} />;
    }
    return null;
  };

  return (
    <PopupWrapper
      isOpen={isPopupOpen}
      isClosing={isClosing}
      topBorderColor={getTopBorderColor()}
    >
      {renderContent()}
    </PopupWrapper>
  );
};

export default Popup;