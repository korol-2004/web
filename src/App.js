import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksList from './BookList';
import LoanRecords from './LoanRecords';
import Home from './Home';
import Users from './Users';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/loans" element={<LoanRecords />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;