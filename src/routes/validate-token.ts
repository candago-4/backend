import { Router } from "express";
import { Request, Response } from "express";

async function validateToken(req:Request, res:Response): Promise<void> {
  res.status(200).json({ message: "Token is valid" });
}

const router = Router();

router.get("/", validateToken);

export default router