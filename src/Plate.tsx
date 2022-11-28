import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import Container from "./Container";
import { canMovePic } from "./game";
import { Food } from "./Interfaces/food";
import Overlay from "./Overlay";

type PlateProps = {
    x: number;
    y: number;
    currentFoodList: Food[];
};

const Plate: React.FC<PlateProps> = (props) => {
    const { x, y, currentFoodList, children } = props;
    const [portions, setPortions] = useState<Food[]>([]);

    const onDrop = (monitor: DropTargetMonitor) => {
        const newFoodItem: Food = monitor.getItem().Food;
        const duplicate = portions.find(
            (foodItem: Food): boolean => foodItem.name === newFoodItem.name
        );
        // Only adds the item to the list if it's not already in the list
        if (duplicate === undefined) {
            setPortions([...portions, newFoodItem]);
        } else {
            const newPortionsList = portions.map(
                (foodItem: Food): Food =>
                    foodItem.name === newFoodItem.name
                        ? { ...foodItem, servings: foodItem.servings + 1 }
                        : foodItem
            );
            setPortions(newPortionsList);
        }
    };

    const [{ isOver, canDrop }, drop] = useDrop({
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
            <Container portions={portions}>{children}</Container>
            <div>
                <Button onClick={() => setPortions([])}>Clear Plate</Button>
            </div>
        </div>
    );
};

export default Plate;
