import React, { createContext, useState } from "react";

/**
 * @typedef {Object} OverlayNoticeContextValue
 * @property {boolean} showNotice - Indicates if the notice is currently visible.
 * @property {function} setShowNotice - Function to set the visibility of the notice.
 * @property {string} message - The notice object containing title and message.
 * @property {function} setMessage - Function to set the notice object. 
 * @property {string} type - The type of the notice (info, success, error).
 * @property {function} setType - Function to set the type of the notice.
 * @property {function} onClose - Callback function to be called when the notice is closed.
 * @property {function} setOnClose - Function to set the onClose callback.
 * @property {function} openNotice - Function to open the notice with title, message, type, and onClose callback.
 * @property {function} closeNotice - Function to close the notice and call the onClose callback if it exists.
 */

/**
 * @type {React.Context<OverlayNoticeContextValue>}
 */
export const OverlayNoticeContext = createContext()

export const OverlayNoticeProvider = ({ children }) => {
    const [showNotice, setShowNotice] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('info'); // 'info', 'success', 'error'
    const [onClose, setOnClose] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleAnimationEnd = () => {
        // When the exit animation has finished, call the provided onClose callback.
        if (isClosing && onClose) {
            onClose();
        }
    };

    const openNotice = (message, type = 'info', onCloseCallback) => {
        setMessage(message);
        setType(type);
        setShowNotice(true);
        setOnClose(() => onCloseCallback); // Store the callback function
    }

    const closeNotice = () => {
        setShowNotice(false);
        setIsClosing(true); // Trigger the exit animation
        if (onClose) {
            onClose(); // Call the callback function if it exists
        }
        setTimeout(() => {
            setIsClosing(false); // Reset the closing state after a short delay
        }, 300); // Adjust the timeout duration to match your CSS animation duration
    }

    return (
        <OverlayNoticeContext.Provider value={{
            showNotice,
            message,
            type,
            onClose,
            isClosing,
            openNotice,
            closeNotice,
            handleAnimationEnd,
        }}>
            {children}
        </OverlayNoticeContext.Provider>
    )
};