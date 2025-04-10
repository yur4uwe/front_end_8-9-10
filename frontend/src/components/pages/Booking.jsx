import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Booking = () => {
    const { movieId } = useParams();
    const [seats, setSeats] = useState(Array(30).fill(false)); // 30 seats, all initially free

    const toggleSeat = (index) => {
        const updatedSeats = [...seats];
        updatedSeats[index] = !updatedSeats[index];
        setSeats(updatedSeats);
    };

    const handleBooking = () => {
        const bookedSeats = seats.map((seat, index) => seat ? index + 1 : null).filter(Boolean);
        alert(`You have booked seats: ${bookedSeats.join(", ")}`);
    };

    return (
        <div>
            <h1>Book Your Seats</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                {seats.map((isTaken, index) => (
                    <button
                        key={index}
                        style={{
                            backgroundColor: isTaken ? 'red' : 'green',
                            color: 'white',
                            padding: '10px',
                        }}
                        onClick={() => toggleSeat(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button onClick={handleBooking} style={{ marginTop: '20px', padding: '10px 20px' }}>
                Confirm Booking
            </button>
        </div>
    );
};

export default Booking;