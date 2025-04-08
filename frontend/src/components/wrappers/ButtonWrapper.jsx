import React from 'react';
import './ButtonWrapper.css'; // Assuming you have a CSS file for styling

const ButtonWrapper = ({ text }) => {
    return (
        <button className='button-wrapper flex-center'>
            {text}
        </button>
    );
};

export default ButtonWrapper;