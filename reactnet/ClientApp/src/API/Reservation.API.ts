import axios from "axios";
import ReservationType from "../Types/Reservation.type";
import { getAccessToken } from "./Auth";
const Headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getAccessToken()}`,
};
const baseURL: string = "http://localhost:5001/api/reservation";

export const getReservations = async ({ queryKey }: { queryKey: any[] }) => {
  const { data } = await axios.get<ReservationType[]>(
    `${baseURL}/${queryKey[1]}/${queryKey[2]}`,
    {
      headers: Headers,
    }
  );

  return data;
};
export const getReservationsByID = async (id: number) => {
  const { data } = await axios.get<ReservationType>(`${baseURL}/${id}`, {
    headers: Headers,
  });

  return data;
};

export const createUpdate = async (postData: ReservationType) => {
  console.log(postData);

  const {data} = await axios.post<ReservationType>(`${baseURL}`, postData, {
    headers: Headers,
  });
  return data;
};
