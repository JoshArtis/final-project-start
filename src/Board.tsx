/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import Pic from "./Pic";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSquare from "./BoardSquare";
import { FOOD_LIST } from "./data/foodList";
import Plate from "./Plate";
import { Food } from "./Interfaces/food";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BoxMap } from "./Interfaces/BoxMap";
import Trash from "./Trash";
import FridgePic from "./pictures/fridge.jpeg";
import { PlateParameters } from "./Interfaces/PlateParameters";
import update from "immutability-helper";
import { FoodTypes } from "./Interfaces/FoodTypes";

const renderPiece = (foodItem: Food) => {
    return (
        <div>
            <Pic foodItem={foodItem} />
        </div>
    );
};

const renderSquare = (i: number, currentFoodList: Food[]) => {
    return (
        <div key={i} style={{ width: "120px", height: "120px" }}>
            <BoardSquare x={i} currentFoodList={currentFoodList}>
                {i < currentFoodList.length
                    ? renderPiece(currentFoodList[i])
                    : null}
            </BoardSquare>
        </div>
    );
};

const renderPlate = (
    i: number,
    currentFoodList: Food[],
    plateWidth: string,
    plateHeight: string,
    portions: BoxMap,
    setPortions: (newBoxes: BoxMap) => void,
    setName: (newName: string) => void,
    setCalories: (newCalorie: string) => void,
    setServingSize: (ss: string) => void,
    setServings: (servings: string) => void,
    setIngredients: (recipe: string) => void,
    setisEditAttr: (newAtt: boolean) => void,
    setCurrentFoodItem: (newfooditem: Food) => void
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
                setName={setName}
                setCalories={setCalories}
                setServingSize={setServingSize}
                setServings={setServings}
                setIngredients={setIngredients}
                setisEditAttr={setisEditAttr}
                setCurrentFoodItem={setCurrentFoodItem}
            />
        </div>
    );
};

const renderFoodListButtons = (
    updateFoodType: (foodType: FoodTypes) => void,
    currentFoodType: FoodTypes
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
                onClick={() => updateFoodType(FoodTypes.Carbohydrate)}
                style={{
                    backgroundColor:
                        currentFoodType === FoodTypes.Carbohydrate
                            ? "blue"
                            : undefined
                }}
            >
                Carbohydrates
            </Button>
            <Button
                onClick={() => updateFoodType(FoodTypes.Fruit)}
                style={{
                    backgroundColor:
                        currentFoodType === FoodTypes.Fruit ? "blue" : undefined
                }}
            >
                Fruits
            </Button>
            <Button
                onClick={() => updateFoodType(FoodTypes.Protein)}
                style={{
                    backgroundColor:
                        currentFoodType === FoodTypes.Protein
                            ? "blue"
                            : undefined
                }}
            >
                Proteins
            </Button>
            <Button
                onClick={() => updateFoodType(FoodTypes.Vegetable)}
                style={{
                    backgroundColor:
                        currentFoodType === FoodTypes.Vegetable
                            ? "blue"
                            : undefined
                }}
            >
                Vegetables
            </Button>
            <Button
                onClick={() => updateFoodType(FoodTypes.Any)}
                style={{
                    backgroundColor:
                        currentFoodType === FoodTypes.Any ? "blue" : undefined
                }}
            >
                Show All
            </Button>
        </div>
    );
};

