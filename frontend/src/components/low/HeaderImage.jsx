import React, { useContext } from 'react';
import { SourceContext } from '../../context/SourceContext';
import './HeaderImage.css'; // Optional: Create a separate CSS file or rely on Header.css

const HeaderImage = () => {
    const { imageBaseUrl } = useContext(SourceContext);
    return (
        <picture>
            <img
                src={imageBaseUrl + 'movie-theater-background.webp'}
                alt="CineSpot Header"
                className="header-image"
            />
        </picture>
    );
};

export default HeaderImage;