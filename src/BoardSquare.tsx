import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import Overlay from "./Overlay";
import Square from "./Square";
import { Food } from "./Interfaces/food";

type BoardSquareProps = {
    x: number;
    currentFoodList: Food[];
};

const BoardSquare: React.FC<BoardSquareProps> = (props) => {
    const { x, currentFoodList, children } = props;
    const black = false;
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.PIC,
        canDrop: () => x === currentFoodList.length,
        drop: (item, monitor) => ({
            item: currentFoodList[x],
            monitor: monitor
        }),
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
            <Square black={black}>{children}</Square>
            {/* {isOver && !canDrop && <Overlay color="red" />} */}
            {!isOver && canDrop && <Overlay color="yellow" />}
            {/* {isOver && canDrop && <Overlay color="green" />} */}
        </div>
    );
};

export default BoardSquare;
