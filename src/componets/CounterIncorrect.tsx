import {incorrectCount} from "../pages/App";

const CounterIncorrect = () =>{
    const counter = 6-incorrectCount;
    return(
        <div style={{position: "absolute",
            left: "30px",
            top: "30px",
            fontSize: "2rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "monospace",}}>Możliwe błędy: {counter}/6</div>
    )
}
export default CounterIncorrect;