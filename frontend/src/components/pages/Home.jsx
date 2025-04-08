import React from 'react';
import { Link } from 'react-router-dom';
import ContentBox from '../wrappers/ContentBox';
import MovieList from '../high/MovieList';
import './Home.css'; // Import the CSS file for styling

const movies = [
    { id: 1, title: "Inception", description: "A mind-bending thriller." },
    { id: 2, title: "Interstellar", description: "A journey through space and time." },
    { id: 3, title: "The Dark Knight", description: "A gripping superhero tale." },
];

const Home = () => {
    return (
        <div className='home'>
            <ContentBox>
                <h1>Welcome to CineSpot</h1>
                <h2>Now Showing</h2>
            </ContentBox>
            <ContentBox>
                <MovieList />
            </ContentBox>
        </div>
    );
};

export default Home;