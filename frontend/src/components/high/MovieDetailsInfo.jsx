import React, { useContext } from 'react';
import { SourceContext } from '../../context/SourceContext'; // Assuming you have a context for the API URL
import LinkWrapper from '../wrappers/LinkWrapper'; // Assuming you have a LinkWrapper component
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
            <img src={movie.imageUrl} alt={movie.title} className='movie-details-poster' />
            <div className='movie-details-content'>
                <p><strong>Release Date:</strong> {movie.releaseDate.split("-").reverse().join(".")}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Cast:</strong> {movie.cast}</p>
                <p><strong>Rating:</strong> <img src={imageBaseUrl + "rating-star.png"} alt="R:" className='rating-star' /> {movie.rating}</p>
                <p><strong>Duration:</strong> {movie.duration}</p>
                <p><strong>Language:</strong> {movie.language}</p>
                <div className="movie-details-buttons">
                    <LinkWrapper linkTo={movie.trailerUrl}>Watch Trailer</LinkWrapper>
                    <LinkWrapper linkTo={movie.watchUrl}>Watch Movie</LinkWrapper>
                    <LinkWrapper linkTo={`/book/${movie._id}`}>Book Tickets</LinkWrapper>
                </div>
                <MovieOverview>{movie.overview}</MovieOverview> 
                
            </div>
        </ContentBox>
    );
};

export default MovieDetailsInfo;