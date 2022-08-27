import { ReservationStatus } from "../Constants/ReservationStatus";
import RestaurantType from "./Restaurant.type";

type ReservationType = {
  id: number;
  startDateTime: Date;
  RestaurantID:number;
  description:string;
  restaurant: RestaurantType | null ;
  reservationsStatusEnum : ReservationStatus
};

export default ReservationType;
