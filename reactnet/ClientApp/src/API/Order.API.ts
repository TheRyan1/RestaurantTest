import axios from "axios";
import OrderType from "../Types/Order.type";
import { getAccessToken } from "./Auth";
const Headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getAccessToken()}`,
};
const baseURL: string = "http://localhost:5001/api/order";

export const getOrders = async ({ queryKey }: { queryKey: any[] }) => {
  const { data } = await axios.get<OrderType[]>(
    `${baseURL}/${queryKey[1]}/${queryKey[2]}`,
    {
      headers: Headers,
    }
  );


  return data;
};
export const getOrderByID = async (id: number) => {
  const { data } = await axios.get<OrderType[]>(`${baseURL}/${id}`, {
    headers: Headers,
  });
  return data;
};

export const createUpdate = async (postData: any) => {
  const { data } = await axios.post<OrderType>(`${baseURL}`, postData, {
    headers: Headers,
  });
  return data;
};
