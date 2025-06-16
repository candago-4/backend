import { Router } from "express";
import { DataController } from "../controllers/dataController";

const router = Router();

const dataController = new DataController();

router.get("/", dataController.getData.bind(dataController));

export default router