import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1'; // Base URL for the API

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor to automatically add the token to the request headers if it exists in localStorage.
 * @param {Object} config - Axios request configuration.
 * @returns {Object} Updated request configuration with Authorization header if token is present.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers
  }
  return config;
}, (error) => {
  console.error('Error sending request:', error);
  return Promise.reject(error); // Handle request error
});

/**
 * Logs in the user by sending a POST request to the login endpoint.
 * Stores the received token in localStorage.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Promise<string>} The authentication token if login is successful.
 * @throws Will throw an error if login fails.
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password }); // Send login request
    console.log('API response:', response.data); // Log the complete API response
    
    const token = response.data.body.token; // Extract token from the response
    if (!token) {
      throw new Error('Missing token in API response'); // Handle missing token
    }

    localStorage.setItem('token', token); // Store token in localStorage
    return token;
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message); // Log error
    throw error.response ? error.response.data : error.message; // Propagate the error for Redux handling
  }
};

/**
 * Logs out the user by removing the token from localStorage.
 */
export const logout = () => {
  localStorage.removeItem('token'); // Remove the token from localStorage
};

/**
 * Fetches the user's profile by sending a POST request to the profile endpoint.
 * Uses the token in the request header (via interceptor).
 * @returns {Promise<Object>} The user profile data.
 * @throws Will throw an error if the request fails.
 */
export const fetchUserProfile = async () => {
  try {
    const response = await api.post('/user/profile'); // Token is added automatically via interceptor
    return response.data; // Return the user profile data
  } catch (error) {
    console.error('Error fetching user profile:', error.response ? error.response.data : error.message); // Log error
    throw error; // Propagate error
  }
};

/**
 * Updates the user's profile by sending a PUT request to the profile endpoint.
 * @param {string} firstName - User's new first name.
 * @param {string} lastName - User's new last name.
 * @returns {Promise<Object>} The updated profile data.
 * @throws Will throw an error if the update fails.
 */
export const updateUserProfile = async (firstName, lastName) => {
  try {
    const response = await api.put('/user/profile', { firstName, lastName }); // Send update request
    return response.data; // Return updated profile data
  } catch (error) {
    console.error('Error updating user profile:', error.response ? error.response.data : error.message); // Log error
    throw error; // Propagate error
  }
};
