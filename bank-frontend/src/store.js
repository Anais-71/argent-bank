import { configureStore } from '@reduxjs/toolkit'

//slices
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
})

export default store
