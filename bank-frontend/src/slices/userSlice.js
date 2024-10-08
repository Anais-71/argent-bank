import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: '',
  lastName: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
    // updateUser: (state, action) => {
    //   state.firstName = action.payload.firstName
    //    state.lastName = action.payload.lastName
    // }
  },
})

export const { getUser } = userSlice.actions
export default userSlice.reducer
