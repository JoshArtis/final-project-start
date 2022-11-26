import React, { CSSProperties, FC, ReactNode } from "react";
import { DragSourceMonitor } from "react-dnd";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";

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
    hideSourceOnDrag?: boolean;
    children?: ReactNode;
}

export const Box: FC<PlateProps> = ({
    id,
    left,
    top,
    hideSourceOnDrag,
    children
}) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.PIC,
            item: { id },
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: monitor.isDragging()
            })
        }),
        [id]
    );

    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag} />;
    }
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
