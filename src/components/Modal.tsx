import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-600 text-black p-8 rounded-lg shadow-lg relative w-11/12 max-w-md">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-400 hover:text-black transition duration-200"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
