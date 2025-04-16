import React, { useContext } from 'react';
import ContentBox from '../wrappers/ContentBox';
import { SeatBookingCtx } from '../../context/SeatBookingContext';
import Loader from '../low/Loader';
import Seats from './Seats';

const SeatChooser = () => {
    const { loading } = useContext(SeatBookingCtx);

    return (
        <ContentBox style={{ height: 'min-content' }}>
            <h1>Choose Your Seat</h1>
            <div className="container">
                <div className="seats-container">
                    <svg
                        className="screen-svg"
                        viewBox="0 0 200 40"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid meet"
                        style={{ width: '600px', height: '120px' }}  // setting explicit dimensions
                    >
                        <path d="M0 40 C50 0, 150 0, 200 40" fill="none" stroke="#e0e0e0" strokeWidth="1" />
                        <text x="100" y="35" fill="#fff" fontSize="14" textAnchor="middle">
                            SCREEN
                        </text>
                    </svg>
                    {loading ? <Loader description='loading seating plan' /> : <Seats />}
                </div>
            </div>
        </ContentBox>
    );
};

export default SeatChooser;