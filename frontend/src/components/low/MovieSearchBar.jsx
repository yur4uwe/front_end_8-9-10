import React, { useContext } from 'react';
import TextArea from './TextArea';
import { MovieContext } from 'src/context/MovieContext';
import './MovieSearchBar.css';

const MovieSearchBar = () => {
    const { searchTerm, setSearchTerm } = useContext(MovieContext);
    return (
        <div className='movie-search-bar'>
            <TextArea
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="movie-search-input"
                color='#000000'
            />
        </div>
    );
};

export default MovieSearchBar;