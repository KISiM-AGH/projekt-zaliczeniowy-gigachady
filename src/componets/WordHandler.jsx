import { useState, useEffect } from "react";

function WordHandler(){
    const [word, setWords] = useState([]);
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

    //var result = word.map(function() {
    //    return this.word_text;
    //}).get()
    //let result = Array.from( myMap.keys() );word.map(function() {
     //   return this.word_text;

    //var result = word.map((row) => (row.word_text));
    var arr;
    word.map((row) => ( arr.push(row.word_text)))
    var arrjson = JSON.stringify(arr)

    /*return (
        <ul>
            {word.map((row) => (
                <li
                    key={row.word_text}
                >
                    {row.word_text}{", "}
                </li>
            ))}
        </ul>

    )*/
    /*return (
        <ul>
            {arr.map((row) => (
                <li>
                    {row}{", "}
                </li>
            ))}
        </ul>

    )*/
    //return(arr)
    return(arrjson)
    //return (result)
}

export default WordHandler