import React from 'react';
import './ContentBox.css'; // Import the CSS file for styling

const ContentBox = ({ children, className }) => {
    return (
        <div className={`content-box ${className}`}>
            {children}
        </div>
    );
};

export default ContentBox;