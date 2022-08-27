import RestaurantType from "./Restaurant.type";

type MealType = {
    id: number;
    main: string;
    name: string;
    drink: string;
    description: string;
    restaurantID: number
    restaurant: RestaurantType | null
};

export default MealType;
