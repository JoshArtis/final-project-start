import React from "react";
import "./App.css";
import Board from "./Board";

function App(): JSX.Element {
    return (
        <div className="App">
            {/* <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header> */}
            <Board picPosition={[0, 0]}></Board>
        </div>
    );
}

export default App;
