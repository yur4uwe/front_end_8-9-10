import React from 'react';
import './ButtonWrapper.css'; // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom/cjs/react-router-dom';

const ButtonWrapper = ({ children, linkTo }) => {
    return (
        <Link to={linkTo} className='button-wrapper flex-center'>
            {children}
        </Link>
    );
};

export default ButtonWrapper;