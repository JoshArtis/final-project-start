/* eslint-disable no-extra-parens */
import React from "react";
import "./App.css";
import Board from "./Board";
import MealPrepPic from "./pictures/MealPrepper.png";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <img src={MealPrepPic} width="250px" height="143px" />
            </header>
            <Board />
        </div>
    );
}

export default App;
