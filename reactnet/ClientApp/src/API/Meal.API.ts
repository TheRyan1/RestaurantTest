import axios from "axios";
import MealType from "../Types/Meal.type.ts";
import { getAccessToken } from "./Auth";
const Headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  };
const baseURL: string = "http://localhost:5001/api/meals";

export const getMeals = async ({ queryKey }: { queryKey: any[] }) => {
  const { data } = await axios.get<MealType[]>(`${baseURL}/${queryKey[1]}`,{headers:Headers});
  //TransformData
  console.log(data);
  return data;
};
export const getOrderByID = async (id: number) => {
  const { data } = await axios.get<MealType[]>(`${baseURL}/${id}`,{headers:Headers});

  return data;
};

export const createUpdate = async (postData: any) => {
  const { data } = await axios.post<MealType>(`${baseURL}`, postData,{headers:Headers});
  return data;
};
