import * as express from "express";
import {create, update, list, remove} from "../controllers/vaccines"
const router = express.Router();

router.get("/", list)
router.post("/", create)
router.put("/:id", update)
router.delete("/:id", remove)
export default router;
