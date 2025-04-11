import React from 'react';
import './ContentBox.css'; // Import the CSS file for styling

const ContentBox = ({ children, className, style }) => {
    return (
        <div style={style} className={`content-box ${className ? className : ''}`}>
            {children}
        </div>
    );
};

export default ContentBox;