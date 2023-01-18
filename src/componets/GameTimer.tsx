import {useEffect, useState} from "react";
import {gameID, isWinner, isLoser} from "../pages/App";

export let time = 0

const GameTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const [gameIDT, setGameID] = useState(0);

    useEffect(() => {
        if(gameIDT!==gameID) return () => {
            setSeconds(0);
            setGameID(gameID);
        }
    });

    useEffect(() => {

        const timerId = setInterval(() => {if(!isWinner && !isLoser){setSeconds(seconds + 1)};time=seconds+1}, 1000);
        return () => clearInterval(timerId);
    });

    const minutesToDisplay = seconds / 60 - seconds / 60 % 1;
    const secondsToDisplay = seconds - (minutesToDisplay * 60);
    return(
        <div style={{position: "absolute",
        right: "30px",
        top: "30px",
        fontSize: "2rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",}}>Czas gry:
            {minutesToDisplay > 0 && " " + minutesToDisplay + " minut, "}
            {" "}
            {secondsToDisplay}{" "}
            sekund</div>
    )
}
export default GameTimer