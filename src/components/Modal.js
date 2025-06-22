import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center px-4 overflow-auto">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg relative transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
