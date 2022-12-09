import { FoodTypes } from "../Interfaces/FoodTypes";
export interface Food {
    name: string;
    calories: number;
    image_link: string;
    serving_size: number;
    ingredients: string[];
    servings: number;
    foodType: FoodTypes;
}
