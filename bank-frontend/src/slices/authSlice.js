import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login } from '../utils/apiService'

/**
 * Thunk to fetch user authentication token by logging in.
 * @function
 * @param {Object} credentials - User's login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The token if login is successful.
 * @throws Will throw an error message if the login fails.
 */
export const fetchUser = createAsyncThunk(
  'user/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await login(email, password) // Authenticate and retrieve token.
      return token
    } catch (error) {
      return rejectWithValue(error.message) // Return error message if login fails.
    }
  },
)

/**
 * Redux slice for managing sign-in state.
 * @type {Slice}
 */
export const authSlice = createSlice({
  name: 'signIn', // Name of the slice.
  initialState: {
    isAuthenticated: false, // Authentication status.
    error: false, // Error status.
    errorMessage: '', // Error message on failed login.
    token: '',
  },
  reducers: {
    loginSlice: (state, { payload }) => {
      const { token } = payload
      state.isAuthenticated = true // Mark the user as authenticated.
      state.error = false // Clear error state.
      localStorage.setItem('token', token)
    },

    /**
     * Logs out the user by removing the token from localStorage.
     */
    logoutSlice: (state) => {
      state.isAuthenticated = false // Mark the user as unauthenticated.
      localStorage.removeItem('token') // Remove the token from localStorage
    },
  },
})

export const { loginSlice, logoutSlice } = authSlice.actions // Export the actions.
export default authSlice.reducer // Export the reducer.
