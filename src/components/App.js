import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Form from "./Form";
import EmployeeTable from "./EmployeeTable"; 
import Summary from "./Summary"; 
import { Container, Typography, Button } from "@mui/material";
import "./App.css";

function App() {
    const [employees, setEmployees] = useState([]);

    const handleAddEmployee = (newEmployee) => {
        setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
    };

    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    };

    return (
        <Router>
            <Container maxWidth="md" className="App">
                <Typography variant="h1" component="h1">
                    Employee Management
                </Typography>
                <nav>
                    <Button component={Link} to="/" variant="contained" sx={{ mr: 2 }}>
                        Add Employee
                    </Button>
                    <Button component={Link} to="/employees" variant="contained">
                        View Employees
                    </Button>
                </nav>
                <Routes>
                    <Route path="/" element={<Form handleSubmit={handleAddEmployee} initialEmployee={{ name: "", job: "" }} />} />
                    <Route path="/employees" element={<>
                        <EmployeeTable employees={employees} delEmployee={handleDeleteEmployee} />
                        <Summary employees={employees} />
                    </>} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;