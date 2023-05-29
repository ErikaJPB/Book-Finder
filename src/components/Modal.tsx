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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[1200px]  flex flex-col">
        <button
          className=" rounded-full bg-transparent place-self-end"
          onClick={onClose}
        >
          <AiFillCloseSquare className="inline-block fill-current text-white-900 w-6 h-6 text-white" />
        </button>

        <div className="bg-white rounded-lg p-2 m-2 sm:overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
