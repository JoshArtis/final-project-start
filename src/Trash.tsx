import React, { CSSProperties } from "react";
import { BoxMap } from "./Interfaces/BoxMap";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import { DragItem } from "./Interfaces/DragItem";
import update from "immutability-helper";

interface TrashProps {
    portions: BoxMap;
    setPortions: (newBoxes: BoxMap) => void;
}
const styles: CSSProperties = {
    width: 300,
    height: 300,
    border: "1px solid black",
    position: "relative"
};

const Trash: React.FC<TrashProps> = ({ portions, setPortions }) => {
    const onDrop = (monitor: DropTargetMonitor, foodItem: DragItem) => {
        const keys: string[] = [];
        let newPortions: BoxMap = {};
        Object.keys(portions).map((key) =>
            key !== foodItem.id ? keys.push(key) : null
        );
        for (let i = 0; i < keys.length; i++) {
            newPortions = update(newPortions, {
                $merge: {
                    [keys[i]]: portions[keys[i]]
                }
            });
        }
        setPortions(update(portions, { $set: newPortions }));
        return undefined;
    };
    const [, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: (foodItem: DragItem, monitor) => onDrop(monitor, foodItem)
    });
    return <div ref={drop} style={styles}></div>;
};

export default Trash;
