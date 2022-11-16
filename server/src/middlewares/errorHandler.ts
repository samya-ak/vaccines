import { Request, Response } from "express";
import { IError } from "../types";

export const errorHandler = (
  error: IError,
  req: Request,
  res: Response,
  next: Function
) => {
  if (error) {
    console.error("Error: ", error.status, error.message);
    const status = error.status || 400;
    const message = error.message || "Something went wrong!";
    res.status(status).send({ error: message });
  }
};
