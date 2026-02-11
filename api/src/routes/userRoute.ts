import { Router } from "express";
import { protectRouter } from "../middleware/auth.ts";
import { getAllUser } from "../controllers/userConroller.ts";
const router = Router()

router.get("/alluser", protectRouter, getAllUser);

export default router