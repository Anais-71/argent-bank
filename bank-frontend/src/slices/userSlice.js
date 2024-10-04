import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    token: '',
  },
  reducers: {
    setUser(state, action) {
      const { firstName, lastName, email, token } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.token = token;
    },
    clearUser(state) {
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.token = '';
    }
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
