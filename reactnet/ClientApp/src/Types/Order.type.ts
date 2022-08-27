import MealType from "./Meal.type.ts";
import ReservationType from "./Reservation.type";

type OrderType = {
    id: number;
    reservationID: number;
    description: string;
    mealID: number,
    reservation: ReservationType | null;
    meal: MealType | null
};

export default OrderType;
