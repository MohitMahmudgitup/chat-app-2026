import express from "express";
import path from "path";
import { fileURLToPath } from "url";  // <-- add this
import { clerkMiddleware } from '@clerk/express'
import authRoute from "./routes/authRoute.ts"
import chatRoute from "./routes/chatRoute.ts"
import messageRoute from "./routes/messageRoute.ts"
import userRoute from "./routes/userRoute.ts"
import errorHandler from "./middleware/errorHandler.ts";

const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);       

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

//------------ production static frontend ------------
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../web/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
    });
}

export default app;
