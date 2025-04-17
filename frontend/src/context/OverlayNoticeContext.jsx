import React, { createContext, useState } from "react";

/**
 * @typedef {Object} OverlayNoticeContextValue
 * @property {boolean} showNotice - Indicates if the notice is currently visible.
 * @property {function} setShowNotice - Function to set the visibility of the notice.
 * @property {{title:string, message: string}} notice - The notice object containing title and message.
 * @property {function} setNotice - Function to set the notice object. 
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
    const [notice, setNotice] = useState({ title: '', message: '' });
    const [type, setType] = useState('info'); // 'info', 'success', 'error'
    const [onClose, setOnClose] = useState(null);

    const openNotice = (title, message, type = 'info', onCloseCallback) => {
        setNotice({ title, message });
        setType(type);
        setShowNotice(true);
        setOnClose(() => onCloseCallback); // Store the callback function
    }

    const closeNotice = () => {
        setShowNotice(false);
        if (onClose) {
            onClose(); // Call the callback function if it exists
        }
    }

    return (
        <OverlayNoticeContext.Provider value={{
            showNotice,
            notice,
            type,
            onClose,
            openNotice,
            closeNotice,
        }}>
            {children}
        </OverlayNoticeContext.Provider>
    )
};