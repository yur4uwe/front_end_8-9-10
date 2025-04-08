import React from 'react';
import './Loader.css'; // Assuming you have a CSS file for styling

/**
 * 
 * @param {{description: string}} param0 
 * @returns 
 */
const Loader = ({ description }) => {


    return (
        <div className='loader-container'>
            <div className='loader-text'>{description}</div>
            <div className='loader-icon'></div>
        </div>
    );
};

export default Loader;