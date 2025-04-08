import React from 'react';
import ContentBox from '../wrappers/ContentBox';
import MovieList from '../high/MovieList';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
    return (
        <div className='home'>
            <ContentBox>
                <div className="flex-center column">
                    <h1>Welcome to CineSpot</h1>
                    <h2>Now Showing</h2>
                </div>
            </ContentBox>
            <ContentBox>
                <MovieList />
            </ContentBox>
        </div>
    );
};

export default Home;