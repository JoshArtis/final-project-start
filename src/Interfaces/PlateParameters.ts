import { BoxMap } from "./BoxMap";
import { Food } from "./food";

export interface PlateParameters {
    [key: string]: {
        name: string;
        currentFoodList: Food[];
        portions: BoxMap;
        plateWidth: string;
        plateHeight: string;
    };
}
