import { useState, useCallback } from 'react';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Makes an API request.
     * @param {string} url - The endpoint URL.
     * @param {object} options - Fetch options like method, headers, body.
     * @returns {Promise<any>} - Parsed JSON response.
     */
    const request = useCallback(async (url, verbose, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, options);
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
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { request, loading, error };
};

export default useApi;