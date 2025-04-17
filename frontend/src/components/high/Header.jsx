import React, { useState, useEffect } from 'react';
import HeaderLinks from 'src/components/low/HeaderLinks';
import HeaderImage from '../low/HeaderImage';
import './Header.css';

const Header = () => {
    const [headerHeight, setHeaderHeight] = useState(300);
    const maxHeight = 300;
    const collapseHeight = 200; // Height at which the header is considered collapsed
    const minHeight = 60;

    useEffect(() => {
        const handleScroll = () => {
            const newHeight = Math.max(minHeight, maxHeight - window.scrollY);
            setHeaderHeight(newHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`header-sticky ${headerHeight <= collapseHeight ? 'header-minimized' : ''}`}
                style={{ height: `${headerHeight}px` }}
            >
                <HeaderLinks />
                <HeaderImage />
            </header>
            <div className="header-filler"></div>
        </>
    );
};

export default Header;