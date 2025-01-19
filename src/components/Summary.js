import React from "react";
import { Typography, Box } from "@mui/material";

const Summary = ({ employees }) => {
    const totalEmployees = employees.reduce((acc, employee) => acc + 1, 0);

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" component="h6">
                Total Employees: {totalEmployees}
            </Typography>
        </Box>
    );
};

export default Summary;