import React, { useContext, useEffect, useState } from 'react';
import MovieCard from '../low/MovieCard';
import { SourceContext } from '../../context/SourceContext';
import Loader from '../low/Loader';
import './MovieList.css'; // Assuming you have a CSS file for styling

/**
 * @typedef {Object} MovieListProps
 * @property {Array<import('../low/MovieCard').MovieInfo>} movies - Array of movie objects to be displayed.
 */

/**
 * 
 * @param {MovieListProps} param0 
 * @returns 
 */
const MovieList = () => {
    const [movies, setMovies] = useState([]); // Initialize state for movies
    const [loading, setLoading] = useState(true); // Initialize loading state

    const { apiUrl } = useContext(SourceContext)

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${apiUrl}movies`);
            const data = await response.json();
            console.log('Fetched movies:', data); // Log the fetched movies for debugging
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('MovieList mounted, fetching movies...'); // Log when the component mounts
        fetchMovies();
    }, [apiUrl]); // Dependency array includes apiUrl

    if (!loading && (!movies || movies.length === 0)) {
        return <p>No movies available.</p>; // Handle the case where there are no movies
    }

    if (loading) {
        return <Loader description='Loading Movies' />; // Show loading message while fetching data
    }

    return (
        <div className='movie-grid'>
            {!loading && movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} /> // Assuming MovieCard accepts a movie prop
            ))}
        </div>
    );
};

export default MovieList;