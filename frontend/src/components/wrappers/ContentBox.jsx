import React from 'react';
import './ContentBox.css'; // Import the CSS file for styling

const ContentBox = ({ children }) => {
    return (
        <div className="content-box">
            {children}
        </div>
    );
};

export default ContentBox;