import React, { useContext } from 'react';
import ContentBox from '../wrappers/ContentBox';
import { SeatBookingCtx } from '../../context/SeatBookingContext';
import ReceiptItem from '../low/ReceiptItem';
import Modal from '../low/Modal'; // Assume you have a simple Modal component
import ButtonWrapper from '../wrappers/ButtonWrapper';
import './SeatReceipt.css';
import TextArea from '../low/TextArea';

const SeatReceipt = () => {
    const {
        selectedSeats,
        onSeatSelect,
        openModal,
        closeModal,
        isModalOpen,
        confirmSeats,
        name,
        email,
        phone,
        setName,
        setEmail,
        setPhone,
    } = useContext(SeatBookingCtx);

    const handleRemoveSeat = (seat) => {
        onSeatSelect(seat);
    };

    // Determine displayed seats
    const displayedSeats =
        selectedSeats.length > 5
            ? [...selectedSeats.slice(0, 4), { special: true }]
            : selectedSeats;

    const SeatConfirmer = ({ onPayClick }) => {
        return (
            <div className="receipt-item">
                <div className="receipt-sum">
                    <p>
                        Total:{' '}
                        {selectedSeats.reduce(
                            (total, seat) => total + seat.price,
                            0
                        )}
                    </p>
                    <p>Seats booked: {selectedSeats.length}</p>
                </div>
                <ButtonWrapper className="pay-button" onClick={onPayClick}>Pay</ButtonWrapper>
            </div>
        );
    }

    return (
        <ContentBox className="receipt">
            <h2>Receipt</h2>
            <div className="receipt-content">
                {selectedSeats.length > 0 && (
                    <div>
                        {displayedSeats.map((seat, index) => {
                            if (seat.special) {
                                return (
                                    <li
                                        key="special"
                                        className="receipt-item special"
                                        onClick={openModal}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        +{selectedSeats.length - 4} more
                                    </li>
                                );
                            }
                            return (
                                <ReceiptItem
                                    key={`${seat.row}-${seat.number}`}
                                    seat={seat}
                                    onRemove={handleRemoveSeat}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            <SeatConfirmer onPayClick={() => openModal()} />

            {isModalOpen && (
                <Modal toClose={closeModal}>
                    <h3>All Booked Seats</h3>
                    <div className='receipt-modal-confirm-container'>
                        <div className="confirm-inputs">
                            <TextArea
                                name="Name"
                                value={name}
                                className="receipt-text-area"
                                placeholder="Type here..."
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextArea
                                name="Email"
                                value={email}
                                className="receipt-text-area"
                                placeholder="Type here..."
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextArea
                                name="Phone"
                                value={phone}
                                className="receipt-text-area"
                                placeholder="Type here..."
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <SeatConfirmer onPayClick={confirmSeats} />
                    </div>
                    {selectedSeats.length > 0 && <div className='receipt-confirm-modal'>
                        {selectedSeats.map((seat) => (
                            <ReceiptItem key={`${seat.row}-${seat.number}`} seat={seat} onRemove={handleRemoveSeat}>
                                Row: {seat.row}, Seat: {seat.number} (Price: {seat.price})
                            </ReceiptItem>
                        ))}
                    </div>}
                    <ButtonWrapper onClick={closeModal}>Close</ButtonWrapper>
                </Modal>
            )}
        </ContentBox>
    );
};

export default SeatReceipt;