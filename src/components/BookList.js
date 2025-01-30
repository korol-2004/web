import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, addBook, updateBook, deleteBook } from '../features/bookSlice';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [isEdit, setIsEdit] = useState(false);
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: '',
      author: '',
      isbn: ''
    }
  });

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (isEdit) {
      dispatch(updateBook(data));
    } else {
      dispatch(addBook(data));
    }
    reset();
    setIsEdit(false);
  };

  const handleEditBook = (book) => {
    setIsEdit(true);
    setValue('id', book.id);
    setValue('title', book.title);
    setValue('author', book.author);
    setValue('isbn', book.isbn);
  };

  const handleDeleteBook = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  return (
    <div>
      <h1>Список книг</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
        <h2>{isEdit ? 'Редактировать книгу' : 'Добавить книгу'}</h2>
        <div style={{ marginBottom: 20 }}>
          <label>Название:</label>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Название обязательно' }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input {...field} style={{ width: 300 }} />
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
              </div>
            )}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Автор:</label>
          <Controller
            name="author"
            control={control}
            rules={{ required: 'Автор обязателен' }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input {...field} style={{ width: 300 }} />
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
              </div>
            )}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>ISBN:</label>
          <Controller
            name="isbn"
            control={control}
            rules={{ required: 'ISBN обязателен' }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input {...field} style={{ width: 300 }} />
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
              </div>
            )}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          {isEdit ? 'Обновить' : 'Добавить'}
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Название</TableCell>
              <TableCell align="right">Автор</TableCell>
              <TableCell align="right">ISBN</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(book => (
              <TableRow key={book.id}>
                <TableCell component="th" scope="row">
                  {book.id}
                </TableCell>
                <TableCell align="right">{book.title}</TableCell>
                <TableCell align="right">{book.author}</TableCell>
                <TableCell align="right">{book.isbn}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEditBook(book)}>Изменить</Button>
                  <Button onClick={() => handleDeleteBook(book.id)}>Удалить</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookList;