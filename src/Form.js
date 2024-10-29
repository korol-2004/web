import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

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
        Box component = "form"
        onSubmit = { onSubmit }
        sx = {
            {
                mt: 3,
                p: 2,
                borderRadius: 1,
                boxShadow: 2,
                backgroundColor: '#f5f5f5',
            }
        } >
        <
        TextField label = "Name"
        id = "name"
        name = "name"
        value = { employee.name }
        onChange = { handleChange }
        fullWidth margin = "normal"
        variant = "outlined"
        sx = {
            {
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                    },
                },
            }
        }
        /> <
        TextField label = "Job"
        id = "job"
        name = "job"
        value = { employee.job }
        onChange = { handleChange }
        fullWidth margin = "normal"
        variant = "outlined"
        sx = {
            {
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                    },
                },
            }
        }
        /> <
        Button variant = "contained"
        color = "primary"
        type = "submit"
        sx = {
            { mt: 2, backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } } } >
        Add <
        /Button> <
        /Box>
    );
};

export default Form;