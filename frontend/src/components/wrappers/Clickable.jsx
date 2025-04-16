import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Clickable = ({ link, children, className }) => {
    return (
        <Link to={link} className={`clickable ${className ?? ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {children}
        </Link >
    );
};

export default Clickable;