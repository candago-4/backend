import { Router } from "express";
import { save } from "../controllers/gpsController";

const router = Router();

router.post("/", save);

export default router