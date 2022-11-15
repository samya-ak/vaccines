import express, { Application, Request, Response } from "express";
import Database from "./database";
import bodyParser from "body-parser";
import morgan from "morgan";

const app: Application = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Vaccines App is Running");
});

const PORT = process.env.PORT || 3090;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

const db = new Database("./vaccines.db")
