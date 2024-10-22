// Modal.js
import React from 'react';
import './Modal.css'; // Assuming you will add styles in this file

const Modal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <img src={imageSrc} alt="Larger view" style={{ maxWidth: '90%', maxHeight: '80vh' }} />
                <a href={imageSrc} download style={{ display: 'block', marginTop: '10px' }}>Download</a>
            </div>
        </div>
    );
};

export default Modal;
