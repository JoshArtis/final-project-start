/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import Container from "./Container";
import Trash from "./Trash";
import { canMovePic } from "./game";
import { Food } from "./Interfaces/food";
import { BoxMap } from "./Interfaces/BoxMap";
import update from "immutability-helper";

type PlateProps = {
    x: number;
    y: number;
    currentFoodList: Food[];
    plateWidth: string;
    plateHeight: string;
    portions: BoxMap;
    setPortions: (newBoxes: BoxMap) => void;
};

const Plate: React.FC<PlateProps> = (props) => {
    const {
        x,
        y,
        currentFoodList,
        children,
        plateWidth,
        plateHeight,
        portions,
        setPortions
    } = props;

    const onDrop = (monitor: DropTargetMonitor) => {
        const newFoodItem: Food = monitor.getItem().Food;

        const duplicate = portions[newFoodItem.name];
        // Only adds the item to the list if it's not already in the list
        if (duplicate === undefined) {
            //Adds new item to list
            setPortions(
                update(portions, {
                    $merge: {
                        [newFoodItem.name]: {
                            top: 0,
                            left: 0,
                            foodItem: newFoodItem
                        }
                    }
                })
            );
        } else {
            const updatedFoodItem = {
                ...newFoodItem,
                servings: newFoodItem.servings + 1
            };
            const top = portions[newFoodItem.name].top;
            const left = portions[newFoodItem.name].left;
            //Updates servings on an individual food item
            setPortions(
                update(portions, {
                    [newFoodItem.name]: {
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
    console.log(ingredients);

    const [, drop] = useDrop({
        accept: ItemTypes.PIC,
        canDrop: () => canMovePic(x, y, currentFoodList),
        drop: (item, monitor) => onDrop(monitor),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    return (
        <div
            ref={drop}
            style={{ position: "relative", width: "100%", height: "100%" }}
        >
            <Container
                portions={portions}
                setPortions={setPortions}
                plateHeight={plateHeight}
                plateWidth={plateWidth}
            >
                {children}
            </Container>
            <div>
                <Button
                    onClick={() => setPortions(update(portions, { $set: {} }))}
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
            <div>
                <Trash portions={portions} setPortions={setPortions} />
            </div>
        </div>
    );
};

export default Plate;
