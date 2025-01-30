import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, Modal, Box, Typography } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const LoanRecords = () => {
  const [loanRecords, setLoanRecords] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  useEffect(() => {
    axios.get("http://localhost:8088/api/loans")
      .then(response => {
        setLoanRecords(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get("http://localhost:8088/api/books")
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get("http://localhost:8088/api/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const onSubmit = (data) => {
    const newLoanRecord = {
      book: data.book,
      user: data.user,
      issueDate: new Date().toISOString()
    };

    axios.post("http://localhost:8088/api/loans/issue", newLoanRecord)
      .then(response => {
        setLoanRecords(prevRecords => [...prevRecords, response.data]);
        handleClose();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleReturnBook = (loanRecord) => {
    const updatedLoanRecord = {
      id: loanRecord.id,
      returnDate: new Date().toISOString()
    };

    axios.post("http://localhost:8088/api/loans/return", updatedLoanRecord)
      .then(response => {
        setLoanRecords(prevRecords => prevRecords.map(lr => lr.id === loanRecord.id ? response.data : lr));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Список записей о выдаче/возврате книг</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Выдать книгу
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Выдать книгу
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <label>Книга:</label>
              <Controller
                name="book"
                control={control}
                rules={{ required: 'Выберите книгу' }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Select {...field} style={{ width: 300 }}>
                      <MenuItem value={null}>Выберите книгу</MenuItem>
                      {books.map(book => (
                        <MenuItem key={book.id} value={book}>{book.title} ({book.author})</MenuItem>
                      ))}
                    </Select>
                    {error && <p style={{ color: 'red' }}>{error.message}</p>}
                  </div>
                )}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>Пользователь:</label>
              <Controller
                name="user"
                control={control}
                rules={{ required: 'Выберите пользователя' }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <Select {...field} style={{ width: 300 }}>
                      <MenuItem value={null}>Выберите пользователя</MenuItem>
                      {users.map(user => (
                        <MenuItem key={user.id} value={user}>{user.username}</MenuItem>
                      ))}
                    </Select>
                    {error && <p style={{ color: 'red' }}>{error.message}</p>}
                  </div>
                )}
              />
            </div>
            <Button type="submit" variant="contained" color="primary">Выдать книгу</Button>
          </form>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Название книги</TableCell>
              <TableCell align="right">Автор книги</TableCell>
              <TableCell align="right">Дата выдачи</TableCell>
              <TableCell align="right">Дата возврата</TableCell>
              <TableCell align="right">Пользователь</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loanRecords.map(loanRecord => (
              <TableRow key={loanRecord.id}>
                <TableCell component="th" scope="row">
                  {loanRecord.id}
                </TableCell>
                <TableCell align="right">{loanRecord.book?.title}</TableCell>
                <TableCell align="right">{loanRecord.book?.author}</TableCell>
                <TableCell align="right">{loanRecord.issueDate}</TableCell>
                <TableCell align="right">{loanRecord.returnDate}</TableCell>
                <TableCell align="right">{loanRecord.user?.username}</TableCell>
                <TableCell align="right">
                  {loanRecord.returnDate === null ? (
                    <Button onClick={() => handleReturnBook(loanRecord)}>Вернуть книгу</Button>
                  ) : (
                    <span>Книга возвращена</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LoanRecords;