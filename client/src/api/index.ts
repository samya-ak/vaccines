import axios from "axios";
import { IUser } from "../types";
import { config } from "../config";

const { BASEURL } = config;
export const signup = async (payload: IUser) => {
  try {
    const response = await axios.post(BASEURL + "/signup", payload);
    return response.data;
  } catch (error: any) {
    throw new Error("Error while creating user ", {
      cause: error.response.data,
    });
  }
};

export const signin = async (payload: IUser) => {
  try {
    const response = await axios.post(BASEURL + "/signin", payload);
    console.log('sign in ', response)
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    console.log('err ', error)
    throw new Error("Error while signing in ", {
      cause: error.response.data,
    });
  }
};
