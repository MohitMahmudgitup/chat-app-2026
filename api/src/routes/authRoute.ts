import { Router } from "express";
import { getMe, postMe } from "../controllers/authConroller.ts";
import { protectRouter } from "../middleware/auth.ts";
const router = Router()

router.get("/me", protectRouter, getMe)
router.post("/me", postMe)

export default router