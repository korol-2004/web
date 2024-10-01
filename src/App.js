import React, { useState } from "react";
import Form from "./Form";
import Table from "./Table";
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
        div className = "App" >
        <
        header className = "App-header" >
        <
        h1 > Employee Management < /h1> <
        Form handleSubmit = { handleAddEmployee }
        initialEmployee = {
            { name: "", job: "" }
        }
        /> <
        Table employees = { employees }
        delEmployee = { handleDeleteEmployee }
        /> < /
        header > <
        /div>
    );
}

export default App;