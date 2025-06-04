import { Router } from "express";
import { DevicesController } from "../controllers/deviceController";
const router = Router();

const deviceController = new DevicesController();

router.get("/", deviceController.getDevices.bind(deviceController));
router.post("/", deviceController.createDevice.bind(deviceController));
router.put("/", deviceController.updateDevice.bind(deviceController));
router.delete("/", deviceController.deleteDevice.bind(deviceController));

export default router