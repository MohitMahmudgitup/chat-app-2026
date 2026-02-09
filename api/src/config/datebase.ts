import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("👌MongoDB connected successfully")

    } catch (error) {
        console.log("🥲MongoDB connected ERROR : \n", error)
        process.exit(1);

    }
}