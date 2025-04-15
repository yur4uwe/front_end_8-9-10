import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SourceContext } from '../../context/SourceContext'; // Assuming you have a context for the API URL
import Loader from '../low/Loader';
import ContentBox from '../wrappers/ContentBox';
import ScreeningList from '../high/ScreeningList';
import './Booking.css';



/**
 * @typedef {Object} Seat
 * @property {number} row - The row number of the seat.
 * @property {number} number - The column number of the seat.
 * @property {boolean} available - Whether the seat is available for booking.
 * @property {boolean} price - Whether the seat is selected by the user.
 * @property {string} type - Whether the seat is selected by the user.
 */

/**
 * @typedef {Object} Screening
 * @property {string} _id - The unique identifier for the screening.
 * @property {string} movieId - The date of the screening. 
 * @property {string} time - The time of the screening.
 * @property {number} seats - The number of available seats for the screening.
 */

/**
 * 
 * @returns {JSX.Element}
 */
const Booking = () => {
    const { apiUrl } = useContext(SourceContext); // Assuming you have a context for the API URL
    const { id: movieId } = useParams();
    const [screenings, setScreenings] = useState([]);
    const [movieName, setMovieName] = useState(''); // State to hold the movie name

    const fetchMovieScreenings = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/movie/screenings?movieId=${movieId}`);
            const data = await response.json();
            console.log('Fetched movie screenings:', data); // Debugging line

            setMovieName(data.movie.title); // Assuming the API returns the movie name
            setScreenings(data.screenings ?? []); // Ensure we set an empty array if no screenings are found

            console.log('Movie Name:', movieName); // Debugging line

        } catch (error) {
            console.error('Error fetching movie screenings:', error);
        }
    }, [movieId, apiUrl, movieName]);

    useEffect(() => {
        console.log('Booking component mounted or dependencies changed, fetching screenings...');
        fetchMovieScreenings();
    }, [fetchMovieScreenings]);

    if (!screenings || !screenings.length) return <Loader description='Loading screenings...' />;



    return (
        <ContentBox className='booking-container'>
            <h1>Book Tickets for: {movieName}</h1>
            <ScreeningList screenings={screenings} />
        </ContentBox>
    );
};

export default Booking;