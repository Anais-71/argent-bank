import { jwtDecode } from 'jwt-decode';

/**
 * Retrieves the token from local storage.
 * @returns {string|null} The token string if it exists, otherwise null.
 */
export const getToken = () => localStorage.getItem('token');

/**
 * Decodes a given JSON Web Token (JWT).
 * @param {string} token - The JWT string to be decoded.
 * @returns {Object|null} The decoded token object if successful, otherwise null.
 */
export const decodeToken = (token) => {
  if (!token) {
    console.error('Token missing'); // Log error if token is missing.
    return null;
  }
  try {
    return jwtDecode(token); // Attempt to decode the token using jwtDecode.
  } catch (error) {
    console.error('Error decoding token:', error); // Log error if decoding fails.
    return null;
  }
};

/**
 * Retrieves the token from local storage and decodes it if it exists.
 * @returns {Object|null} The decoded token object if the token exists and is valid, otherwise null.
 */
export const getDecodedToken = () => {
  const token = getToken(); // Get the token from local storage.
  return token ? decodeToken(token) : null; // Decode the token if it exists, otherwise return null.
};
