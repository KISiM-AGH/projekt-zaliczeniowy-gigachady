import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from "@mui/material";
import Paper from '@mui/material/Paper';
import React from 'react';
import { useState, useEffect } from "react";
import deleteWord from "./DeleteWord";

const WordTable = () => {
    const [word, setWords] = useState<any[]>([]);
    const fetchWords = async() => {
        const result = await fetch("http://localhost:5000/words", {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        });
        const words = await result.json();
        setWords(words);
    };
    useEffect(() => {fetchWords()}, []);

    const deleteWordBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const button: HTMLButtonElement = event.currentTarget;
        deleteWord(button.name);
        fetchWords();
    };

    return (
        <TableContainer sx={{ width: 300 }}>
            <Table component={Paper} sx={{ backgroundColor: "#FCFBFA" }}>
                <TableHead>
                    <TableCell sx={{textAlign: "center"}}>Wyrazy</TableCell>
                    <TableCell sx={{textAlign: "center"}}> </TableCell>
                </TableHead>
                <TableBody>
                    {word.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0}}}

                        >
                            <TableCell component="th" scope="row" sx={{textAlign: "center"}}>{row.word_text}</TableCell>
                            <TableCell component="th" scope="row" sx={{textAlign: "center"}}><button onClick={deleteWordBtn} className="deleteButton" name={row.word_text}>Usuń</button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default WordTable