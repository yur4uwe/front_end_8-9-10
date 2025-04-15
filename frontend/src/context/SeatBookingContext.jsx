import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { SourceContext } from './SourceContext'; // Ensure you have this context set up

export const SeatBookingCtx = createContext();

const SeatBookingProvider = ({ screeningId, children }) => {
    const [screening, setScreening] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const { apiUrl } = useContext(SourceContext);

    const fetchScreening = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/movie/screening?screeningId=${screeningId}`);
            const data = await response.json();
            setScreening(data.seats);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching screening data:', error);
        }
    }, [screeningId, apiUrl]);

    useEffect(() => {
        fetchScreening();
    }, [fetchScreening]);

    const onSeatSelect = (seat) => {
        setSelectedSeats((prev) => {
            const seatExists = prev.some(
                (s) => s.row === seat.row && s.number === seat.number
            );
            if (seatExists) {
                return prev.filter(
                    (s) => !(s.row === seat.row && s.number === seat.number)
                );
            }
            return [...prev, seat];
        });
    };

    return (
        <SeatBookingCtx.Provider value={{
            screening,
            selectedSeats,
            loading,
            fetchScreening,
            onSeatSelect,
            setScreening,
            setLoading
        }}>
            {children}
        </SeatBookingCtx.Provider>
    );
};

export default SeatBookingProvider;