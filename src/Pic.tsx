import React, { Fragment } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { ItemTypes } from "./constants";
import { Food } from "./Interfaces/food";

interface PicProps {
    foodItem: Food;
}
const Pic: React.FC<PicProps> = (props) => {
    const { foodItem } = props;
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.PIC, Food: foodItem },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging
        })
    });

    return (
        <Fragment>
            <DragPreviewImage connect={preview} src={foodItem.image_link} />
            <div
                ref={drag}
                style={{
                    opacity: isDragging ? 1 : 0.5,
                    fontSize: 50,
                    fontWeight: "bold",
                    cursor: "move",
                    textAlign: "center"
                }}
            >
                <img src={foodItem.image_link} width="80" height="80" />
            </div>
        </Fragment>
    );
};

export default Pic;
