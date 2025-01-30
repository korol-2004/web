import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/bookSlice';
import userReducer from '../features/userSlice';
import loanReducer from '../features/loanSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    users: userReducer,
    loans: loanReducer,
  },
});

export default store;
