import { ReactNode, useMemo } from "react";
import cn from "../../utils/cn";

interface PopupWrapperProps {
  isOpen: boolean;
  isClosing: boolean;
  topBorderColor?: string;
  children: ReactNode;
  delayClosingTimer?: number;
}

const PopupWrapper = ({
  isOpen,
  isClosing,
  topBorderColor = "rgb(0,187,119)",
  children,
  delayClosingTimer = 400
}: PopupWrapperProps) => {


  const overlayStyles = useMemo(() => ({
    transitionDuration: `${delayClosingTimer}ms`
  }), [delayClosingTimer]);

  const contentStyles = useMemo(() => ({
    borderTop: `5px solid ${topBorderColor}`,
    animationDuration: `${delayClosingTimer}ms`
  }), [topBorderColor, delayClosingTimer]);

  if (!isOpen) return null;


  return (
    <div className={cn("fixed inset-0 flex items-center justify-center w-full h-full p-4 z-50 transition-all",
      !isClosing
        ? "bg-black/40 backdrop-blur-xs"
        : "bg-transparent backdrop-blur-[1px]"
    )} style={overlayStyles}>
      <div className={cn("relative max-w-md w-full mx-auto bg-gray-200 p-6 ",
        "rounded-xl shadow-2xl opacity-0 animation-slideUp ",
        isClosing && "animation-disapear")} style={contentStyles}>
        {children}
      </div>
    </div>
  );
};

export default PopupWrapper;