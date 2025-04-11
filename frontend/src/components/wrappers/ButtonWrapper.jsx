import React from 'react';
import './ButtonWrapper.css'; // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom/cjs/react-router-dom';

const ButtonWrapper = ({ children, linkTo }) => {
    const baseUrl = 'http://localhost:3000'; // Replace with your actual base URL
    let redirectTo = '';

    if (!linkTo) {
        return <span className='button-wrapper'>{children}</span>;
    }

    if (linkTo.startsWith('http')) {
        redirectTo = linkTo;
    } else if (linkTo.startsWith('/')) {
        redirectTo = baseUrl + linkTo;
    } else {
        redirectTo = baseUrl + '/' + linkTo;
    }

    return (
        <a href={redirectTo} className='button-wrapper flex-center'>
            {children}
        </a>
    );
};

export default ButtonWrapper;