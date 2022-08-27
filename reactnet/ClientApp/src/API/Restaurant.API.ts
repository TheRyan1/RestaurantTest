import axios from "axios";
import RestaurantType from "../Types/Restaurant.type";
import { getAccessToken } from "./Auth";
const baseURL: string = "http://localhost:5001/api/restaurant";
const Headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getAccessToken()}`,
};
export const getRestaurants = async () => {
  const token = `Bearer ${getAccessToken()}`
  const { data } = await axios.get<RestaurantType[]>(`${baseURL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
console.log(data)
  return data;
};
export const getRestaurantByID = async (id: number) => {
  const { data } = await axios.get<RestaurantType[]>(
    `${baseURL}/${id}`
  );

  return data;
};

export const createUpdate = async (postData: any) => {
  console.log(postData);

  const { data } = await axios.post<RestaurantType>(
    `${baseURL}`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return data;
};
