import React, { useCallback, useEffect, useState } from 'react';
import MovieCard from '../low/MovieCard';
import Loader from '../low/Loader';
import './MovieList.css';
import useApi from '../../hooks/useApi';

const MovieListFallBack = () => {
    return (
        <div className="movie-grid-fallback">
            <p>No movies available.</p>
        </div>
    );
};

const MovieList = () => {
    // Update columns based on current window width
    const calculateColumns = () => {
        const gap = 16;
        const minWidth = 200;

        const containerWidth = window.innerWidth - 20 - 40; // In a real-life scenario, use a ref to measure actual grid width
        const cols = Math.floor((containerWidth) / (minWidth + gap)) || 1;

        return cols;
    };

    const [movies, setMovies] = useState([]); // movies list
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState(calculateColumns()); // Number of columns in the grid
    const { request, error } = useApi(); // Assuming you have a custom hook for API requests

    // Fetch movies from backend
    const fetchMovies = useCallback(async () => {
        const response = await request(`/movies/short?columns=${columns}&perColumn=5`);
        if (error) {
            console.error('Error fetching movies:', error);
            setLoading(false);
            return;
        }

        setMovies(response.movies);
        setLoading(false);
    }, [columns, request, error]);

    // Set up resize listener to recalc columns
    useEffect(() => {
        setColumns(calculateColumns()); // initial calculation
        window.addEventListener('resize', () => setColumns(calculateColumns));
        return () => window.removeEventListener('resize', () => setColumns(calculateColumns));
    }, [fetchMovies]);

    // Fetch movies on mount
    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    // Render MovieCards using the dynamically calculated column count.
    const renderMovieCards = () => {
        return movies.map((movie, index) => {
            const isLastChild = ((index + 1) % columns === 0);
            return (
                <MovieCard
                    movie={movie}
                    isLastChild={isLastChild}
                    key={movie._id}
                />
            );
        });
    };

    if (loading) return <Loader description="Loading Movies" />;
    if (!movies || movies.length === 0) return <MovieListFallBack />;

    return (
        <div className="movie-grid">
            {renderMovieCards()}
        </div>
    );
};

export default MovieList;