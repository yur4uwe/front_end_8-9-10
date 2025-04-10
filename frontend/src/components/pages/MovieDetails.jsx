import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { SourceContext } from '../../context/SourceContext'; // Assuming you have a context for the API URL
import Loader from '../low/Loader';
import ContentBox from '../wrappers/ContentBox';
import './MovieDetails.css'; // Assuming you have a CSS file for styling
import ButtonWrapper from '../wrappers/ButtonWrapper';

const MovieDetails = () => {
    const { apiUrl, imageBaseUrl } = useContext(SourceContext); // Assuming you have a context for the API URL
    const movieId = useParams().id; // Get the movie name from the URL parameters
    /**
     * @type {number | null} movie - The movie object containing details about the movie.
     */
    const [movie, setMovie] = useState(null); // State to hold movie details

    const fetchMovieScreenings = async (movieId) => {
        try {
            const response = await fetch(`${apiUrl}/movie/screenings?movieId=${movieId}`); // Fetch movie screenings from backend
            const data = await response.json();
            console.log('Fetched movie screenings:', data);
            setMovie((prevMovie) => ({ ...prevMovie, screenings: data })); // Update the movie state with screenings
        } catch (error) {
            console.error('Error fetching movie screenings:', error);
        }
    };

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(`${apiUrl}/movie?movieId=${movieId}`); // Fetch movie details from backend
            const data = await response.json();

            fetchMovieScreenings(movieId); // Fetch movie screenings after fetching movie details

            console.log('Fetched movie details:', data);
            setMovie(data)
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    // Fetch movie details when the component mounts
    useEffect(() => {
        console.log('MovieDetails mounted, fetching movie details...');
        fetchMovieDetails();
    }, []);

    if (!movie) return <Loader description='Loading Movie information...'></Loader>; // Show loading state if movie details are not yet fetched

    return (
        <ContentBox className='movie-details-container'>
            <h1>{movie.title}</h1>
            <div className='movie-details'>
                <div className='movie-details-image'>
                    <img src={movie.imageUrl} alt={movie.title} className='movie-details-poster' />
                </div>

                <div className='movie-details-content'>
                    <p><strong>Release Date:</strong> {movie.releaseDate.split("-").reverse().join(".")}</p>
                    <p><strong>Genre:</strong> {movie.genre}</p>
                    <p><strong>Director:</strong> {movie.director}</p>
                    <p><strong>Cast:</strong> {movie.cast}</p>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    <p><strong>Rating:</strong> <img src={imageBaseUrl + "rating-star.png"} alt="R:" className='rating-star' /> {movie.rating}</p>
                    <p><strong>Duration:</strong> {movie.duration}</p>
                    <p><strong>Language:</strong> {movie.language}</p>
                    <div className="movie-details-buttons">
                        <ButtonWrapper linkTo={movie.trailerUrl} >Watch Trailer</ButtonWrapper>
                        <ButtonWrapper linkTo={movie.watchUrl} >Watch Movie</ButtonWrapper>
                        <ButtonWrapper linkTo={`/movie/${movieId}/book`} >Book Tickets</ButtonWrapper>
                    </div>
                </div>
            </div>
        </ContentBox>
    );
};

export default MovieDetails;