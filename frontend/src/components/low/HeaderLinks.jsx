import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderLinks.css'; // Optional: Create a separate CSS file or rely on Header.css

const HeaderLinks = () => {
    return (
        <div className="header-container">
            <h1 className="header-title">CineSpot</h1>
            <nav className="header-nav">
                <Link to="/" className="header-link">Home</Link>
                <Link to="/about" className="header-link">About</Link>
                <Link to="/contact" className="header-link">Contact</Link>
            </nav>
        </div>
    );
};

export default HeaderLinks;