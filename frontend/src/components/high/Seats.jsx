import React, { useContext } from 'react';
import { SeatBookingCtx } from '../../context/SeatBookingContext';
import './Seats.css';
/**
 * 
 * @param {{screening:import('../pages/Booking').Seat[], onSeatSelect:Function}} param0 
 * @returns 
 */

const Seats = () => {
    const { screening, onSeatSelect, selectedSeats } = useContext(SeatBookingCtx);

    const regularRowWidth = 6;
    const vipRowWidth = 10;
    const regularRows = 8;
    const vipRows = 3;

    const seats = []

    for (let i = 0; i <= regularRows + vipRows; i++) {
        for (let j = 0; j <= Math.max(regularRowWidth, vipRowWidth); j++) {
            const isVip = i >= regularRows ? true : false;
            let seatClass = "seat";

            if (!isVip && j < 2) {
                seats.push(
                    <div key={`${i}-${j}`} className={`seat filler`}></div>
                );
                continue;
            }
            let seat = null;
            if (isVip) {
                seat = screening.find(seat => seat.row === i + 1 && seat.number === j + 1);
            } else {
                seat = screening.find(seat => seat.row === i + 1 && seat.number === j - 1);
            }

            if (seat && selectedSeats.some(s => s.row === seat.row && s.number === seat.number)) {
                seatClass += ' selected';
            }


            if (seat) {
                const seatAvailable = seat.available ? 'available' : 'unavailable';
                const seatType = seat.type === 'VIP' ? 'vip' : 'regular';
                seatClass += ` ${seatAvailable} ${seatType}`;
                seats.push(
                    <button key={`${i}-${j}`} className={seatClass} onClick={() => onSeatSelect(seat)}></button>
                );
            } else {
                seats.push(
                    <button key={`${i}-${j}`} className={`seat filler`}></button>
                );
            }
        }
    }

    return (
        <div className="seats">
            {seats}
        </div>
    );
};

export default Seats;