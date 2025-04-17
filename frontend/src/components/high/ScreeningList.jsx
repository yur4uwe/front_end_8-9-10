import React from 'react';
import ScreeningCard from '../low/ScreeningCard';
import './ScreeningList.css';

/**
 * @typedef {Object} ScreeningListProps
 * @property {import('../pages/Booking').Screening} screenings - Array of screening objects.
 */

/**
 * 
 * @param {ScreeningListProps} param0 
 * @returns 
 */
const ScreeningList = ({ screenings }) => {
    const screeningDaysPerColumn = Math.floor((window.innerWidth - 40) / 210); // 200px per column
    console.log(screeningDaysPerColumn);

    /**
     * 
     * @param {Screening[]} screening 
     */
    const findScreeningDays = () => {
        return screenings.reduce((acc, screening) => {
            const date = new Date(screening.time).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });

            if (!acc.includes(date)) {
                acc.push(date);
            }
            return acc;
        }, []);
    }

    return (
        <div className='screenings-list'>
            {findScreeningDays().map((day, index) => {
                return (
                    <div key={index} className='screening-day'>
                        <h2 className='day-title'>{day}</h2>
                        <div className="day-screenings">
                            {screenings.filter(screening => new Date(screening.time)
                                .toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }) === day)
                                .sort((a, b) => new Date(a.time) - new Date(b.time))
                                .map((screening, index) => {
                                    return <ScreeningCard key={index} screening={screening} />;
                                })
                            }
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ScreeningList;