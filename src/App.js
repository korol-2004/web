import React, { useState } from "react";
import Form from "./Form";
import Table from "./Table";
import { Container, Typography } from "@mui/material";
import "./App.css";

function App() {
    const [employees, setEmployees] = useState([]);

    const handleAddEmployee = (newEmployee) => {
        setEmployees([...employees, {...newEmployee, id: Date.now() }]);
    };

    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    };

    return ( <
        Container maxWidth = "md"
        className = "App" >
        <
        header className = "App-header" >
        <
        Typography variant = "h1"
        component = "h1" >
        Employee Management <
        /Typography> <
        Form handleSubmit = { handleAddEmployee }
        initialEmployee = {
            { name: "", job: "" } }
        /> <
        Table employees = { employees }
        delEmployee = { handleDeleteEmployee }
        /> <
        /header> <
        /Container>
    );
}

export default App;