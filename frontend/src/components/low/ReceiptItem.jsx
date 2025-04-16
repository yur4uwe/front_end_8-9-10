import React, { useState, useEffect, useRef } from 'react';
import ButtonWrapper from '../wrappers/ButtonWrapper';
import './ReceiptItem.css'; // Assuming you have CSS for the fade-out animation

const ReceiptItem = ({ seat, onRemove, className }) => {
    const [removing, setRemoving] = useState(false);
    const itemRef = useRef(null);

    const handleCancel = () => {
        setRemoving(true);
    };

    useEffect(() => {
        if (removing && itemRef.current) {
            const handleAnimationEnd = () => {
                onRemove(seat);
            };
            // Listen for the end of the fade-out animation.
            const node = itemRef.current;
            node.addEventListener('animationend', handleAnimationEnd);
            return () => node.removeEventListener('animationend', handleAnimationEnd);
        }
    }, [removing, onRemove, seat]);

    return (
        <div
            ref={itemRef}
            className={`receipt-item ${removing ? 'fade-out-down' : 'fade-in-up'} ${className ?? ''}`}
        >
            <div className="seat-info">
                Row: {seat.row}, Seat: {seat.number}
                <p>Price: {seat.price}</p>
            </div>
            <ButtonWrapper onClick={handleCancel} className='cancel-button'>
                Cancel
            </ButtonWrapper>
        </div>
    );
};

export default ReceiptItem;