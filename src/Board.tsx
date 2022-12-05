/* eslint-disable no-extra-parens */
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
import { PlateParameters } from "./Interfaces/PlateParameters";
import update from "immutability-helper";

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

const renderFoodListButtons = (
    setCurrentFoodList: (newFoodList: Food[]) => void,
    currentFoodList: Food[]
) => {
    return (
        <div
            id="Food-list-buttons"
            style={{
                marginRight: "20px",
                marginLeft: "20px",
                marginTop: "20px"
            }}
        >
            <Button
                onClick={() => setCurrentFoodList(CARBOHYDRATE_LIST)}
                style={{
                    backgroundColor:
                        currentFoodList === CARBOHYDRATE_LIST
                            ? "blue"
                            : undefined
                }}
            >
                Carbohydrates
            </Button>
            <Button
                onClick={() => setCurrentFoodList(FRUIT_LIST)}
                style={{
                    backgroundColor:
                        currentFoodList === FRUIT_LIST ? "blue" : undefined
                }}
            >
                Fruits
            </Button>
            <Button
                onClick={() => setCurrentFoodList(PROTEIN_LIST)}
                style={{
                    backgroundColor:
                        currentFoodList === PROTEIN_LIST ? "blue" : undefined
                }}
            >
                Proteins
            </Button>
            <Button
                onClick={() => setCurrentFoodList(VEGETABLE_LIST)}
                style={{
                    backgroundColor:
                        currentFoodList === VEGETABLE_LIST ? "blue" : undefined
                }}
            >
                Vegetables
            </Button>
        </div>
    );
};

type BoardProps = {
    picPosition: [number, number];
};

const Board: React.FC<BoardProps> = (props) => {
    const { picPosition } = props;
    const defaultPlateParameters = {
        name: "Plate1",
        currentFoodList: PROTEIN_LIST,
        portions: {},
        plateWidth: "500",
        plateHeight: "500"
    };
    const squares = [];
    const plate = [];
    const [currentFoodList, setCurrentFoodList] = useState<Food[]>(
        defaultPlateParameters.currentFoodList
    );
    const [portions, setPortions] = useState<BoxMap>(
        defaultPlateParameters.portions
    );
    const [plateWidth, setPlateWidth] = useState<string>(
        defaultPlateParameters.plateWidth
    );
    const [plateHeight, setPlateHeight] = useState<string>(
        defaultPlateParameters.plateHeight
    );
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
    const foodListButtons = renderFoodListButtons(
        setCurrentFoodList,
        currentFoodList
    );
    function updatePlateWidth(event: React.ChangeEvent<HTMLInputElement>) {
        setPlateWidth(event.target.value);
    }
    function updatePlateHeight(event: React.ChangeEvent<HTMLInputElement>) {
        setPlateHeight(event.target.value);
    }

    //-----------------------
    // Saved Plate Logic
    //-----------------------

    const [savedPlates, setSavedPlates] = useState<PlateParameters>({
        Plate1: defaultPlateParameters
    });
    const [currentPlate, setCurrentPlate] = useState<{
        name: string;
        currentFoodList: Food[];
        portions: BoxMap;
        plateWidth: string;
        plateHeight: string;
    }>(savedPlates["Plate1"]);

    function addNewPlate() {
        const keys = Object.keys(savedPlates);
        const newNumber = parseInt(keys[keys.length - 1].charAt(5)) + 1;
        const name = "Plate" + String(newNumber);
        setSavedPlates(
            update(savedPlates, {
                $merge: {
                    [name]: { ...defaultPlateParameters, name: name }
                }
            })
        );
    }

    function deletePlate(name: string) {
        const keys: string[] = [];
        let newSavedPlate: PlateParameters = {};
        Object.keys(savedPlates).map((key) =>
            key !== name ? keys.push(key) : null
        );
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] !== name) {
                newSavedPlate = update(newSavedPlate, {
                    $merge: {
                        [keys[i]]: savedPlates[keys[i]]
                    }
                });
            }
        }
        setSavedPlates(update(savedPlates, { $set: newSavedPlate }));
    }

    function updatePlate(params: {
        name: string;
        currentFoodList: Food[];
        portions: BoxMap;
        plateWidth: string;
        plateHeight: string;
    }) {
        setSavedPlates(
            update(savedPlates, {
                [params.name]: {
                    $merge: {
                        name: params.name,
                        currentFoodList: params.currentFoodList,
                        portions: params.portions,
                        plateWidth: params.plateWidth,
                        plateHeight: params.plateHeight
                    }
                }
            })
        );
    }

    function updateCurrentPlate(key: string) {
        setCurrentPlate(savedPlates[key]);
        setCurrentFoodList(savedPlates[key].currentFoodList);
        setPortions(savedPlates[key].portions);
        setPlateWidth(savedPlates[key].plateWidth);
        setPlateHeight(savedPlates[key].plateHeight);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <div>
                    {Object.keys(savedPlates).map((key) => (
                        <Button
                            key={key}
                            onClick={() => {
                                updateCurrentPlate(key);
                                updatePlate({
                                    name: currentPlate.name,
                                    currentFoodList: currentFoodList,
                                    portions: portions,
                                    plateWidth: plateWidth,
                                    plateHeight: plateHeight
                                });
                            }}
                            style={{
                                backgroundColor:
                                    key === currentPlate.name
                                        ? "blue"
                                        : undefined
                            }}
                        >
                            {key}
                        </Button>
                    ))}
                </div>
                <div>
                    <Button onClick={() => addNewPlate()}>New Plate</Button>
                    <Button onClick={() => deletePlate(currentPlate.name)}>
                        Delete Plate
                    </Button>
                </div>
                <Container>
                    <Row>
                        <Col>
                            {foodListButtons}
                            <div
                                id="Fridge"
                                style={{
                                    width: "300px",
                                    height: "650px",
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
