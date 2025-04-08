import React, { useContext, useEffect, useState } from 'react';
import MovieCard from '../low/MovieCard';
import { SourceContext } from '../../context/SourceContext';
import Loader from '../low/Loader';
import './MovieList.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]); // movies list
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState(1); // Number of columns in the grid
    const { apiUrl } = useContext(SourceContext);

    const gap = 16;
    const minWidth = 200;

    // Update columns based on current window width
    const calculateColumns = () => {
        const containerWidth = window.innerWidth; // In a real-life scenario, use a ref to measure actual grid width
        const cols = Math.floor((containerWidth + gap) / (minWidth + gap)) || 1;
        setColumns(cols);
    };

    // Fetch movies from backend
    const fetchMovies = async () => {
        try {
            const response = await fetch(`${apiUrl}movies/short`);
            const data = await response.json();
            console.log('Fetched movies:', data);
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    // Set up resize listener to recalc columns
    useEffect(() => {
        calculateColumns(); // initial calculation
        window.addEventListener('resize', calculateColumns);
        return () => window.removeEventListener('resize', calculateColumns);
    }, []);

    // Fetch movies on mount
    useEffect(() => {
        console.log('MovieList mounted, fetching movies...');
        fetchMovies();
    }, [apiUrl]);

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
    if (!movies || movies.length === 0) return <p>No movies available.</p>;

    return (
        <div className="movie-grid">
            {renderMovieCards()}
        </div>
    );
};

export default MovieList;