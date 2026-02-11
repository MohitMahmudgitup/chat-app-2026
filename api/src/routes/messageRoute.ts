import { Router } from "express";
import { protectRouter } from "../middleware/auth.ts";
import { getMessage } from "../controllers/messageConroller.ts";
const router = Router()


router.get("/chat/:chatId", protectRouter, getMessage);

export default router