import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from "@mui/material";
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from "react";
import deleteRecord from "./DeleteRecord";

const GameStatsTable = () => {
    const [record, setRecords] = useState<any[]>([]);
    const fetchRecord = async() => {
        const result = await fetch("http://localhost:5000/records", {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        });
        const words = await result.json();
        setRecords(words);
    };
    useEffect(() => {fetchRecord()}, []);
    const deleteRecordBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const button: HTMLButtonElement = event.currentTarget;
        deleteRecord(button.name);
        fetchRecord();
    };

    return (
        <TableContainer sx={{ width: 500 }}>
            <Table component={Paper} sx={{ backgroundColor: "#FCFBFA" }}>
                <TableHead>
                    <TableCell sx={{textAlign: "center"}}>Wyraz</TableCell>
                    <TableCell sx={{textAlign: "center"}}>Czas</TableCell>
                    <TableCell sx={{textAlign: "center"}}>Ilość błędów</TableCell>
                    <TableCell sx={{textAlign: "center"}}> </TableCell>
                </TableHead>
                <TableBody>
                    {record.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0}}}

                        >
                            <TableCell component="th" scope="row" sx={{textAlign: "center"}}>{row.word_text}</TableCell>
                            <TableCell component="th" scope="row" sx={{textAlign: "center"}}>{(row.time / 60 - row.time / 60 % 1) > 0 && (row.time / 60 - row.time / 60 % 1)+ " minut, "}{row.time - ((row.time / 60 - row.time / 60 % 1) * 60)+ " sekund"}</TableCell>
                            <TableCell component="th" scope="row" sx={{textAlign: "center"}}>{row.incorrect_letters_1}</TableCell>
                            <TableCell component="th" scope="row" sx={{textAlign: "center"}}><button onClick={deleteRecordBtn} className="deleteButton" name={row._id}>Usuń</button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default GameStatsTable