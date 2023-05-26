import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="relative">
        <button
          className="absolute top-0 right-0 mt-2 mr-1 p-2 rounded-full bg-transparent"
          onClick={onClose}
        >
          <AiFillCloseSquare className="inline-block fill-current text-gray-900 w-6 h-6" />
        </button>
        <div className="bg-white rounded-lg p-4 m-2">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
