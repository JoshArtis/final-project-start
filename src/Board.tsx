import React, { useState } from "react";
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
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BoxMap } from "./Interfaces/BoxMap";
import Trash from "./Trash";
import FridgePic from "./pictures/fridge.jpeg";

const renderPiece = (x: number, foodItem: Food) => {
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

    return (
        <div key={i} style={{ width: "50%", height: "50%" }}>
            <BoardSquare x={x} currentFoodList={currentFoodList}>
                {i < currentFoodList.length
                    ? renderPiece(x, currentFoodList[i])
                    : null}
            </BoardSquare>
        </div>
    );
};

const renderPlate = (
    i: number,
    picPosition: [number, number],
    currentFoodList: Food[],
    plateWidth: string,
    plateHeight: string,
    portions: BoxMap,
    setPortions: (newBoxes: BoxMap) => void
) => {
    const x = i;
    return (
        <div key={i} style={{ width: "50%", height: "50%" }}>
            <Plate
                x={x}
                plateWidth={plateWidth}
                plateHeight={plateHeight}
                currentFoodList={currentFoodList}
                portions={portions}
                setPortions={setPortions}
            />
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
    const [portions, setPortions] = useState<BoxMap>({});
    const [plateWidth, setPlateWidth] = useState<string>("400");
    const [plateHeight, setPlateHeight] = useState<string>("400");
    /**Determines the number of drag-and-drop squares to make */
    for (let i = 0; i < currentFoodList.length; i++) {
        squares.push(renderSquare(i, picPosition, currentFoodList));
    }
    plate.push(
        renderPlate(
            currentFoodList.length,
            picPosition,
            currentFoodList,
            plateWidth,
            plateHeight,
            portions,
            setPortions
        )
    );
    function updatePlateWidth(event: React.ChangeEvent<HTMLInputElement>) {
        setPlateWidth(event.target.value);
    }
    function updatePlateHeight(event: React.ChangeEvent<HTMLInputElement>) {
        setPlateHeight(event.target.value);
    }
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div
                                id="Food-list-buttons"
                                style={{
                                    marginRight: "20px",
                                    marginLeft: "20px",
                                    marginTop: "20px"
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        setCurrentFoodList(CARBOHYDRATE_LIST)
                                    }
                                >
                                    Carbohydrates
                                </Button>
                                <Button
                                    onClick={() =>
                                        setCurrentFoodList(FRUIT_LIST)
                                    }
                                >
                                    Fruits
                                </Button>
                                <Button
                                    onClick={() =>
                                        setCurrentFoodList(PROTEIN_LIST)
                                    }
                                >
                                    Proteins
                                </Button>
                                <Button
                                    onClick={() =>
                                        setCurrentFoodList(VEGETABLE_LIST)
                                    }
                                >
                                    Vegetables
                                </Button>
                            </div>
                            <div
                                id="Fridge"
                                style={{
                                    width: "300px",
                                    height: "400px",
                                    marginRight: "20px",
                                    marginLeft: "20px",
                                    marginTop: "20px",
                                    float: "left",
                                    backgroundImage: `url(${FridgePic})`,
                                    backgroundSize: "contain"
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
                        </Col>
                        <Col>
                            <div style={{ display: "inline-block" }}>
                                <Form.Group controlId="formPlateDimensions"></Form.Group>
                                <Form.Label
                                    style={{
                                        float: "left",
                                        marginLeft: "20px",
                                        marginTop: "20px"
                                    }}
                                >
                                    Plate width:{" "}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    value={plateWidth}
                                    onChange={updatePlateWidth}
                                    style={{
                                        width: 100,
                                        float: "left",
                                        marginLeft: "20px",
                                        marginTop: "20px"
                                    }}
                                />
                                <Form.Label
                                    style={{
                                        float: "left",
                                        marginLeft: "20px",
                                        marginTop: "20px"
                                    }}
                                >
                                    Plate height:{" "}
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    value={plateHeight}
                                    onChange={updatePlateHeight}
                                    style={{
                                        width: 100,
                                        float: "left",
                                        marginLeft: "20px",
                                        marginTop: "20px"
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    width: plateWidth + "px",
                                    height: plateHeight + "px",
                                    flexWrap: "wrap",
                                    marginRight: "20px",
                                    marginLeft: "20px",
                                    marginTop: "20px",
                                    float: "left"
                                }}
                            >
                                {plate}
                            </div>
                        </Col>
                        <Col>
                            <div
                                style={{
                                    width: "194",
                                    height: "259"
                                }}
                            >
                                <Trash
                                    portions={portions}
                                    setPortions={setPortions}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </DndProvider>
    );
};

export default Board;
