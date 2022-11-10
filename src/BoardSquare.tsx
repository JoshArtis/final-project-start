import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import { canMovePic, movePic } from "./game";
import Overlay from "./Overlay";
import Square from "./Square";
import { Food } from "./Interfaces/food";

type BoardSquareProps = {
    x: number;
    y: number;
    foodItem: Food;
};

const BoardSquare: React.FC<BoardSquareProps> = (props) => {
    const { x, y, foodItem, children } = props;
    const black = false; /*(x + y) % 2 === 1;*/
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.PIC,
        canDrop: () => canMovePic(x, y),
        //drop: () => alert(foodName),
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
            {isOver && !canDrop && <Overlay color="red" />}
            {!isOver && canDrop && <Overlay color="yellow" />}
            {isOver && canDrop && <Overlay color="green" />}
        </div>
    );
};

export default BoardSquare;
