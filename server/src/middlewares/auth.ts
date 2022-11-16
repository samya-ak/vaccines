import { Request, Response } from "express";
import User from "../models/user";
import * as jwt from "jsonwebtoken";
import { getUserById } from "../services/user";
import { db } from "../app";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  let token = req.header("Authorization");
  if (!token) {
    return next();
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.APP_SECRET || "secret");
    const { id } = decoded as jwt.JwtPayload;
    console.log("decoded token", decoded);
    const user: User = <User>await getUserById(db, id);
    if (user) {
      req.body.id = id;
    }
  } catch (e: any) {
    console.error(e);
    return next({ status: 422, message: e.message || "Invalid token." });
  }
  next();
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: Function
) => {
  if (req.body.id) {
    return next();
  }

  res.status(401).send({ error: "User is not authenticated" });
};
