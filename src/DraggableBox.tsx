import React, { CSSProperties, FC } from "react";
import { DragSourceMonitor } from "react-dnd";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";
import { Food } from "./Interfaces/food";

function styles(top: number, left: number, isDragging: boolean): CSSProperties {
    const transform = `translate3d(${left}px, ${top}px, 0)`;
    return {
        position: "absolute",
        transform,
        WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : ""
    };
}

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
        <div ref={drag} style={styles(top, left, isDragging)}>
            {children}
            <img src={foodItem.image_link} width="80" height="80" />
        </div>
    );
};

export default DraggableBox;
