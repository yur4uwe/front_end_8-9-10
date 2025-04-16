import React from 'react';
import './ButtonWrapper.css'; // Assuming you have some styles for the button

const ButtonWrapper = ({ children, onClick, className, style }) => {
    return (
        <button onClick={onClick} className={`${className ? className : ''} button-wrapper`} style={style}>
            {children}
        </button>
    );
};

export default ButtonWrapper;