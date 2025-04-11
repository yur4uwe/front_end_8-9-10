import React from 'react';
import './MovieOverview.css'; // Assuming you have a CSS file for styling

/**
 * 
 * @param {{children: JSX.Element}} param0 
 * @returns 
 */
const MovieOverview = ({ children }) => {
    console.log('MovieOverview mounted or dependencies changed, fetching movie details...');
    console.log(children);
    return (
        <div>
            <p><strong>Movie Overview:</strong></p>
            <div className='overview-content'>{children}</div>
        </div>
    );
};

export default MovieOverview;