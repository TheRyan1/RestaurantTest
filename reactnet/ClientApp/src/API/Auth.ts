import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Providers/Store";
type loginDetails = {
  email: string;
  password: string;
};

export const getAccessToken = () => localStorage.getItem("token");
export const setUser = (id: string, role: string) =>
  localStorage.setItem("user", JSON.stringify({ id, role }));
export const setAccessToken = (token: string) =>
  localStorage.setItem("token", token);
export const isAuthenticated = () => !!getAccessToken();

export const getCurrentUser = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5001/api/user/currentuser",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    setUser(data.id, data.role);
  } catch (err: any) {
    console.log(err.response.data.message);
  }
};
export const doLogin = async (loginDetails: loginDetails) => {
  const { data } = await axios.post(
    "http://localhost:5001/api/authorization/login",
    loginDetails
  );

  if (data?.token) {
    await setAccessToken(data.token);
    const res = await getCurrentUser();
    console.log(res);

    return true;
  }
  return false;
};

export const Authenticate = () => {
  if (getAccessToken()) {
    return true;
  }
  return false;
};

export const doLogout =()=>{
   localStorage.removeItem('token')
   localStorage.removeItem("user")
   window.location.pathname = "/login"
}
