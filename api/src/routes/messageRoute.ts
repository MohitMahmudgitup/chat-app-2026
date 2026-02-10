import { Router } from "express";
import { protectRouter } from "../middleware/auth";
import { getMessage } from "../controllers/messageConroller";
const router = Router()


router.get("/chat/:chatId", protectRouter, getMessage);

export default router