import React from 'react';
import { useParams } from 'react-router-dom';
import SeatChooser from '../high/SeatChooser';
import SeatReceipt from '../high/SeatReceipt';
import SeatBookingProvider from '../../context/SeatBookingContext';
import './SeatArrangement.css';

const SeatArrangement = () => {
    const { id: screeningId } = useParams();
    return (
        <SeatBookingProvider screeningId={screeningId}>
            <div className="seat-arrangement">
                <SeatChooser />
                <SeatReceipt />
            </div>
        </SeatBookingProvider>
    );
};

export default SeatArrangement;