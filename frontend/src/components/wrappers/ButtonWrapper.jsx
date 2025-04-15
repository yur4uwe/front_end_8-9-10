import React from 'react';

const ButtonWrapper = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className='button-wrapper'>
            {children}
        </button>
    );
};

export default ButtonWrapper;