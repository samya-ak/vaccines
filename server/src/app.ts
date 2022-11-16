import express, { Application, Request, Response } from "express";
import Database from "./services/database";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import vaccineRoutes from "./routes/vaccines";
import dotenv from "dotenv";
import { authMiddleware, isAuthenticated } from "./middlewares/auth";
import { errorHandler } from "./middlewares/errorHandler";
dotenv.config();
const app: Application = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Vaccines App is Running");
});

const PORT = process.env.PORT || 3090;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

app.use("/", authRoutes);
app.use("/vaccines", isAuthenticated, vaccineRoutes);
app.get("*", (req: Request, res: Response, next: Function) => {
  return errorHandler(
    { status: 404, message: "URL not found" },
    req,
    res,
    next
  );
});
app.use(errorHandler);

export const db = new Database("./vaccines.db");
