import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLoans = createAsyncThunk('loans/fetchLoans', async () => {
  const response = await axios.get('http://localhost:8088/api/loans');
  return response.data;
});

const loanSlice = createSlice({
});

export const { addLoan, returnLoan } = loanSlice.actions;

export default loanSlice.reducer;
