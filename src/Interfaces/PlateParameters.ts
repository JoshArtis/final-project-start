import { BoxMap } from "./BoxMap";

export interface PlateParameters {
    [key: string]: {
        name: string;
        portions: BoxMap;
        plateWidth: string;
        plateHeight: string;
    };
}
