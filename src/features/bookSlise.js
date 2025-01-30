import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('http://localhost:8088/api/books');
  return response.data;
});

const bookSlice = createSlice({
});

export const { addBook, updateBook, deleteBook } = bookSlice.actions;

export default bookSlice.reducer;
