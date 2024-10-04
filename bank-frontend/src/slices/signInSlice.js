import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../utils/apiService";

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
  "user/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await login(email, password); // Authenticate and retrieve token.
      return token;
    } catch (error) {
      return rejectWithValue(error.message); // Return error message if login fails.
    }
  }
);

/**
 * Redux slice for managing sign-in state.
 * @type {Slice}
 */
const signInSlice = createSlice({
  name: "signIn", // Name of the slice.
  initialState: {
    email: "", // User's email input.
    password: "", // User's password input.
    isAuthenticated: false, // Authentication status.
    error: false, // Error status.
    errorMessage: "" // Error message on failed login.
  },
  reducers: {
    /**
     * Sets the email in the state.
     * @param {Object} state - The current state.
     * @param {Object} action - The action dispatched.
     * @param {string} action.payload - The email to be set.
     */
    setEmail: (state, action) => {
      state.email = action.payload; // Update the email in the state.
    },
    
    /**
     * Sets the password in the state.
     * @param {Object} state - The current state.
     * @param {Object} action - The action dispatched.
     * @param {string} action.payload - The password to be set.
     */
    setPassword: (state, action) => {
      state.password = action.payload; // Update the password in the state.
    }
  },
  extraReducers: (builder) => {
    builder
      /**
       * Handles a successful login.
       * @param {Object} state - The current state.
       * @param {Object} action - The fulfilled action dispatched.
       * @param {string} action.payload - The token from a successful login.
       */
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Mark the user as authenticated.
        state.error = false; // Clear error state.
      })
      
      /**
       * Handles a failed login.
       * @param {Object} state - The current state.
       * @param {Object} action - The rejected action dispatched.
       * @param {string} action.payload - The error message from a failed login.
       */
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuthenticated = false; // Mark the user as not authenticated.
        state.error = true; // Set error flag.
        state.errorMessage = action.payload || "Login failed"; // Set the error message.
      });
  }
});

export const { setEmail, setPassword } = signInSlice.actions; // Export the actions.
export default signInSlice.reducer; // Export the reducer.
