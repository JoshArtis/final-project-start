import React, { CSSProperties, useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { ItemTypes } from "./constants";
import { DragItem } from "./Interfaces/DragItem";
import { Food } from "./Interfaces/food";

type ContainerProps = {
    portions: Food[];
};
const styles: CSSProperties = {
    width: 300,
    height: 300,
    border: "1px solid black",
    position: "relative"
};

interface BoxMap {
    [key: string]: {
        top: number;
        left: number;
        foodItem: Food;
    };
}

const Container: React.FC<ContainerProps> = ({ portions }) => {
    const [boxes, setBoxes] = useState<BoxMap>({});
    portions.forEach((foodItem) => {
        if (boxes[foodItem.name] === undefined) {
            setBoxes(
                update(boxes, {
                    $merge: {
                        [foodItem.name]: { top: 0, left: 0, foodItem: foodItem }
                    }
                })
            );
        } else {
            setBoxes(
                update(boxes, {
                    [foodItem.name]: {
                        $merge: {
                            top: boxes[foodItem.name].top,
                            left: boxes[foodItem.name].left,
                            foodItem: foodItem
                        }
                    }
                })
            );
        }
    });

    const moveBox = useCallback(
        (id: string, left: number, top: number) => {
            setBoxes(
                update(boxes, {
                    [id]: {
                        $merge: { left, top }
                    }
                })
            );
        },
        [boxes]
    );
    const [, drop] = useDrop({
        accept: ItemTypes.PIC,
        drop(item: DragItem, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset() as {
                x: number;
                y: number;
            };

            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);

            moveBox(item.id, left, top);
            return undefined;
        }
    });
    return <div ref={drop} style={styles}></div>;
};

export default Container;
