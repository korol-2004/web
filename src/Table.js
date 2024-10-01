import React from "react";

const Table = ({ employees, delEmployee }) => ( <
    table >
    <
    thead >
    <
    tr >
    <
    th > Name < /th> <
    th > Job < /th> <
    th > Remove < /th> <
    /tr> <
    /thead> <
    tbody > {
        employees.map((employee) => ( <
            tr key = { employee.id } >
            <
            td > { employee.name } < /td> <
            td > { employee.job } < /td> <
            td >
            <
            button onClick = {
                () => delEmployee(employee.id) } > Delete < /button> <
            /td> <
            /tr>
        ))
    } <
    /tbody> <
    /table>
);

export default Table;