import React, { createContext } from "react";

// Create the context
/**
 * @typedef {Object} SourceContextType
 * @property {string} source - The base URL for the API.
 * @property {string} apiUrl - The API URL for the application.
 * @property {string} imageBaseUrl - The base URL for images.
 */

/**
 * @type {React.Context<SourceContextType>} SourceContext
 */
const SourceContext = createContext();

const SourceProvider = ({ children }) => {
    return (
        <SourceContext.Provider value={{
            source: "http://api.themoviedb.org/3",
            apiUrl: "http://localhost:8080/api/v1",
            imageBaseUrl: "http://localhost:8080/assets/",
        }}>
            {children}
        </SourceContext.Provider>
    );
};

export { SourceProvider, SourceContext };
