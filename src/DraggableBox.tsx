import React, { CSSProperties, FC, ReactNode } from "react";
import { DragSourceMonitor } from "react-dnd";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";
import { Food } from "./Interfaces/food";

const style: CSSProperties = {
    position: "absolute",
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    cursor: "move"
};

export interface PlateProps {
    id: string;
    left: number;
    top: number;
    foodItem: Food;
}

export const DraggableBox: FC<PlateProps> = ({
    id,
    left,
    top,
    foodItem,
    children
}) => {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.PIC,
            id: id,
            left: left,
            top: top,
            foodItem: foodItem
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <div
            className="box"
            ref={drag}
            style={{ ...style, left, top }}
            data-testid="box"
        >
            {children}
        </div>
    );
};

export default DraggableBox;
