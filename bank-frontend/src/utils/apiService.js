import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001/api/v1' // Base URL for the API

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Interceptor to automatically add the token to the request headers if it exists in localStorage.
 * @param {Object} config - Axios request configuration.
 * @returns {Object} Updated request configuration with Authorization header if token is present.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // Add token to headers
    }
    return config
  },
  (error) => {
    console.error('Error sending request:', error)
    return Promise.reject(error) // Handle request error
  },
)

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
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      email,
      password,
    }) // Send login request

    const token = response.data.body.token // Extract token from the response
    if (!token) {
      throw new Error('Missing token in API response') // Handle missing token
    }

    return token
  } catch (error) {
    console.error(
      'Error during login:',
      error.response ? error.response.data : error.message,
    ) // Log error
    throw error.response ? error.response.data : error.message // Propagate the error for Redux handling
  }
}

/**
 * Fetches the user's profile from the API.
 * @returns {Promise<Object>} The user's profile data.
 * @throws Will throw an error if the token is missing or the request fails.
 */
export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token')

  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'POST', // Assurez-vous que la méthode correspond à celle de votre API
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Ajoutez le token d'autorisation ici
    },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return await response.json() // Convertissez la réponse en JSON
}

/**
 * Updates the user's profile by sending a PUT request to the profile endpoint.
 * @param {string} firstName - User's new first name.
 * @param {string} lastName - User's new last name.
 * @returns {Promise<Object>} The updated profile data.
 * @throws Will throw an error if the update fails.
 */
export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem('token')

  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating user profile:', error)
  }
}
