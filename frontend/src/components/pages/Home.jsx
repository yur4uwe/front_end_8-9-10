import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const movies = [
    { id: 1, title: "Inception", description: "A mind-bending thriller." },
    { id: 2, title: "Interstellar", description: "A journey through space and time." },
    { id: 3, title: "The Dark Knight", description: "A gripping superhero tale." },
];

const Home = () => {
    return (
        <div className='home'>
            <h1>Welcome to CineSpot</h1>
            <h2>Now Showing</h2>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                        <Link to={`/booking/${movie.id}`}>Book Tickets</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;