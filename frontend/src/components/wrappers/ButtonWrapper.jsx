import React from 'react';
import './ButtonWrapper.css'; // Assuming you have some styles for the button

const ButtonWrapper = ({ children, onClick, className, style, type }) => {
    return (
        <button onClick={onClick} className={`${className ? className : ''} button-wrapper`} type={type ?? 'button'} style={style}>
            {children}
        </button>
    );
};

export default ButtonWrapper;