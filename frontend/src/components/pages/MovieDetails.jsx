import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Loader from '../low/Loader';
import ContentBox from '../wrappers/ContentBox';
import MovieDetailsInfo from '../high/MovieDetailsInfo';
import MovieComments from '../high/MovieComments';
import './MovieDetails.css';
import useApi from '../../hooks/useApi';

const MovieDetails = () => {
    const { request, error } = useApi()
    const { id: movieId } = useParams();
    /**
     * State to hold movie details.
     * @type {[import('../low/MovieCard').MovieInfo, function]}
     */
    const [movie, setMovie] = useState(null);

    // Memoize fetchMovieDetails and include fetchMovieScreenings in its dependencies.
    const fetchMovieDetails = useCallback(async () => {
        const response = await request(`/movie?movieId=${movieId}`);
        if (error) {
            console.error('Error fetching movie details:', error);
            return;
        }

        setMovie(response);
    }, [movieId, request, error]);

    // Call fetchMovieDetails whenever dependencies change.
    useEffect(() => {
        fetchMovieDetails();
    }, [fetchMovieDetails]);

    if (!movie) return <Loader description='Loading Movie information...' />;

    return (
        <div className='movie-details-container'>
            <ContentBox><h1 className='flex-center' style={{ fontSize: '3rem' }}>{movie.title}</h1></ContentBox>
            <MovieDetailsInfo movie={movie} />
            <MovieComments movieId={movie._id} />
        </div>
    );
};

export default MovieDetails;