import React, { createContext, useState } from 'react';
import { useCallback, useEffect } from 'react';
import useApi from 'src/hooks/useApi'; // Assuming you have a custom hook for API requests

/**
 * @typedef {Object} MovieContextType
 * @property {Array} movies - List of movies
 * @property {boolean} loading - Loading state
 * @property {string} searchTerm - Search term for filtering movies
 * @property {number} columns - Number of columns in the grid
 * @property {Function} setMovies - Function to set movies
 * @property {Function} setLoading - Function to set loading state
 * @property {Function} setSearchTerm - Function to set search term
 * @property {Function} setColumns - Function to set number of columns
 * @property {Function} fetchMovies - Function to fetch movies from the backend
 */

/**
 * @type {React.Context<MovieContextType>} MovieContext
 */
export const MovieContext = createContext();

const calculateColumns = () => {
    const gap = 16;
    const minWidth = 200;

    const containerWidth = window.innerWidth - 20 - 40; // In a real-life scenario, use a ref to measure actual grid width
    const cols = Math.floor((containerWidth) / (minWidth + gap)) || 1;

    return cols;
};

const MovieContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [columns, setColumns] = useState(1);
    const { request, error } = useApi();

    const fetchMovies = useCallback(async () => {
        const response = await request(`/movies/short?columns=${columns}&perColumn=5`);
        if (error) {
            console.error('Error fetching movies:', error);
            setLoading(false);
            return;
        }

        setMovies(response);
        setLoading(false);
    }, [columns, request, error]);

    // Set up resize listener to recalc columns
    useEffect(() => {
        setColumns(calculateColumns()); // initial calculation
        window.addEventListener('resize', () => setColumns(calculateColumns));
        return () => window.removeEventListener('resize', () => setColumns(calculateColumns));
    }, [fetchMovies]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <MovieContext.Provider value={{
            movies,
            loading,
            searchTerm,
            columns,
            setMovies,
            setLoading,
            setSearchTerm,
            setColumns,
            fetchMovies,
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContextProvider;