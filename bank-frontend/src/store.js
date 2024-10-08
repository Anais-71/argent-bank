import { configureStore } from '@reduxjs/toolkit'

// slices
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'

/**
 * Creates and configures the Redux store.
 *
 * This store combines multiple slices: `authSlice` and `userSlice`.
 * Each slice manages a portion of the application's state.
 *
 * @property {Reducer} auth - Handles authentication-related state.
 * @property {Reducer} user - Manages user-specific information and actions.
 *
 * @returns {Store} The Redux store configured with the given reducers.
 */
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
})

export default store
