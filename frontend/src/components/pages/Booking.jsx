import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SourceContext } from '../../context/SourceContext'; // Assuming you have a context for the API URL
import Loader from '../low/Loader';

const Booking = () => {
    const { apiUrl } = useContext(SourceContext); // Assuming you have a context for the API URL
    const { id: movieId } = useParams();
    const [screenings, setScreenings] = useState([]);

    const fetchMovieScreenings = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/movie/screenings?movieId=${movieId}`);
            const data = await response.json();
            setScreenings(data);
        } catch (error) {
            console.error('Error fetching movie screenings:', error);
        }
    }, [movieId]);

    useEffect(() => {
        console.log('Booking component mounted or dependencies changed, fetching screenings...');
        fetchMovieScreenings();
    }, [fetchMovieScreenings]);

    if (!screenings || !screenings.length) return <Loader description='Loading screenings...' />;

    const formattedScreenings = () => {
        return screenings.map((screening, index) => (
            <div key={index} className='screening'>
                <h2>{screening.date}</h2>
                <p>Time: {screening.time}</p>
                <p>Available Seats: {screening.availableSeats}</p>
                <button className='book-button'>Book Now</button>
            </div>
        ));
    };

    return (
        <div className='booking-container'>
            <h1>Book Tickets for Movie ID: {movieId}</h1>
            <div className='screenings-list'>
                {formattedScreenings()}
            </div>
        </div>
    );
};

export default Booking;