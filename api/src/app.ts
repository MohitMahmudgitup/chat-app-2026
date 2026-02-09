import express from "express";
import authRoute from "./routes/authRoute.ts"
import chatRoute from "./routes/chatRoute.ts"
import messageRoute from "./routes/messageRoute.ts"
import userRoute from "./routes/userRoute.ts"
const app = express();

//------------ middleware ------------
app.use(express.json())

//------------ router ------------
app.use("/api/auth", authRoute)
app.use("/api/chat", chatRoute)
app.use("/api/message", messageRoute)
app.use("/api/user", userRoute)

export default app;

