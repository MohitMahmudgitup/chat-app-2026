import { Router } from "express";
import { getMe, postMe } from "../controllers/authConroller.ts";
import { protectRouter } from "../middleware/auth.ts";
const router = Router()

router.get("/me", protectRouter, getMe); // -----------  /api/auth/me -----------
router.post("/me", postMe); // ----------- /api/auth/me -----------

export default router