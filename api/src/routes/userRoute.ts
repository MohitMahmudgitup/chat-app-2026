import { Router } from "express";
import { protectRouter } from "../middleware/auth";
import { getAllUser } from "../controllers/userConroller";
const router = Router()

router.get("/alluser", protectRouter, getAllUser);

export default router