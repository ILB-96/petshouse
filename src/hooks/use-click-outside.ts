import React, { useEffect } from "react";

const useClickOutside = ({
  ref,
  action,
}: {
  ref: React.RefObject<HTMLElement>;
  action: () => void;
}) => {
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Escape") {
      action();
    }
  };
  const handleMouseDown = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      action();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
};

export default useClickOutside;
