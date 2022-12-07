/* eslint-disable no-extra-parens */
import React from "react";
import { Button } from "react-bootstrap";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import Container from "./Container";
//import { canMovePic } from "./game";
import { Food } from "./Interfaces/food";
import { BoxMap } from "./Interfaces/BoxMap";
import update from "immutability-helper";

type PlateProps = {
    x: number;
    currentFoodList: Food[];
    plateWidth: string;
    plateHeight: string;
    portions: BoxMap;
    setPortions: (newBoxes: BoxMap) => void;
    setisEditAttr: (newAtt: boolean) => void;
};

const Plate: React.FC<PlateProps> = (props) => {
    const {
        x,
        currentFoodList,
        children,
        plateWidth,
        plateHeight,
        portions,
        setPortions,
        setisEditAttr
    } = props;

    const onDrop = (monitor: DropTargetMonitor) => {
        const newFoodBoxMap: Food = monitor.getItem().Food;
        const oldFoodBoxMap = portions[newFoodBoxMap.name];

        // Only adds the item to the list if it's not already in the list
        if (oldFoodBoxMap === undefined) {
            //Adds new item to list
            setPortions(
                update(portions, {
                    $merge: {
                        [newFoodBoxMap.name]: {
                            top: 0,
                            left: 0,
                            foodItem: newFoodBoxMap
                        }
                    }
                })
            );
        } else {
            const updatedFoodItem = {
                ...oldFoodBoxMap.foodItem,
                servings: oldFoodBoxMap.foodItem.servings + 1
            };
            const top = oldFoodBoxMap.top;
            const left = oldFoodBoxMap.left;
            //Updates servings on an individual food item
            setPortions(
                update(portions, {
                    [newFoodBoxMap.name]: {
                        $merge: {
                            top: top,
                            left: left,
                            foodItem: updatedFoodItem
                        }
                    }
                })
            );
        }
    };

    const values = Object.values(portions);
    const calories = values.reduce(
        (
            currentTotal: number,
            value: { top: number; left: number; foodItem: Food }
        ) => currentTotal + value.foodItem.calories * value.foodItem.servings,
        0
    );
    const ingredients: string[] = [];
    values.map((value: { top: number; left: number; foodItem: Food }) =>
        value.foodItem.ingredients.map((ingredient: string) =>
            ingredients.push(ingredient)
        )
    );

    const [, drop] = useDrop({
        accept: ItemTypes.PIC,
        canDrop: () => x === currentFoodList.length,
        drop: (item, monitor) => onDrop(monitor),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    return (
        <div>
            <div
                ref={drop}
                style={{ position: "relative", width: "100%", height: "100%" }}
            >
                <Container
                    portions={portions}
                    setPortions={setPortions}
                    plateHeight={plateHeight}
                    plateWidth={plateWidth}
                    setisEditAttr={setisEditAttr}
                >
                    {children}
                </Container>
                <div>
                    <Button
                        onClick={() =>
                            setPortions(update(portions, { $set: {} }))
                        }
                    >
                        Clear Plate
                    </Button>
                    <p>Calories: {calories}</p>
                    Ingredients:
                    <ul>
                        {ingredients.map((name: string) => (
                            <li key={name}>{name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Plate;
