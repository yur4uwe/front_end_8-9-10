import { useState } from 'react';

/**
 * List of allowed credential types.
 * @type {string[]}
 */
export const credentialsTypes = [
    'email',
    'password',
    'name',
    'phone',
    'address',
    'city',
    'state',
    'zip',
];

/**
 * @typedef {Object} CredentialsObject
 * @property {string} [email]
 * @property {string} [password]
 * @property {string} [name]
 * @property {string} [phone]
 * @property {string} [address]
 * @property {string} [city]
 * @property {string} [state]
 * @property {string} [zip]
 */

/**
 * Custom hook for managing user credentials.
 * 
 * @returns {{
 *  addCredentials: (newCredentials: string, credentialType: string) => boolean,
 *  validateCredentials: (credentials: CredentialsObject) => boolean
 * }}
 */
const useCredentials = () => {
    /** 
     * The credentials object.
     * @type {[CredentialsObject, React.Dispatch<React.SetStateAction<CredentialsObject>>]}
     */
    const [credentials, setCredentials] = useState({});

    /**
     * Validates the given credentials.
     *
     * @param {CredentialsObject} credentials
     * @returns {boolean} Returns true if credentials are valid.
     */
    const validateCredentials = () => {
        console.log('Validating credentials:', credentials);

        const res = {
            passed: false,
            message: 'Validation failed',
        };

        // You can add validation logic depending on the credential type.
        for (const [credType, credValue] of Object.entries(credentials)) {
            console.log(`Validating ${credType}: ${credValue}`);

            switch (credType) {
                case 'email':
                    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!emailRegex.test(credValue)) {
                        res.passed = false;
                        res.message = 'Invalid email format';
                        return res;
                    }
                    break;
                case 'password':
                    if (credentials.password.length < 8) {
                        res.passed = false;
                        res.message = 'Invalid password format';
                        return res;
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^\d{10}$/;
                    if (!phoneRegex.test(credValue)) {
                        res.passed = false;
                        res.message = 'Invalid phone number format';
                        return res;
                    }
                    break;
                case 'zip':
                    const zipRegex = /^\d{5}$/;
                    if (!zipRegex.test(credValue)) {
                        res.passed = false;
                        res.message = 'Invalid zip code format';
                        return res;
                    }
                    break;
                case 'address':
                    if (credValue.length < 5) {
                        res.passed = false;
                        res.message = 'Address must be at least 5 characters long';
                        return res;
                    }
                    break;
                case 'city':
                    if (credValue.length < 2) {
                        res.passed = false;
                        res.message = 'City name must be at least 2 characters long';
                        return res;
                    }
                    break;
                case 'state':
                    if (credValue.length < 2) {
                        res.passed = false;
                        res.message = 'State name must be at least 2 characters long';
                        return res;
                    }
                    break;
                default:
                    break;
            }
        }

        return { passed: true, message: 'Validation passed' };
    };

    /**
     * Adds new credentials for a given credential type.
     *
     * @param {string} newCredentials The credentials value to add.
     * @param {string} credentialType The credential type. Must be one of {@link credentialsTypes}.
     * @returns {boolean} True if added successfully; false if the type is invalid.
     */
    const addCredentials = (newCredentials, credentialType) => {
        if (credentialsTypes.includes(credentialType)) {
            setCredentials((prev) => ({ ...prev, [credentialType]: newCredentials }));
            return true;
        } else {
            console.error(`Invalid credential type: ${credentialType}`);
            return false;
        }
    };

    return { addCredentials, validateCredentials };
};

export default useCredentials;