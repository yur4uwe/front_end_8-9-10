import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header-block">
            <div className="header-sticky">
                <h1 className="header-title">CineSpot</h1>
                <nav className="header-nav">
                    <Link to="/" className="header-link">Home</Link>
                    <Link to="/about" className="header-link">About</Link>
                    <Link to="/contact" className="header-link">Contact</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;