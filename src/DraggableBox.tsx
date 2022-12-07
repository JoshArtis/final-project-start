// import { render } from "@testing-library/react";
import React, { CSSProperties, FC } from "react";
// import { Button } from "react-bootstrap";
import { DragSourceMonitor } from "react-dnd";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";
import { Food } from "./Interfaces/food";
import Dropdown from "react-bootstrap/Dropdown";
import "./App.css";
import handleSelect from "./Board";
import { Button } from "react-bootstrap";

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
    plateWidth: string;
    plateHeight: string;
    setisEditAttr: (newAtt: boolean) => void;
}

export const DraggableBox: FC<PlateProps> = ({
    id,
    left,
    top,
    foodItem,
    plateWidth,
    plateHeight,
    setisEditAttr
}) => {
    const picWidth: number = 80 * (1 + (parseInt(plateWidth) - 400) / 400);
    const picHeight: number = 80 * (1 + (parseInt(plateHeight) - 400) / 400);

    // const handleSelect = (setisEditAttr: (newisEditAttr: boolean) => void) => {
    //     console.log("is working");
    //     setisEditAttr(true);
    // };

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.BOX,
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
        <div ref={drag} style={styles(top, left, isDragging)} role="PIC">
            <div
                style={{
                    fontSize: 50,
                    fontWeight: "bold",
                    cursor: "move",
                    textAlign: "center"
                }}
                role="PIC"
            >
                <div>
                    <Button onClick={() => setisEditAttr(true)}>
                        <img
                            src={foodItem.image_link}
                            width={picWidth}
                            height={picHeight}
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DraggableBox;
