import React, { useReducer } from 'react';

/**
 * @typedef {Object} movieReducerAction
 * @property {string} type - The action type.
 * @property {Object} payload - The payload for the action.
 */

/**
 * @typedef {Object} movieReducerState
 * @property {string} movie - The movie state object.
 * @property {string} screenings - The array of screenings state object.
 */

/**
 * @type {movieReducerState} initialState
 */
const initialState = {}

/**
 * @param {movieReducerState} state 
 * @param {movieReducerAction} action 
 * @returns 
 */
function movieReducer(state, action) {
    switch (action.type) {

        default:
            return state;
    }
}


const MovieContext = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialState); // Placeholder for reducer and initial state

    return (
        <MovieContext.Provider value={{ state, dispatch }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContext;