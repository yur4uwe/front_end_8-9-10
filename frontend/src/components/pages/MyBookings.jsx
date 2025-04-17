import React, { useCallback, useContext, useState } from 'react';
import TextArea from 'src/components/low/TextArea';
import BookingsList from 'src/components/high/BookingsList';
import useApi from 'src/hooks/useApi'; // Assuming you have a custom hook for API requests
import ButtonWrapper from 'src/components/wrappers/ButtonWrapper';
import { OverlayNoticeContext } from 'src/context/OverlayNoticeContext';
import useCredentials from 'src/hooks/useCredentials';
import './MyBookings.css'; // Optional: Create a separate CSS file for styling

const MyBookings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bookings, setBookings] = useState([]);
    const { request } = useApi(); // Assuming you have a custom hook for API requests
    const { openNotice } = useContext(OverlayNoticeContext)
    const { addCredentials, validateCredentials } = useCredentials()

    const fetchBookings = useCallback(async () => {
        addCredentials(name, 'name')
        addCredentials(email, 'email')
        addCredentials(phone, 'phone')

        if (name === '' && email === '' && phone === '') {
            openNotice('Please fill in at least one field to search for bookings!', 'error')
            return;
        }

        const { passed, message } = validateCredentials();
        if (!passed) {
            openNotice(message, 'error')
            return;
        }

        const bookings = await request(`/bookings?name=${name}&email=${email}&phone=${phone}`)
            .catch((error) => {
                console.error('Error fetching bookings:', error);
                openNotice('Failed to fetch bookings. Please try again later.', 'error')
            });

        for (const booking of bookings) {
            const movieId = booking.movieId;
            try {
                const movie = await request(`/movie?movieId=${movieId}`);
                if (movie) {
                    booking.movie = movie;
                } else {
                    console.error(`Movie with ID ${movieId} not found.`);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        }

        setBookings(bookings || []);
    }, [name, email, phone, request, openNotice, addCredentials, validateCredentials]);

    return (
        <div className='my-bookings-container'>
            <div className="my-bookings-inputs content-box">
                <h2>Find My Bookings</h2>
                <form className="inputs-container">
                    <TextArea
                        value={name}
                        name='Name'
                        placeholder='Enter name you used for bookings'
                        onChange={(e) => setName(e.target.value)}
                        color='#1e2c3a'
                        type='text'
                    />
                    <TextArea
                        value={email}
                        name='Email'
                        placeholder='Enter name you used for bookings'
                        onChange={(e) => setEmail(e.target.value)}
                        color='#1e2c3a'
                        type='email'
                    />
                    <TextArea
                        value={phone}
                        name='Phone'
                        placeholder='Enter name you used for bookings'
                        onChange={(e) => setPhone(e.target.value)}
                        color='#1e2c3a'
                        type='tel'
                    />
                    <ButtonWrapper onClick={fetchBookings}>Find</ButtonWrapper>
                </form>
            </div>
            <div className="bookings content-box">
                <h2>My Bookings</h2>
                <BookingsList bookings={bookings} />
            </div>
        </div>
    );
};

export default MyBookings;