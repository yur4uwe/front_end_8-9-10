import React from 'react';
import LinkWrapper from '../wrappers/LinkWrapper';
import './ScreeningCard.css';

/**
 * * @typedef {Object} ScreeningCardProps
 * * @property {import('../pages/Booking').Screening} screening - Array of screening objects.
 */

/**
 * 
 * @param {ScreeningCardProps} param0 
 * @returns 
 */
const ScreeningCard = ({ screening }) => {
    const hour = (time) => {
        const date = new Date(time);
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        return date.toLocaleTimeString(undefined, options);
    }

    const countAvailableSeats = (screening) => {
        return screening.seats.filter(seat => seat.available).length;
    }


    return (
        <LinkWrapper className='book-button' linkTo={`/booking/${screening._id}/${screening.time}`}>
            <div className="book-button-cont-box">
                <p>{hour(screening.time)}</p>
                <p>Free: {countAvailableSeats(screening)}</p>
            </div>
        </LinkWrapper>
    );
};

export default ScreeningCard;