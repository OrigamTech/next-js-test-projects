"use client";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
const CloseButton = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
        // Ensure the click is outside the modal content
        if (
          ref.current &&
          !ref.current.contains(event.target as Node)
        ) {
          history.back();
        }
      };

    document.addEventListener("mousedown", clickOutsideHandler);

    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);

  return (
    <div ref={ref}>
      <button onClick={() => history.back()}>
        <X />
      </button>
    </div>
  );
};

export default CloseButton;
