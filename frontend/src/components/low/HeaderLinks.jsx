import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderLinks.css';

const HeaderLinks = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className="header-container">
            <div className="header-top">
                <h1 className="header-title">CineSpot</h1>
                <button className="burger-icon" onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <nav className={`header-nav ${isMobileMenuOpen ? 'active' : ''}`}>
                <Link to="/" className="header-link" onClick={() => setMobileMenuOpen(false)}>
                    Home
                </Link>
                <Link to="/about" className="header-link" onClick={() => setMobileMenuOpen(false)}>
                    About
                </Link>
                <Link to="/my-bookings" className="header-link" onClick={() => setMobileMenuOpen(false)}>
                    Find My Bookings
                </Link>
            </nav>
        </div>
    );
};

export default HeaderLinks;