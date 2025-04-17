import { useState, useCallback, useContext } from 'react';
import { SourceContext } from '../context/SourceContext'; // Adjust the import path as necessary

const useApi = () => {
    const { apiUrl } = useContext(SourceContext);
    const [error, setError] = useState(null);
    /**
     * Makes an API request.
     * @param {string} url - The endpoint URL.
     * @param {object} options - Fetch options like method, headers, body.
     * @returns {Promise<any>} - Parsed JSON response.
     */
    const request = useCallback(async (url, verbose, options = {}) => {
        try {
            const response = await fetch(`${apiUrl}${url}`, options);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'API request failed');
            }
            const data = await response.json();
            if (verbose) {
                console.log(`API response from ${url}:`, data);
            }
            return data;
        } catch (err) {
            setError(err.message);
            console.error(`Error in API request to ${url}:`, err.message);
        }
    }, [apiUrl]);

    return { request, error };
};

export default useApi;