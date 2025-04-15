import React, { useContext } from 'react';
import { SourceContext } from '../../context/SourceContext'; // Assuming you have a context for the image base URL
import './MovieCard.css'; // Assuming you have a CSS file for styling
import LinkWrapper from '../wrappers/LinkWrapper';
import Clickable from '../wrappers/Clickable';

/**
 * @typedef {Object} MovieInfo
 * @property {string} _id - The unique identifier for the movie.
 * @property {string} title - The title of the movie.
 * @property {string} imageUrl - The URL of the movie's poster image.
 * @property {string} releaseDate - The release date of the movie.
 * @property {string} overview - A brief overview or description of the movie.
 * @property {string} rating - The rating of the movie.
 * @property {string} genre - The genre of the movie.
 * @property {string} director - The director of the movie.
 * @property {string} cast - The main cast of the movie.
 * @property {string} trailerUrl - The URL of the movie's trailer.
 * @property {string} watchUrl - The URL to watch the movie.
 * @property {string} reviews - The reviews or ratings from critics or users.
 * @property {string} duration - The duration of the movie.
 * @property {string} language - The language of the movie.
 */

/**
 * @typedef {Object} MovieCardProps
 * @property {MovieInfo} movie - The movie object containing details about the movie.
 * @property {boolean} isLastChild - Flag to indicate if this is the last child in the list.
 */


/**
 * 
 * @param {MovieCardProps} param0 
 * @returns {JSX.Element}
 */
const MovieCard = ({ movie, isLastChild }) => {
    const { imageBaseUrl } = useContext(SourceContext); // Assuming you have a context for the image base URL

    return (
        <Clickable link={`/movie/${movie._id}`} className={`movie-card ${isLastChild ? 'last-child' : ''} flex-center column`}>
            <img src={movie.imageUrl} alt={movie.title} className='movie-poster' />
            <div className={`movie-card-details ${isLastChild ? 'last-child' : ''}`}>
                <h3 className='movie-title'>{movie.title}</h3>
                <p className='movie-genre hidden lesser-margin'>Genre: {movie.genre}</p>
                <p className='movie-director hidden lesser-margin'>Director: {movie.director}</p>
                <p className='last-screening hidden lesser-margin'>Last Screening: {movie.last_screening}</p>
                <p className='movie-release-date'>
                    <span className='hidden'>Release Date:</span>
                    <span className='inline'>{movie.releaseDate.split("-").reverse().join(".")}</span>
                </p>
                <div className='movie-rating flex-center row'>
                    <img src={imageBaseUrl + "rating-star.png"} alt="R:" className='rating-star' />
                    {movie.rating}
                </div>
                <div className="movie-buttons hidden">
                    <LinkWrapper linkTo={`/movie/${movie._id}`}>More</LinkWrapper>
                    <LinkWrapper linkTo={`/book/${movie._id}`} >Book</LinkWrapper>
                </div>
            </div>
        </Clickable>
    );
};

export default MovieCard;