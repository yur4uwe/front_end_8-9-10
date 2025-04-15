import React from 'react';
import { useHistory } from 'react-router-dom';
import './ButtonWrapper.css';

const ButtonWrapper = ({ children, linkTo, className }) => {
    const history = useHistory();

    const handleClick = () => {
        if (!linkTo) return;
        if (linkTo.startsWith('http')) {
            window.open(linkTo, '_blank', 'noopener,noreferrer');
        } else {
            history.push(linkTo);
        }
    };

    return (
        <button onClick={handleClick} className={`button-wrapper flex-center ${className}`}>
            {children}
        </button>
    );
};

export default ButtonWrapper;