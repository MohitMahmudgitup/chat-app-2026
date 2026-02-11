import "dotenv/config";
import app from "./src/app.ts";
import { connectDB } from "./src/config/datebase.ts";
import {createServer} from "http"

const port = process.env.PORT || 3000;
const httpServer = createServer(app)

connectDB()
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error);
    process.exit(1); 
  });
