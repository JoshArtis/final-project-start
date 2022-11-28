/* eslint-disable no-extra-parens */
import React, { CSSProperties, useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { ItemTypes } from "./constants";
import { DragItem } from "./Interfaces/DragItem";
import { Food } from "./Interfaces/food";
import DraggableBox from "./DraggableBox";
import { PROTEIN_LIST } from "./data/foodList";

type ContainerProps = {
    portions: Food[];
};
const styles: CSSProperties = {
    width: 700,
    height: 600,
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
    if (portions.length === 0 && Object.keys(boxes).length !== 0) {
        setBoxes(update(boxes, { $set: {} }));
    }
    portions.forEach((foodItem) => {
        if (boxes[foodItem.name] === undefined) {
            setBoxes(
                update(boxes, {
                    $merge: {
                        [foodItem.name]: { top: 0, left: 0, foodItem: foodItem }
                    }
                })
            );
        }
        //     // else {
        //     //     //const MovedItems = portions.filter((foodItem: Food): boolean => )
        //     //     setBoxes(
        //     //         update(boxes, {
        //     //             [foodItem.name]: {
        //     //                 $merge: {
        //     //                     top: boxes[foodItem.name].top,
        //     //                     left: boxes[foodItem.name].left,
        //     //                     foodItem: foodItem
        //     //                 }
        //     //             }
        //     //         })
        //     //     );
        //     // }
    });
    const moveBox = useCallback(
        (id: string, left: number, top: number) => {
            const foodItem = boxes[id].foodItem;
            setBoxes(
                update(boxes, {
                    [foodItem.name]: {
                        $merge: { top: top, left: left, foodItem: foodItem }
                    }
                })
            );
        },
        [boxes]
    );
    const [, drop] = useDrop({
        accept: ItemTypes.BOX,
        // canDrop(item: DragItem, monitor) {
        //     const delta = monitor.getDifferenceFromInitialOffset() as {
        //         x: number;
        //         y: number;
        //     };

        //     const left = Math.round(item.left + delta.x);
        //     const top = Math.round(item.top + delta.y);
        //     if (left !== 0 && top !== 0) {
        //         console.log("It's true");
        //         return true;
        //     } else {
        //         console.log("It's false");
        //         return false;
        //     }
        // },
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
    return (
        <div ref={drop} style={styles}>
            {Object.keys(boxes).map((key) => (
                <DraggableBox
                    key={key}
                    id={key}
                    {...(boxes[key] as {
                        top: number;
                        left: number;
                        foodItem: Food;
                    })}
                />
            ))}
        </div>
    );
};

export default Container;
