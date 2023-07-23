import React from "react";

import './styles.scss';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {children}
            <button className="modal-close-btn" onClick={onClose}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal;