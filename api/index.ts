import "dotenv/config";
import app from "./src/app.ts"
import { connectDB } from "./src/config/datebase.ts";
const port = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(port,  () => {
        console.log(`Example app listening on port ${port}`)
    })
})
