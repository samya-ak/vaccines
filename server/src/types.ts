import { Request } from "express";
export interface IError {
  status: number;
  message: string;
}

export interface IVaccine {
  name: string;
  description: string;
  numberOfDoses: number;
}
