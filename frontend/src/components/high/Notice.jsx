import React, { useContext } from 'react';
import { OverlayNoticeContext } from '../../context/OverlayNoticeContext';
import './Notice.css';

const OverlayNotice = () => {
    const { type, message, handleAnimationEnd, isClosing, closeNotice, showNotice } = useContext(OverlayNoticeContext);

    if (!showNotice && !isClosing) return null;

    return (
        <div className="overlay-notice-container">
            <div
                className={`overlay-notice-content overlay-notice-${type} ${isClosing ? 'exiting' : 'entering'}`}
                onAnimationEnd={handleAnimationEnd}
            >
                <h2 style={{ marginTop: 0, textTransform: 'capitalize' }}>{type}</h2>
                <p>{message}</p>
                <button className="overlay-notice-button close-button" onClick={closeNotice}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default OverlayNotice;