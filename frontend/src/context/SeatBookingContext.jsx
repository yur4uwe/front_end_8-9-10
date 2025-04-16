import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import useApi from '../hooks/useApi'; // Assuming you have a custom hook for API requests
import { SourceContext } from './SourceContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

/**
 * @typedef {Object} Seat
 * @property {number} row - The row number of the seat.
 * @property {number} number - The seat number.
 * @property {boolean} available - Seat availability.
 * @property {number} price - Price of the seat.
 * @property {string} type - Type of seat (e.g., "VIP" or "regular").
 */

/**
 * @typedef {Object} SeatBookingContextValue
 * @property {Seat[]} screening - The array of seat objects for the screening.
 * @property {Seat[]} selectedSeats - The list of currently selected seats.
 * @property {boolean} loading - Indicates if the screening data is loading.
 * @property {() => Promise<void>} fetchScreening - Function to request screening data.
 * @property {(seat: Seat) => void} onSeatSelect - Function to select or deselect a seat.
 * @property {(seats: Seat[]) => void} setScreening - Function to update the screening state.
 * @property {(loading: boolean) => void} setLoading - Function to update the loading state.
 * @property {(isOpen: boolean) => void} setIsModalOpen - Function to update the modal state.
 * @property {boolean} isModalOpen - Indicates if the modal is open.
 * @property {() => void} openModal - Function to open the modal.
 * @property {() => void} closeModal - Function to close the modal.
 * @property {() => void} confirmSeats - Function to confirm selected seats.
 */

/**
 * React Context for Seat Booking.
 * @type {React.Context<SeatBookingContextValue>}
 */
export const SeatBookingCtx = createContext();

/**
 * @param {{ screeningId: string, children: React.ReactNode }} props
 */
const SeatBookingProvider = ({ screeningId, children }) => {
    const [screening, setScreening] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { request } = useApi(); // Assuming you have a custom hook for API requests
    const { apiUrl } = useContext(SourceContext);


    const fetchScreening = useCallback(async () => {
        try {
            const response = await request(`${apiUrl}/movie/screening?screeningId=${screeningId}`);
            setScreening(response.seats);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching screening data:', error);
        }
    }, [screeningId, apiUrl]);

    useEffect(() => {
        fetchScreening();
    }, [fetchScreening]);

    const onSeatSelect = (seat) => {
        console.log('Selected seat:', seat);
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

    const confirmSeats = async () => {
        try {
            const response = await request(`${apiUrl}/movie/screening/confirm`, true, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    screeningId,
                    seats: selectedSeats.map((seat) => ({
                        row: seat.row,
                        number: seat.number,
                    })),
                }),
            });
        } catch (error) {
            console.error('Error confirming seats:', error);
        }
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <SeatBookingCtx.Provider value={{
            screening,
            selectedSeats,
            loading,
            isModalOpen,
            fetchScreening,
            onSeatSelect,
            setScreening,
            setLoading,
            setIsModalOpen,
            openModal,
            closeModal,
            confirmSeats,
        }}>
            {children}
        </SeatBookingCtx.Provider>
    );
};

export default SeatBookingProvider;