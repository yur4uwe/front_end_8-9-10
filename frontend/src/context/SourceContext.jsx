import React, { createContext } from "react";

const SourceContext = createContext({
  source: "https://api.themoviedb.org/3",
  apiKey: "YOUR_API_KEY", // Replace with your actual API key
  imageBaseUrl: "https://localhost:8080/assets/",
});

const SourceProvider = ({ children }) => {
    return (
        <SourceContext.Provider value={SourceContext}>
            {children}
        </SourceContext.Provider>
    );
};

export { SourceContext, SourceProvider };
