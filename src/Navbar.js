import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" className="navbar-brand">
          Библиотека
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="/books" color="inherit">
          Книги
        </Button>
        <Button component={Link} to="/loans" color="inherit">
          Выдача/Возврат
        </Button>
        <Button component={Link} to="/users" color="inherit">
          Пользователи
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;