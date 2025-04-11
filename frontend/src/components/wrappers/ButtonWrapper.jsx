import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ButtonWrapper.css'; // Assuming you have a CSS file for styling

const ButtonWrapper = ({ children, linkTo }) => {
    let redirectTo = '';

    if (!linkTo) {
        return <span className='button-wrapper'>{children}</span>;
    }

    if (linkTo.startsWith('http')) {
        return (
            <a href={redirectTo} className='button-wrapper flex-center'>
                {children}
            </a>
        );
    }

    return (
        <Link to={linkTo} className='button-wrapper flex-center'>
            {children}
        </Link>
    );
};

export default ButtonWrapper;