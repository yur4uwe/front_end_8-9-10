import React, { useContext } from 'react';
import MovieCard from 'src/components/low/MovieCard';
import Loader from 'src/components/low/Loader';
import { MovieContext } from 'src/context/MovieContext';
import './MovieList.css';

const MovieListFallBack = () => {
    return (
        <div className="movie-grid-fallback">
            <p>No movies available :(</p>
        </div>
    );
};

const MovieList = () => {
    const { movies, loading, columns, searchTerm } = useContext(MovieContext);

    const renderMovieCards = () => {
        return movies.map((movie, index) => {
            if (searchTerm && !movie.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return null;
            }
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
    if (
        !movies || movies.length === 0 || !renderMovieCards().some((value) => value !== null)
    ) return <MovieListFallBack />;

    return (
        <div className="movie-grid">
            {renderMovieCards()}
        </div>
    );
};

export default MovieList;