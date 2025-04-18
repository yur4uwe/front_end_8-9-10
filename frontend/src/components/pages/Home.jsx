import React from 'react';
import ContentBox from 'src/components/wrappers/ContentBox';
import MovieList from 'src/components/high/MovieList';
import MovieSearchBar from 'src/components/low/MovieSearchBar';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
    return (
        <div className='home'>
            <ContentBox>
                <div className="flex-center column">
                    <h1 className='title'>Welcome to CineSpot</h1>
                    <h2 className='title__under'>Now Showing</h2>
                </div>
            </ContentBox>
            <ContentBox>
                <MovieSearchBar />
                <MovieList />
            </ContentBox>
        </div>
    );
};

export default Home;