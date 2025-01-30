import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:8088/api/users');
  return response.data;
});

const userSlice = createSlice({
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
