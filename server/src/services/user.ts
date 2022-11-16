import * as bcrypt from "bcrypt";
import User from "../models/user";
import Database from "./database";
const saltRounds = 10;

export const createUser = async (
  db: Database,
  user: User
): Promise<boolean> => {
  try {
    const hash = await bcrypt.hash(user.password, saltRounds);
    const insertUsers = `INSERT INTO users (email, password) VALUES (?,?);`;

    await db.run(insertUsers, [user.email, hash]);
    return true;
  } catch (err) {
    return false;
  }
};

export const getUserByEmail = async (
  db: Database,
  email: string
): Promise<User> => {
  const user = await db.get("SELECT * FROM users WHERE email =?", [email]);
  return <User>user;
};

export const getUserById = async (db: Database, id: string): Promise<User> => {
  const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
  return <User>user;
};
