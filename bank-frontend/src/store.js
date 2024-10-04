import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./slices/signInSlice"; 

const store = configureStore({
  reducer: {
    signIn: signInReducer, 
  },
});

export default store;
