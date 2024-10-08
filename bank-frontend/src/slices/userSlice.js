import { createSlice } from '@reduxjs/toolkit'

// Initial state for the user slice
const initialState = {
  firstName: '',
  lastName: '',
}

/**
 * Redux slice for managing user state.
 *
 * @type {Slice}
 */
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    /**
     * Sets the user's first and last name in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action dispatched to the reducer.
     * @param {Object} action.payload - The payload containing user information.
     * @param {string} action.payload.firstName - The user's first name.
     * @param {string} action.payload.lastName - The user's last name.
     */
    getUser: (state, action) => {
      state.firstName = action.payload.firstName // Update first name
      state.lastName = action.payload.lastName // Update last name
    },
    /**
     * Updates the user's first and last name in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action dispatched to the reducer.
     * @param {Object} action.payload - The payload containing updated user information.
     * @param {string} action.payload.firstName - The new first name of the user.
     * @param {string} action.payload.lastName - The new last name of the user.
     */
    updateUser: (state, action) => {
      state.firstName = action.payload.firstName // Update first name
      state.lastName = action.payload.lastName // Update last name
    },
  },
})

// Exporting the actions to be used in components
export const { getUser, updateUser } = userSlice.actions

// Exporting the reducer to be used in the store
export default userSlice.reducer
