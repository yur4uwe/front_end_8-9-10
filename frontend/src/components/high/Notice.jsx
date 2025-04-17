import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { OverlayNoticeContext } from '../../context/OverlayNoticeContext';
import './Notice.css';

const OverlayNotice = () => {
    const { showNotice, type, onClose, notice } = useContext(OverlayNoticeContext);
    console.log("OverlayNotice rendered with type:", type, "and message:", notice.message);

    if (!showNotice) return null;

    return (
        <div className="overlay-notice-container">
            <div className={`overlay-notice-content overlay-notice-${type}`}>
                <h2 style={{ marginTop: 0, textTransform: 'capitalize' }}>{type}</h2>
                <p>{notice.title}</p>
                <p>{notice.message}</p>
                {onClose && (
                    <button 
                        className="overlay-notice-button close-button"
                        onClick={onClose}
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
    );
};

OverlayNotice.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'info']),
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func
};

export default OverlayNotice;