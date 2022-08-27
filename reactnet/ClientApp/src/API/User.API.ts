import axios from "axios";
import {UserType} from "../Types/User.type";
import {getAccessToken} from "./Auth";

const baseURL: string = "http://localhost:5001/api/user";
const Headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
};
export const getUsers = async () => {
    const {data} = await axios.get<UserType[]>(`${baseURL}/all`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    console.log(data)
    return data;
};
export const getUserByID = async (id: number) => {
    const {data} = await axios.get<UserType[]>(
        `${baseURL}/${id}`
    );

    return data;
};

export const createUpdate = async (postData: any) => {
    console.log(postData);

    const {data} = await axios.post<UserType>(
        `${baseURL}`,
        postData,
        {
            headers: Headers,
        }
    );
    return data;
};
