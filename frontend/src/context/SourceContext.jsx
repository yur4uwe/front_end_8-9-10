import React, { createContext } from "react";

// Create the context
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
