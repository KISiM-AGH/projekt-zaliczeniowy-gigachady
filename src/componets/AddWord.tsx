import React, {useRef, useState} from "react";
import WordTable from "./WordTable";

const AddWord = () => {
    function Add(word:string) {
        fetch('http://localhost:5000/words/add', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "word_text": word,
            })
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log('Request succeeded with JSON response', data);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    const input = document.getElementById('message') as HTMLInputElement
    const addBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        //event.preventDefault();
        Add(input.value)
        window.location.reload();
        input.value = ""
    };
    return(
        <div>
            <input
                type="text"
                id="message"
                name="message"
            />
            <button onClick={addBtn} className="deleteButton" >Dodaj wyraz</button>
        </div>
    )
}

export default AddWord