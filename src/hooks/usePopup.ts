import { useContext } from "react";
import { PopupProviderContext } from "../components/providers/PopupProvider";

export const usePopup = () => {
  const context = useContext(PopupProviderContext);
  if (!context) {
    throw new Error("Context couldn't be reached from component!");
  }
  return context;
};
