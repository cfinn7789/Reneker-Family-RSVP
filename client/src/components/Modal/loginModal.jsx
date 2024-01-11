import React from "react";

const Modal = ({ showModal, onClose }) => {
  const modalStyle = {
    display: showModal ? "block" : "none",
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>Please log in to gain access to this page.</p>
      </div>
    </div>
  );
};

export default Modal;