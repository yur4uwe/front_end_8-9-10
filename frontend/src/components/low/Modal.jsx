import React from 'react';
import './Modal.css';

/**
 * 
 * @param {{children:React.ReactNode,toClose:() => void}} param0 
 * @returns 
 */
const Modal = ({ children, toClose }) => {
    // Prevent click events from bubbling from modal content to backdrop
    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div className="modal-backdrop" onClick={toClose}>
            <div className="modal-content content-box" onClick={stopPropagation}>
                <button className="modal-close" onClick={toClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;