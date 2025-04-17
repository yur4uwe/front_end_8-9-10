import React from 'react';
import SeatsList from '../low/SeatsList';
import './BookingsList.css';

/**
 * @typedef {Object} Booking
 * @property {import('../low/MovieCard').MovieInfo} movie - Movie details
 * @property {string} time - Booking time
 * @property {Array<{row:number,number:number}>} seats - List of booked seats
 * @property {string} movieId - Booking ID
 */

/**
 * 
 * @param {{bookings:Booking[]}} param0 
 * @returns 
 */
const BookingsList = ({ bookings }) => {
    const day = (time) => {
        const date = new Date(time);
        const options = { month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    const hour = (time) => {
        const date = new Date(time);
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        return date.toLocaleTimeString(undefined, options);
    }

    return (
        <div>
            {bookings.length > 0 ? (
                bookings
                    .sort((a, b) => new Date(a.time) - new Date(b.time))
                    .map((booking, index) => (
                        <div key={index} className="booking-item">
                            <h3>Booking: {booking.movie.title}</h3>
                            <p>Date: {day(booking.time)}, Time: {hour(booking.time)}</p>
                            <p>Seats: </p>
                            <SeatsList seats={booking.seats} />
                        </div>
                    ))
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default BookingsList;