import React from 'react';
import { useHistory } from 'react-router-dom';
import './LinkWrapper.css';

const LinkWrapper = ({ children, linkTo, className }) => {
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
        <button onClick={handleClick} className={`link-wrapper flex-center ${className ?? ''}`}>
            {children}
        </button>
    );
};

export default LinkWrapper;