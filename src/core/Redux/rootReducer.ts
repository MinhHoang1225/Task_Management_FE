import { combineReducers } from 'redux';

import authReducer from './feat/auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
