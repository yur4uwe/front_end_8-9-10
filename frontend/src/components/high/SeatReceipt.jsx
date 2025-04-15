import React, { useContext } from 'react';
import ContentBox from '../wrappers/ContentBox';
import { SeatBookingCtx } from '../../context/SeatBookingContext';
import './SeatReceipt.css';
import LinkWrapper from '../wrappers/LinkWrapper';

const SeatReceipt = () => {
    const { selectedSeats } = useContext(SeatBookingCtx);

    return (
        <ContentBox className="receipt">
            <h2>Receipt</h2>
            <div className="receipt-content">
                {selectedSeats.length > 0 ? (
                    <ul>
                        {selectedSeats.map((seat, index) => (
                            <li key={index}>
                                Row: {seat.row}, Seat: {seat.number}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No seats selected</p>
                )}
            </div>
            <LinkWrapper className='pay-button'>Pay</LinkWrapper>
        </ContentBox>
    );
};

export default SeatReceipt;