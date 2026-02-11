import { Router } from "express";
import { protectRouter } from "../middleware/auth.ts";
import { getAllChat, getOrCreateChat } from "../controllers/chatConroller.ts";
const router = Router()

router.get("/", protectRouter, getAllChat);
router.post("/with/:participantsId", protectRouter, getOrCreateChat);

export default router