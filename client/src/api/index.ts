import axios from "axios";
import { IUser, IVaccine } from "../types";
import { config } from "../config";
import { authHeader } from "./utils";

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
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    throw new Error("Error while signing in ", {
      cause: error.response.data,
    });
  }
};

export const createVaccine = async (payload: IVaccine) => {
  try {
    const header = authHeader();
    const response = await axios.post(BASEURL + "/vaccines", payload, {
      headers: { Authorization: header },
    });

    return response.data;
  } catch (error: any) {
    throw new Error("Error while creating vaccine ", {
      cause: error.response.data,
    });
  }
};

export const updateVaccine = async (payload: IVaccine) => {
  try {
    const header = authHeader();
    const response = await axios.put(BASEURL + `/vaccines/${payload.id}`, payload, {
      headers: { Authorization: header },
    });

    return response.data;
  } catch (error: any) {
    throw new Error("Error while updating vaccine ", {
      cause: error.response.data,
    });
  }
};

export const listVaccines = async () => {
  try {
    const header = authHeader();
    const response = await axios.get(BASEURL + "/vaccines", {
      headers: { Authorization: header },
    });

    return response.data;
  } catch (error: any) {
    throw new Error("Error while getting vaccine ", {
      cause: error.response.data,
    });
  }
};

export const deleteVaccine = async (id:number) => {
  try {
    const header = authHeader();
    const response = await axios.delete(BASEURL + `/vaccines/${id}`, {
      headers: { Authorization: header },
    });

    return response.data;
  } catch (error: any) {
    throw new Error("Error while deleting vaccine ", {
      cause: error.response.data,
    });
  }
};
