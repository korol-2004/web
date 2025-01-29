import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@material-ui/core';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({ id: 0, title: '', author: '', isbn: '' });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8088/api/books")
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddBook = () => {
    if (book.title.trim() === '' || book.author.trim() === '' || book.isbn.trim() === '') {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const newBook = {
      title: book.title,
      author: book.author,
      isbn: book.isbn
    };

    axios.post("http://localhost:8088/api/books", newBook)
      .then(response => {
        axios.get("http://localhost:8088/api/books")
          .then(response => {
            setBooks(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        setBook({ id: 0, title: '', author: '', isbn: '' });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEditBook = (book) => {
    setIsEdit(true);
    setBook(book);
  };

  const handleUpdateBook = () => {
    if (book.title.trim() === '' || book.author.trim() === '' || book.isbn.trim() === '') {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const updatedBook = {
      title: book.title,
      author: book.author,
      isbn: book.isbn
    };

    axios.put(`http://localhost:8088/api/books/${book.id}`, updatedBook)
      .then(response => {
        setIsEdit(false);
        setBook({ id: 0, title: '', author: '', isbn: '' });
        axios.get("http://localhost:8088/api/books")
          .then(response => {
            setBooks(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteBook = (book) => {
    axios.delete(`http://localhost:8088/api/books/${book.id}`)
      .then(response => {
        setBooks(books.filter(b => b.id !== book.id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Список книг</h1>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
  <h2>Добавить книгу</h2>
  <div style={{ marginBottom: 20 }}>
    <label>Название:</label>
    <input type="text" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} style={{ width: 300 }} />
  </div>
  <div style={{ marginBottom: 20 }}>
    <label>Автор:</label>
    <input type="text" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} style={{ width: 300 }} />
  </div>
  <div style={{ marginBottom: 20 }}>
    <label>ISBN:</label>
    <input type="text" value={book.isbn} onChange={(e) => setBook({ ...book, isbn: e.target.value })} style={{ width: 300 }} />
  </div>
  {isEdit ? (
    <Button onClick={handleUpdateBook} variant="contained" color="primary">Обновить</Button>
  ) : (
    <Button onClick={handleAddBook} variant="contained" color="primary">Добавить</Button>
  )}
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
                  <Button onClick={() => handleDeleteBook(book)}>Удалить</Button>
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