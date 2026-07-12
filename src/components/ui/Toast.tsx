// src/components/ui/Toast.tsx
import React, { useEffect } from "react";
import "./Toast.css";

interface Props {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<Props> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="toast">{message}</div>;
};
