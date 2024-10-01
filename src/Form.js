import React, { useState } from "react";

const Form = ({ handleSubmit, initialEmployee }) => {
    const [employee, setEmployee] = useState(initialEmployee);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(employee);
        setEmployee(initialEmployee);
    };

    return ( <
        form onSubmit = { onSubmit } >
        <
        div >
        <
        label htmlFor = "name" > Name < /label> <
        input type = "text"
        id = "name"
        name = "name"
        value = { employee.name }
        onChange = { handleChange }
        /> <
        /div> <
        div >
        <
        label htmlFor = "job" > Job < /label> <
        input type = "text"
        id = "job"
        name = "job"
        value = { employee.job }
        onChange = { handleChange }
        /> <
        /div> <
        button type = "submit" > Add < /button> <
        /form>
    );
};

export default Form;