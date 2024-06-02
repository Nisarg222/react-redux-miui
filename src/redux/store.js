import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userReducer';

const store = configureStore({
  reducer: {
    users: userReducer
  }
});

export default store