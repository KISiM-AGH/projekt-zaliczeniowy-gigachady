import {useEffect, useState} from "react";
import {gameID, isWinner, isLoser} from "../pages/App";


const GameTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const [gameIDT, setGameID] = useState(0);
    //if(gameIDT!=gameID) setSeconds(0)

    useEffect(() => {
        if(gameIDT!=gameID) return () => {
            setSeconds(0);
            setGameID(gameID);
        }
    });

    useEffect(() => {

        const timerId = setInterval(() => {if(!isWinner && !isLoser)setSeconds(seconds + 1)}, 1000);
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
            {minutesToDisplay}{" "}
            minut,{" "}
            {secondsToDisplay}{" "}
            sekund</div>
    )
}
export default GameTimer