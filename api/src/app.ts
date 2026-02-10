import express from "express";
import { clerkMiddleware } from '@clerk/express'
import authRoute from "./routes/authRoute.ts"
import chatRoute from "./routes/chatRoute.ts"
import messageRoute from "./routes/messageRoute.ts"
import userRoute from "./routes/userRoute.ts"
import errorHandler from "./middleware/errorHandler.ts";
const app = express();

//------------ middleware ------------
app.use(express.json())
app.use(clerkMiddleware())

//------------ router ------------
app.use("/api/auth", authRoute)
app.use("/api/chat", chatRoute)
app.use("/api/message", messageRoute)
app.use("/api/user", userRoute)

app.use(errorHandler);
export default app;

