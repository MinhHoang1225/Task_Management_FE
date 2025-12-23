import { createSlice } from '@reduxjs/toolkit';

import { getStorageData } from '@app/core/config/storage';
import { ACCESS_TOKEN, USER_PROFILE } from '@app/core/types/constants';
import type { User } from '@app/core/types/interfaces';

interface AuthState {
  isAuth: boolean;
  user: User | null;
  permissions: string[];
}

const checkAuth = (): boolean => Boolean(getStorageData(ACCESS_TOKEN));
const getUserProfile = (): User | null => {
  const data = getStorageData(USER_PROFILE);
  if (!data || typeof data !== 'object') return null;
  return data as User;
};

const initialState: AuthState = {
  isAuth: checkAuth(),
  user: getUserProfile(),
  permissions: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    setAuth(state, action) {
      const data = action.payload;
      state.user = data.user;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      localStorage.clear();
    },
  },
});

const { reducer, actions } = authSlice;

export const { setAuth, logout, login } = actions;

export default reducer;
