import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const EmployeeTable = ({ employees, delEmployee }) => ( <
    TableContainer component = { Paper }
    sx = {
        { mt: 3 } } >
    <
    Table >
    <
    TableHead >
    <
    TableRow >
    <
    TableCell > Name < /TableCell> <
    TableCell > Job < /TableCell> <
    TableCell > Remove < /TableCell> <
    /TableRow> <
    /TableHead> <
    TableBody > {
        employees.map((employee) => ( <
            TableRow key = { employee.id } >
            <
            TableCell > { employee.name } < /TableCell> <
            TableCell > { employee.job } < /TableCell> <
            TableCell >
            <
            Button variant = "contained"
            color = "secondary"
            onClick = {
                () => delEmployee(employee.id) } >
            Delete <
            /Button> <
            /TableCell> <
            /TableRow>
        ))
    } <
    /TableBody> <
    /Table> <
    /TableContainer>
);

export default EmployeeTable;