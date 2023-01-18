import React from "react";
import "./Admin.css"
import WordTable from "../componets/WordTable";
import GameStatsTable from "../componets/GameStatsTable";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddWord from "../componets/AddWord";

const Admin = () => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <h1>Admin panel</h1>
            <Link to={`/`} style={{textAlign:"center"}}><button>Wróć do gry</button></Link>
            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}><h2>Wyrazy</h2><WordTable/></div>
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}><h2>Lista wyników</h2><GameStatsTable/></div>
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}><h2>Dodaj wyraz</h2><AddWord/></div>


            </div>
        </div>
    );
};

export default Admin;