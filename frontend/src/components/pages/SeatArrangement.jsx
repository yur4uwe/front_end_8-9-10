import React, { useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SourceContext } from '../../context/SourceContext'; // Assuming you have a context for the API URL
import './SeatArrangement.css';

const SeatArrangement = () => {
    const { id: screeningId } = useParams();
    const { apiUrl } = useContext(SourceContext); // Assuming you have a context for the API URL

    const fetchScreening = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/screening/${screeningId}`);
            const data = await response.json();
            console.log('Fetched screening data:', data); // Debugging line
        } catch (error) {
            console.error('Error fetching screening data:', error);
        }
    })

    return (
        <div>

        </div>
    );
};

export default SeatArrangement;