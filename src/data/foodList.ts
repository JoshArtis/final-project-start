import { Food } from "../Interfaces/food";
import apple from "../pictures/apple.jpeg";
import broccoli from "../pictures/broccoli.jpeg";
import banana from "../pictures/banana.jpeg";
import hot_dog from "../pictures/hot_dog.jpeg";
import meatballs from "../pictures/meatballs.jpeg";
import spaghetti from "../pictures/spaghetti.jpeg";
import grape from "../pictures/grape.jpg";
import orange from "../pictures/orange.jpg";
import strawberry from "../pictures/strawberry.jpg";
import egg from "../pictures/egg.jpg";
import salmon from "../pictures/salmon.jpg";
import chicken from "../pictures/chicken.jpg";
import carrot from "../pictures/carrot.jpeg";
import pepper from "../pictures/pepper.jpeg";
import cucumber from "../pictures/cucumber.jpeg";
import potato from "../pictures/potato.jpeg";
import bread from "../pictures/bread.jpeg";
import beans from "../pictures/beans.jpeg";
import cookies from "../pictures/cookies.jpeg";
import rice from "../pictures/rice.jpeg";
import bacon from "../pictures/bacon.jpg";
import cantaloupe from "../pictures/cantaloupe.jpg";
import greenbeans from "../pictures/greenbeans.jpg";
import hamburger from "../pictures/hamburger.jpg";
import kiwi from "../pictures/kiwi.jpg";
import pear from "../pictures/pear.jpeg";
import peas from "../pictures/peas.jpg";
import porkchop from "../pictures/porkchop.jpg";
import shrimp from "../pictures/shrimp.jpeg";
import turkey from "../pictures/turkey.jpeg";

export const FRUIT_LIST: Food[] = [
    {
        name: "Apple",
        calories: 95,
        image_link: apple,
        serving_size: 8,
        ingredients: ["Apple"],
        servings: 1
    },
    {
        name: "Banana",
        calories: 105,
        image_link: banana,
        serving_size: 4,
        ingredients: ["Banana"],
        servings: 1
    },
    {
        name: "Grape",
        calories: 62,
        image_link: grape,
        serving_size: 4,
        ingredients: ["Grape"],
        servings: 1
    },
    {
        name: "Orange",
        calories: 60,
        image_link: orange,
        serving_size: 4.7,
        ingredients: ["Orange"],
        servings: 1
    },
    {
        name: "Strawberry",
        calories: 53,
        image_link: strawberry,
        serving_size: 3.5,
        ingredients: ["Strawberry"],
        servings: 1
    },
    {
        name: "Cantaloupe",
        calories: 54,
        image_link: cantaloupe,
        serving_size: 5.6,
        ingredients: ["Cantaloupe"],
        servings: 1
    },
    {
        name: "Kiwi",
        calories: 90,
        image_link: kiwi,
        serving_size: 4.9,
        ingredients: ["Kiwi"],
        servings: 1
    },
    {
        name: "Pear",
        calories: 97,
        image_link: pear,
        serving_size: 5.8,
        ingredients: ["Pear"],
        servings: 1
    }
];

export const PROTEIN_LIST: Food[] = [
    {
        name: "Meatballs",
        calories: 284,
        image_link: meatballs,
        serving_size: 3,
        ingredients: ["Meatballs"],
        servings: 1
    },
    {
        name: "Hot Dog",
        calories: 151,
        image_link: hot_dog,
        serving_size: 1.6,
        ingredients: ["Bun, Sausage"],
        servings: 1
    },
    {
        name: "Chicken",
        calories: 271,
        image_link: chicken,
        serving_size: 4,
        ingredients: ["Chicken"],
        servings: 1
    },
    {
        name: "Salmon",
        calories: 175,
        image_link: salmon,
        serving_size: 3,
        ingredients: ["Salmon"],
        servings: 1
    },
    {
        name: "Egg",
        calories: 78,
        image_link: egg,
        serving_size: 1.6,
        ingredients: ["Egg"],
        servings: 1
    },
    {
        name: "Bacon",
        calories: 43,
        image_link: bacon,
        serving_size: 0.5,
        ingredients: ["Bacon"],
        servings: 1
    },
    {
        name: "Turkey Slices",
        calories: 79,
        image_link: turkey,
        serving_size: 1.9,
        ingredients: ["Turkey"],
        servings: 1
    },
    {
        name: "Shrimp",
        calories: 84,
        image_link: shrimp,
        serving_size: 2.9,
        ingredients: ["Shrimp"],
        servings: 1
    },
    {
        name: "Cheeseburger",
        calories: 266,
        image_link: hamburger,
        serving_size: 3.7,
        ingredients: ["Beef Patty, Hamburger Bun, Lettuce, American Cheese"],
        servings: 1
    },
    {
        name: "Pork Chop",
        calories: 106,
        image_link: porkchop,
        serving_size: 2.9,
        ingredients: ["Pork"],
        servings: 1
    }
];

export const VEGETABLE_LIST: Food[] = [
    {
        name: "Green Beans",
        calories: 34,
        image_link: greenbeans,
        serving_size: 8,
        ingredients: ["Grean Beans"],
        servings: 1
    },
    {
        name: "Broccoli",
        calories: 50,
        image_link: broccoli,
        serving_size: 3,
        ingredients: ["Broccoli"],
        servings: 1
    },
    {
        name: "Peas",
        calories: 62,
        image_link: peas,
        serving_size: 6,
        ingredients: ["Peas"],
        servings: 1
    },
    {
        name: "Carrot",
        calories: 25,
        image_link: carrot,
        serving_size: 2.8,
        ingredients: ["Carrot"],
        servings: 1
    },
    {
        name: "Pepper",
        calories: 30,
        image_link: pepper,
        serving_size: 5.3,
        ingredients: ["Pepper"],
        servings: 1
    },
    {
        name: "Cucumber",
        calories: 30,
        image_link: cucumber,
        serving_size: 3.5,
        ingredients: ["Cucumber"],
        servings: 1
    },
    {
        name: "Potato",
        calories: 163,
        image_link: potato,
        serving_size: 5.3,
        ingredients: ["Potato"],
        servings: 1
    }
];

export const CARBOHYDRATE_LIST: Food[] = [
    {
        name: "Spaghetti",
        calories: 221,
        image_link: spaghetti,
        serving_size: 2,
        ingredients: ["Spaghetti"],
        servings: 1
    },
    {
        name: "Bread",
        calories: 79,
        image_link: bread,
        serving_size: 1,
        ingredients: ["Bread"],
        servings: 1
    },
    {
        name: "Beans",
        calories: 42,
        image_link: beans,
        serving_size: 3,
        ingredients: ["Beans"],
        servings: 1
    },
    {
        name: "Cookies",
        calories: 142,
        image_link: cookies,
        serving_size: 1,
        ingredients: ["Cookies"],
        servings: 1
    },
    {
        name: "Rice",
        calories: 206,
        image_link: rice,
        serving_size: 1,
        ingredients: ["Rice"],
        servings: 1
    }
];
