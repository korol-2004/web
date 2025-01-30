import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLoans = createAsyncThunk('loans/fetchLoans', async () => {
  const response = await axios.get('http://localhost:8088/api/loans');
  return response.data;
});

const loanSlice = createSlice({
  name: 'loans',
  initialState: [],
  reducers: {
    addLoan: (state, action) => {
      state.push(action.payload);
    },
    returnLoan: (state, action) => {
      const index = state.findIndex(loan => loan.id === action.payload.id);
      state[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoans.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addLoan, returnLoan } = loanSlice.actions;

export default loanSlice.reducer;
