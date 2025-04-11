import React, { useContext } from 'react';
import { SourceContext } from '../../context/SourceContext'; // Assuming you have a context for the API URL
import ButtonWrapper from '../wrappers/ButtonWrapper'; // Assuming you have a ButtonWrapper component
import './MovieDetailsInfo.css'; // Assuming you have a CSS file for styling
import ContentBox from '../wrappers/ContentBox';
import MovieOverview from '../low/MovieOverview';

/**
 * 
 * @param {{movie: import('../low/MovieCard').MovieInfo}} param0 
 * @returns 
 */
const MovieDetailsInfo = ({ movie }) => {
    const { imageBaseUrl } = useContext(SourceContext); // Assuming you have a context for the API URL

    return (
        <ContentBox className='movie-details'>
            <div className='movie-details-image'>
                <img src={movie.imageUrl} alt={movie.title} className='movie-details-poster' />
            </div>
            <div className='movie-details-content'>
                <p><strong>Release Date:</strong> {movie.releaseDate.split("-").reverse().join(".")}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Cast:</strong> {movie.cast}</p>
                <MovieOverview>{movie.overview}</MovieOverview>
                <p><strong>Rating:</strong> <img src={imageBaseUrl + "rating-star.png"} alt="R:" className='rating-star' /> {movie.rating}</p>
                <p><strong>Duration:</strong> {movie.duration}</p>
                <p><strong>Language:</strong> {movie.language}</p>
                <div className="movie-details-buttons">
                    <ButtonWrapper linkTo={movie.trailerUrl} >Watch Trailer</ButtonWrapper>
                    <ButtonWrapper linkTo={movie.watchUrl} >Watch Movie</ButtonWrapper>
                    <ButtonWrapper linkTo={`/book/${movie._id}`} >Book Tickets</ButtonWrapper>
                </div>
            </div>
        </ContentBox>
    );
};

export default MovieDetailsInfo;