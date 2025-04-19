import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom'; // Importing necessary hooks from react-router-dom
import useApi from '../hooks/useApi'; // Assuming you have a custom hook for API requests
import { OverlayNoticeContext } from 'src/context/OverlayNoticeContext';

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
 * @property {string} name - Name of the user.
 * @property {string} email - Email of the user.
 * @property {string} phone - Phone number of the user.
 * @property {(name: string) => void} setName - Function to update the name state.
 * @property {(email: string) => void} setEmail - Function to update the email state.
 * @property {(phone: string) => void} setPhone - Function to update the phone state.
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const history = useHistory(); // Using useHistory from react-router-dom for navigation
    const { request } = useApi(); // Assuming you have a custom hook for API requests
    const { openNotice } = useContext(OverlayNoticeContext); // Assuming you have a context for notices

    // Load selectedSeats on mount
    useEffect(() => {
        const storedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        console.log("Stored seats from localStorage:", storedSeats); // Debugging line

        if (storedSeats.length > 0) {
            try {
                setSelectedSeats(storedSeats);
            } catch (error) {
                console.error("Error parsing selectedSeats from localStorage:", error);
                setSelectedSeats([]);
            }
        }
    }, []);

    // Save selectedSeats whenever it changes
    useEffect(() => {
        if (!loading) {
            console.log("Saving selectedSeats to localStorage:", selectedSeats); // Debugging line
            localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
        }
    }, [selectedSeats, loading]);

    const fetchScreening = useCallback(async () => {
        try {
            const response = await request(`/movie/screening?screeningId=${screeningId}`);
            setScreening(response.seats);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching screening data:', error);
        }
    }, [screeningId, request]);

    useEffect(() => {
        fetchScreening();
    }, [fetchScreening]);

    const onSeatSelect = (seat) => {
        if (!seat.available) {
            return;
        }
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
        if (selectedSeats.length === 0) {
            return;
        }
        if (name === '' || email === '' || phone === '') {
            openNotice('Please fill in all the fields!', 'error');
            return;
        }
        if (!selectedSeats.every((seat) => seat.available)) {
            openNotice('Some selected seats are not available!', 'error');
            return;
        }

        try {
            const response = await request(`/movie/screening/confirm`, true, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    screeningId,
                    user: {
                        name,
                        email,
                        phone,
                    },
                    seats: selectedSeats.map((seat) => ({
                        row: seat.row,
                        number: seat.number,
                    })),
                }),
            });

            if (response.message === 'Booking confirmed') {
                openNotice('Your seats have been booked successfully!', 'success');
                history.push('/'); // Redirect to the home page or any other page after confirmation
                setSelectedSeats([]); // Clear selected seats after confirmation
                setIsModalOpen(false); // Close the modal after confirmation
                localStorage.removeItem('selectedSeats'); // Clear local storage
            }

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
            name,
            email,
            phone,
            fetchScreening,
            onSeatSelect,
            setScreening,
            setLoading,
            setIsModalOpen,
            openModal,
            closeModal,
            confirmSeats,
            setName,
            setEmail,
            setPhone,
        }}>
            {children}
        </SeatBookingCtx.Provider>
    );
};

export default SeatBookingProvider;