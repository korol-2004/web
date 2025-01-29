import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@material-ui/core';

const LoanRecords = () => {
  const [loanRecords, setLoanRecords] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedUser  , setSelectedUser  ] = useState(null);

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

  const handleIssueBook = () => {
    if (!selectedBook || !selectedUser  ) {
      alert('Пожалуйста, выберите книгу и пользователя');
      return;
    }

    const newLoanRecord = {
      book: selectedBook,
      user: selectedUser  ,
      issueDate: new Date().toISOString()
    };

    axios.post("http://localhost:8088/api/loans/issue", newLoanRecord)
      .then(response => {
       setLoanRecords(prevRecords => [...prevRecords, response.data]);
        setSelectedBook(null);
        setSelectedUser (null);
        fetchLoanRecords(); // Обновление таблицы
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
        fetchLoanRecords(); // Обновление таблицы
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchLoanRecords = () => {
    axios.get("http://localhost:8088/api/loans")
      .then(response => {
        setLoanRecords(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Список записей о выдаче/возврате книг</h1>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
  <h2>Выдать книгу</h2>
  <div style={{ marginBottom: 20 }}>
    <label>Книга:</label>
    <Select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} style={{ width: 300 }}>
      <MenuItem value={null}>Выберите книгу</MenuItem>
      {books.map(book => (
        <MenuItem key={book.id} value={book}>{book.title} ({book.author})</MenuItem>
      ))}
    </Select>
  </div>
  <div style={{ marginBottom: 20 }}>
    <label>Пользователь:</label>
    <Select value={selectedUser } onChange={(e) => setSelectedUser (e.target.value)} style={{ width: 300 }}>
      <MenuItem value={null}>Выберите пользователя</MenuItem>
      {users.map(user => (
        <MenuItem key={user.id} value={user}>{user.username}</MenuItem>
      ))}
    </Select>
  </div>
  <Button onClick={handleIssueBook} variant="contained" color="primary">Выдать книгу</Button>
</form>
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