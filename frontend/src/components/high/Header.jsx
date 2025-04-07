import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SourceContext } from '../../context/SourceContext'; // Adjust the import path as necessary
import './Header.css';

const Header = () => {
    const { imageBaseUrl } = useContext(SourceContext);

    const [headerHeight, setHeaderHeight] = useState(300); // Default max height

    const maxHeight = 300; // Maximum height of the header
    const minHeight = 60;  // Minimum height of the header
    const padding = 20;   // Padding to subtract from the height calculation

    useEffect(() => {
        const handleScroll = () => {
            const newHeight = Math.max(
                minHeight,
                maxHeight - 2 * padding - window.scrollY
            );
            setHeaderHeight(newHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header
                className={`header-sticky ${headerHeight <= minHeight ? 'header-minimized' : ''}`}
                style={{ height: `${headerHeight}px` }}
            >
                <div className="header-container">

                <h1 className="header-title">CineSpot</h1>
                <nav className="header-nav">
                    <Link to="/" className="header-link">Home</Link>
                    <Link to="/about" className="header-link">About</Link>
                    <Link to="/contact" className="header-link">Contact</Link>
                </nav>
                </div>
                <picture>
                    {/* <source media="(max-width: 600px)" srcSet="/images/header-small.jpg" />
                    <source media="(max-width: 1200px)" srcSet="/images/header-medium.jpg" /> */}
                    <img src={imageBaseUrl + `movie-theater-background.webp`} alt="CineSpot Header" className="header-image" />
                </picture>
            </header>
            
            <div className="header-filler"></div>
        </>
    );
};


export default Header;