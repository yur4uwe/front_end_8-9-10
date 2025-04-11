import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { SourceContext } from '../../context/SourceContext';
import Loader from '../low/Loader';
import ContentBox from '../wrappers/ContentBox';
import MovieDetailsInfo from '../high/MovieDetailsInfo';
import MovieComments from '../high/MovieComments';
import './MovieDetails.css';

const MovieDetails = () => {
    const { apiUrl } = useContext(SourceContext);
    const { id: movieId } = useParams();
    /**
     * State to hold movie details.
     * @type {[import('../low/MovieCard').MovieInfo, function]}
     */
    const [movie, setMovie] = useState(null);

    // Memoize fetchMovieDetails and include fetchMovieScreenings in its dependencies.
    const fetchMovieDetails = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/movie?movieId=${movieId}`);
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }, [apiUrl, movieId]);

    // Call fetchMovieDetails whenever dependencies change.
    useEffect(() => {
        console.log('MovieDetails mounted or dependencies changed, fetching movie details...');
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