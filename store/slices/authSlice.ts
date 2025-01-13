import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../initialStates/authState';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.isLoggedIn = true;
      state.userDetails = { email: action.payload.email };
      state.token = action.payload.token;
    },
    signup: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.isLoggedIn = true;
      state.userDetails = { email: action.payload.email };
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userDetails = null;
      state.token = null;
    },
  },
});

export const { login, logout, signup} = authSlice.actions;
export default authSlice.reducer;
