import "dotenv/config";
import app from "./src/app.ts";
import { connectDB } from "./src/config/datebase.ts";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error);
    process.exit(1); 
  });
