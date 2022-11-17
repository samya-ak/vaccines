import { Request, Response } from "express";
import { db } from "../app";
import User from "../models/user";
import { createUser, getUserByEmail } from "../services/user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const validate = (user: User): any => {
  const errs: any = {};

  if (!user.email || user.email.length <= 0) {
    errs["email"] = "Email is Required.";
  }
  if (!user.password || user.password.length <= 0) {
    errs["password"] = "Password is Required.";
  }

  return errs;
};

export const signup = async (req: Request, res: Response) => {
  const user: User = req.body;
  const errs = validate(user);
  if (Object.keys(errs).length > 0) {
    return res.status(422).send({ error: errs });
  }

  const dbUser = <User>await getUserByEmail(db, user.email);
  if (dbUser) {
    return res.status(422).send({ error: { email: "Email already exists." } });
  }

  const created: boolean = await createUser(db, user);

  if (created) {
    return res.send({ message: "User successfully created." });
  } else {
    const error: Error = new Error("Error in creating user.");
    return res.status(500).send({ error: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  const user: User = req.body;
  const errs = validate(user);
  if (Object.keys(errs).length > 0) {
    return res.status(422).send({ error: errs });
  }

  const dbUser = <User>await getUserByEmail(db, user.email);

  if (!dbUser) {
    return res.status(401).send({ error: "Invalid email or password." });
  }

  const result = await bcrypt.compare(user.password, dbUser.password);

  if (result) {
    const accessToken = encodeToken(
      dbUser,
      parseInt(process.env.ACCESS_TOKEN_LIFE || "30")
    );
    const refreshToken = encodeToken(
      dbUser,
      parseInt(process.env.REFRESH_TOKEN_LIFE || "900")
    );
    return res.json({ status: "Logged In", accessToken, refreshToken });
  } else {
    return res.status(401).send({ error: "Invalid email or password." });
  }
};

const encodeToken = (tokenData: User, expiry: number) => {
  return jwt.sign({ id: tokenData.id }, process.env.APP_SECRET || "secret", {
    expiresIn: expiry,
  });
};
