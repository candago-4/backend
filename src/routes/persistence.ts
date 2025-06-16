import { Router } from "express";
import { DataController } from "../controllers/dataController";

const router = Router();

const dataController = new DataController();

router.post("/", dataController.persistData.bind(dataController));

export default router