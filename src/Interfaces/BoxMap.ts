import { Food } from "../Interfaces/food";
export interface BoxMap {
    [key: string]: {
        top: number;
        left: number;
        foodItem: Food;
    };
}
