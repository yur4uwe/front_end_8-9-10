import React from 'react';
import './SeatsList.css';

/**
 * 
 * @param {{seats:import('../pages/Booking').Seat[]}} param0 
 * @returns 
 */
const SeatsList = ({ seats }) => {
    return (
        <div className='seats-list'>
            {seats.map((seat, index) => (
                <div className='booked-seat' key={index}>
                    <span className='type-span'>{seat.type}</span>
                    <span className='position-span'>Row: {seat.row}, Seat: {seat.number}</span>
                </div>
            ))}
        </div>
    );
}

export default SeatsList;