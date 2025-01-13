import { AuthState } from '../../types/auth/auth';

export const initialState: AuthState = {
    isLoggedIn: false,
    userDetails: null,
    token: null,
  };