/* eslint-disable no-extra-parens */
import React, { CSSProperties, useCallback } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { ItemTypes } from "./constants";
import { DragItem } from "./Interfaces/DragItem";
import { Food } from "./Interfaces/food";
import { BoxMap } from "./Interfaces/BoxMap";
import DraggableBox from "./DraggableBox";
import PlatePic from "./pictures/plate.jpeg";

type ContainerProps = {
    portions: BoxMap;
    setPortions: (newPortions: BoxMap) => void;
    plateWidth: string;
    plateHeight: string;
    setName: (newName: string) => void;
    setCalories: (newCalorie: string) => void;
    setServingSize: (ss: string) => void;
    setServings: (servings: string) => void;
    setIngredients: (recipe: string) => void;
    setisEditAttr: (newAtt: boolean) => void;
    setCurrentFoodItem: (newfooditem: Food) => void;
};
function styles(plateWidth: string, plateHeight: string): CSSProperties {
    return {
        width: plateWidth + "px",
        height: plateHeight + "px",
        position: "relative"
    };
}

const Container: React.FC<ContainerProps> = ({
    portions,
    setPortions,
    plateHeight,
    plateWidth,
    setName,
    setCalories,
    setIngredients,
    setServingSize,
    setServings,
    setisEditAttr,
    setCurrentFoodItem
}) => {
    const moveBox = useCallback(
        (id: string, left: number, top: number) => {
            const foodItem = portions[id].foodItem;
            setPortions(
                update(portions, {
                    [foodItem.name]: {
                        $merge: { top: top, left: left, foodItem: foodItem }
                    }
                })
            );
        },
        [portions]
    );
    const [, drop] = useDrop({
        accept: ItemTypes.BOX,
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
        <div ref={drop} style={styles(plateWidth, plateHeight)}>
            {Object.keys(portions).map((key) => (
                <DraggableBox
                    key={key}
                    id={key}
                    {...(portions[key] as {
                        top: number;
                        left: number;
                        foodItem: Food;
                    })}
                    plateWidth={plateWidth}
                    plateHeight={plateHeight}
                    setName={setName}
                    setCalories={setCalories}
                    setServingSize={setServingSize}
                    setServings={setServings}
                    setIngredients={setIngredients}
                    setisEditAttr={setisEditAttr}
                    setCurrentFoodItem={setCurrentFoodItem}
                />
            ))}
            <img
                src={PlatePic}
                width={plateWidth + "px"}
                height={plateHeight + "px"}
            />
        </div>
    );
};

export default Container;