const Board: React.FC = () => {
    const defaultPlateParameters = {
        name: "Plate1",
        portions: {},
        plateWidth: "500",
        plateHeight: "500"
    };
    const squares = [];
    const plate = [];

    const [currentFoodList, setCurrentFoodList] = useState<Food[]>(
        foodTypeList(FoodTypes.Protein)
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

    const [currentFoodItem, setCurrentFoodItem] = useState<Food>();

    const [newName, setName] = useState<string>();
    const [newCalories, setCalories] = useState<string>();
    const [newServingSize, setServingSize] = useState<string>();
    const [newServings, setServings] = useState<string>();
    const [newIngredients, setIngredients] = useState<string>();

    const [currentFoodType, setCurrentFoodType] = useState<FoodTypes>(
        FoodTypes.Protein
    );
    const [fridgeHeight, setFridgeHeight] = useState<number>(650);
    const [sortingName, setSortingName] = useState<string>("");

    const [isEditAttr, setisEditAttr] = useState<boolean>(false);

    /**Determines the number of drag-and-drop squares to make */
    for (let i = 0; i < currentFoodList.length; i++) {
        squares.push(renderSquare(i, currentFoodList));
    }
    plate.push(
        renderPlate(
            currentFoodList.length,
            currentFoodList,
            plateWidth,
            plateHeight,
            portions,
            setPortions,
            setName,
            setCalories,
            setServingSize,
            setServings,
            setIngredients,
            setisEditAttr,
            setCurrentFoodItem
        )
    );
    const foodListButtons = renderFoodListButtons(
        updateFoodType,
        currentFoodType
    );
    function updatePlateWidth(event: React.ChangeEvent<HTMLInputElement>) {
        setPlateWidth(event.target.value);
    }
    function updatePlateHeight(event: React.ChangeEvent<HTMLInputElement>) {
        setPlateHeight(event.target.value);
    }
    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
        if (currentFoodItem !== undefined) {
            const oldFoodBoxMap = portions[currentFoodItem.name];
            const updatedFoodItem = {
                ...oldFoodBoxMap.foodItem,
                name: event.target.value
            };
            const top = oldFoodBoxMap.top;
            const left = oldFoodBoxMap.left;
            setPortions(
                update(portions, {
                    [currentFoodItem.name]: {
                        $merge: {
                            top: top,
                            left: left,
                            foodItem: updatedFoodItem
                        }
                    }
                })
            );
        }
    }
    function updateCalories(event: React.ChangeEvent<HTMLInputElement>) {
        setCalories(String(Math.abs(parseFloat(event.target.value))));
        if (currentFoodItem !== undefined) {
            const oldFoodBoxMap = portions[currentFoodItem.name];
            const updatedFoodItem = {
                ...oldFoodBoxMap.foodItem,
                calories: Math.abs(parseFloat(event.target.value))
            };
            const top = oldFoodBoxMap.top;
            const left = oldFoodBoxMap.left;
            setPortions(
                update(portions, {
                    [currentFoodItem.name]: {
                        $merge: {
                            top: top,
                            left: left,
                            foodItem: updatedFoodItem
                        }
                    }
                })
            );
        }
    }
    function updateServingSize(event: React.ChangeEvent<HTMLInputElement>) {
        setServingSize(String(Math.abs(parseFloat(event.target.value))));
        if (currentFoodItem !== undefined) {
            const oldFoodBoxMap = portions[currentFoodItem.name];
            const updatedFoodItem = {
                ...oldFoodBoxMap.foodItem,
                serving_size: Math.abs(parseFloat(event.target.value))
            };
            const top = oldFoodBoxMap.top;
            const left = oldFoodBoxMap.left;
            setPortions(
                update(portions, {
                    [currentFoodItem.name]: {
                        $merge: {
                            top: top,
                            left: left,
                            foodItem: updatedFoodItem
                        }
                    }
                })
            );
        }
    }

    function updateServings(event: React.ChangeEvent<HTMLInputElement>) {
        setServings(String(Math.abs(parseFloat(event.target.value))));
        if (currentFoodItem !== undefined) {
            const oldFoodBoxMap = portions[currentFoodItem.name];
            const updatedFoodItem = {
                ...oldFoodBoxMap.foodItem,
                servings: Math.abs(parseFloat(event.target.value))
            };
            const top = oldFoodBoxMap.top;
            const left = oldFoodBoxMap.left;
            setPortions(
                update(portions, {
                    [currentFoodItem.name]: {
                        $merge: {
                            top: top,
                            left: left,
                            foodItem: updatedFoodItem
                        }
                    }
                })
            );
        }
    }

    function updateIngredients(event: React.ChangeEvent<HTMLInputElement>) {
        const ingredients = event.target.value.split(", ");
        ingredients.map((ingredient: string): string =>
            ingredient.replace(/\s/g, "")
        );
        setIngredients(event.target.value);
        if (currentFoodItem !== undefined) {
            const oldFoodBoxMap = portions[currentFoodItem.name];
            const updatedFoodItem = {
                ...oldFoodBoxMap.foodItem,
                ingredients: ingredients
            };
            const top = oldFoodBoxMap.top;
            const left = oldFoodBoxMap.left;
            setPortions(
                update(portions, {
                    [currentFoodItem.name]: {
                        $merge: {
                            top: top,
                            left: left,
                            foodItem: updatedFoodItem
                        }
                    }
                })
            );
        }
    }

    function foodTypeList(foodType: FoodTypes) {
        if (foodType === FoodTypes.Any) {
            return FOOD_LIST;
        } else {
            const foodList: Food[] = [];
            FOOD_LIST.map((foodItem: Food) =>
                foodItem.foodType === foodType ? foodList.push(foodItem) : null
            );
            return foodList;
        }
    }
    function updateSortingValue(event: React.ChangeEvent<HTMLInputElement>) {
        setSortingName(event.target.value);
        updateFoodList(currentFoodType, event.target.value);
    }

    function updateFoodType(foodType: FoodTypes) {
        setCurrentFoodType(foodType);
        updateFoodList(foodType, sortingName);
    }
    function updateFoodList(foodType: FoodTypes, sortingValue: string) {
        setSortingName(sortingValue);
        const foodList: Food[] = foodTypeList(foodType);
        if (sortingValue === "") {
            setCurrentFoodList(foodList);
            updateFridgeHeight(foodList);
        } else {
            const newCurrentFoodList: Food[] = [];
            foodList.map((foodItem: Food) => {
                if (sortingValue.length !== 1) {
                    foodItem.name
                        .substring(0, sortingValue.length)
                        .toUpperCase() === sortingValue.toUpperCase()
                        ? newCurrentFoodList.push(foodItem)
                        : null;
                } else {
                    foodItem.name.charAt(0).toUpperCase() ===
                    sortingValue.toUpperCase()
                        ? newCurrentFoodList.push(foodItem)
                        : null;
                }
            });
            setCurrentFoodList(newCurrentFoodList);
            updateFridgeHeight(newCurrentFoodList);
        }
    }
    function updateFridgeHeight(foodList: Food[]) {
        let newFridgeHeight: number;
        foodList.length % 2 === 0
            ? (newFridgeHeight = (120 * foodList.length) / 2)
            : (newFridgeHeight = (120 * (foodList.length + 1)) / 2);
        setFridgeHeight(newFridgeHeight);
    }

    //-----------------------
    // Saved Plate Logic
    //-----------------------

    const [savedPlates, setSavedPlates] = useState<PlateParameters>({
        Plate1: defaultPlateParameters
    });
    const [currentPlate, setCurrentPlate] = useState<{
        name: string;
        portions: BoxMap;
        plateWidth: string;
        plateHeight: string;
    }>(savedPlates["Plate1"]);

    function addNewPlate() {
        const keys = Object.keys(savedPlates);
        const newNumber = parseInt(keys[keys.length - 1].substring(5)) + 1;
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
        if (Object.keys(savedPlates).length !== 1) {
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
            updateCurrentPlate(keys[0]);
        }
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
                                marginTop: "20px",
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
                            <div>
                                <Form.Group controlId="formSortingName">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control
                                        value={sortingName}
                                        onChange={updateSortingValue}
                                    />
                                </Form.Group>
                            </div>
                            <div
                                id="Fridge"
                                style={{
                                    width: "300px",
                                    height: String(fridgeHeight) + "px",
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
                                onDrop={() => setisEditAttr(false)}
                            >
                                <Trash
                                    portions={portions}
                                    setPortions={setPortions}
                                />
                            </div>
                            {isEditAttr && (
                                <div className="position-absolute top-50 end-3 translate-middle-x">
                                    <Form.Group controlId="formeditAttributes"></Form.Group>
                                    <Form.Label
                                        style={{
                                            float: "left",
                                            marginLeft: "200px",
                                            marginTop: "5px",
                                            display: "flex"
                                        }}
                                    >
                                        Name:{" "}
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newName}
                                        onChange={updateName}
                                        style={{
                                            width: 100,
                                            float: "left",
                                            marginLeft: "10px",
                                            marginTop: "0px"
                                        }}
                                    />
                                    <Form.Label
                                        style={{
                                            float: "left",
                                            marginLeft: "200px",
                                            marginTop: "5px",
                                            display: "flex"
                                        }}
                                    >
                                        Calories:{" "}
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={newCalories}
                                        onChange={updateCalories}
                                        style={{
                                            width: 100,
                                            float: "left",
                                            marginLeft: "10px",
                                            marginTop: "0px"
                                        }}
                                    />
                                    <Form.Label
                                        style={{
                                            float: "left",
                                            marginLeft: "200px",
                                            marginTop: "5px",
                                            display: "flex"
                                        }}
                                    >
                                        Serving Size:{" "}
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={newServingSize}
                                        onChange={updateServingSize}
                                        style={{
                                            width: 100,
                                            float: "left",
                                            marginLeft: "10px",
                                            marginTop: "0px"
                                        }}
                                    />
                                    <Form.Label
                                        style={{
                                            float: "left",
                                            marginLeft: "200px",
                                            marginTop: "5px",
                                            display: "flex"
                                        }}
                                    >
                                        Servings:{" "}
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={newServings}
                                        onChange={updateServings}
                                        style={{
                                            width: 100,
                                            float: "left",
                                            marginLeft: "10px",
                                            marginTop: "0px"
                                        }}
                                    />
                                    <Form.Label
                                        style={{
                                            float: "left",
                                            marginLeft: "200px",
                                            marginTop: "5px",
                                            display: "flex"
                                        }}
                                    >
                                        Ingredients:{" "}
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newIngredients}
                                        onChange={updateIngredients}
                                        style={{
                                            width: 100,
                                            float: "left",
                                            marginLeft: "10px",
                                            marginTop: "0px"
                                        }}
                                    />
                                    <div
                                        style={{
                                            float: "left",
                                            marginLeft: "-40px",
                                            marginTop: "100px"
                                        }}
                                    ></div>
                                    <Button
                                        onClick={() => setisEditAttr(false)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </DndProvider>
    );
};

export default Board;
