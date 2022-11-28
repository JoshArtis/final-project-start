import React, { Fragment, useState } from "react";
import Pic from "./Pic";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSquare from "./BoardSquare";
import {
    CARBOHYDRATE_LIST,
    FRUIT_LIST,
    PROTEIN_LIST,
    VEGETABLE_LIST
} from "./data/foodList";
import Plate from "./Plate";
import { Food } from "./Interfaces/food";
import { Button } from "react-bootstrap";

const renderPiece = (x: number, y: number, foodItem: Food) => {
    return (
        <div>
            <Pic foodItem={foodItem} />
        </div>
    );
};

const renderSquare = (
    i: number,
    picPosition: [number, number],
    currentFoodList: Food[]
) => {
    const x = i;
    const y = 0;

    return (
        <div key={i} style={{ width: "50%", height: "50%" }}>
            <BoardSquare x={x} y={y} currentFoodList={currentFoodList}>
                {i < currentFoodList.length
                    ? renderPiece(x, y, currentFoodList[i])
                    : null}
            </BoardSquare>
        </div>
    );
};

const renderPlate = (
    i: number,
    picPosition: [number, number],
    currentFoodList: Food[]
) => {
    const x = i;
    const y = 0;

    return (
        <div key={i} style={{ width: "50%", height: "50%" }}>
            <Plate x={x} y={y} currentFoodList={currentFoodList} />
        </div>
    );
};

type BoardProps = {
    picPosition: [number, number];
};

const Board: React.FC<BoardProps> = (props) => {
    const { picPosition } = props;
    const squares = [];
    const plate = [];
    const [currentFoodList, setCurrentFoodList] =
        useState<Food[]>(PROTEIN_LIST);
    /**Determines the number of drag-and-drop squares to make */
    for (let i = 0; i < currentFoodList.length; i++) {
        squares.push(renderSquare(i, picPosition, currentFoodList));
    }
    plate.push(
        renderPlate(currentFoodList.length, picPosition, currentFoodList)
    );
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <div
                    style={{
                        marginRight: "20px",
                        marginLeft: "20px",
                        marginTop: "20px"
                    }}
                >
                    <Button
                        onClick={() => setCurrentFoodList(CARBOHYDRATE_LIST)}
                    >
                        Carbohydrates
                    </Button>
                    <Button onClick={() => setCurrentFoodList(FRUIT_LIST)}>
                        Fruits
                    </Button>
                    <Button onClick={() => setCurrentFoodList(PROTEIN_LIST)}>
                        Proteins
                    </Button>
                    <Button onClick={() => setCurrentFoodList(VEGETABLE_LIST)}>
                        Vegetables
                    </Button>
                </div>
                <div
                    style={{
                        width: "300px",
                        height: "400px",
                        border: "1px solid gray",
                        marginRight: "20px",
                        marginLeft: "20px",
                        marginTop: "20px",
                        float: "left"
                    }}
                >
                    <div
                        style={{
                            width: "250px",
                            height: "250px",
                            display: "flex",
                            flexWrap: "wrap"
                        }}
                    >
                        {squares}
                    </div>
                </div>
                <div style={{ position: "relative", top: "50px" }}></div>
                <div
                    style={{
                        width: "700px",
                        height: "600px",
                        flexWrap: "wrap",
                        marginRight: "20px",
                        marginLeft: "20px",
                        marginTop: "20px",
                        float: "left"
                    }}
                >
                    {plate}
                </div>
            </div>
        </DndProvider>
    );
};

export default Board;
