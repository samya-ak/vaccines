import { signup, signin } from "../controllers/auth";
import * as express from "express";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
