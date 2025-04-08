import React from 'react';

/**
 * @typedef {Object} MovieInfo
 * @property {string} id - The unique identifier for the movie.
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
 */


/**
 * 
 * @param {MovieCardProps} param0 
 * @returns {JSX.Element}
 */
const MovieCard = ({ movie }) => {
    console.log(movie);

    return (
        <div className='movie-card'>
            <img src={movie.imageUrl} alt={movie.title} className='movie-poster' />
            <div className='movie-details'>
                <h3 className='movie-title'>{movie.title}</h3>
                <p className='movie-release-date'>Release Date: {movie.releaseDate}</p>
                <p className='movie-overview'>{movie.overview}</p>
                <p className='movie-rating'>Rating: {movie.rating}</p>
                <p className='movie-genre'>Genre: {movie.genre}</p>
                <p className='movie-director'>Director: {movie.director}</p>
                <p className='movie-cast'>Cast: {movie.cast}</p>
                <a href={movie.trailerUrl} target='_blank' rel='noopener noreferrer' className='trailer-link'>Watch Trailer</a>
                <a href={movie.watchUrl} target='_blank' rel='noopener noreferrer' className='watch-link'>Watch Now</a>
            </div>
        </div>
    );
};

export default MovieCard;