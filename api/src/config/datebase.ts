import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error("❌ MONGODB_URI is not defined in .env");
        }

        await mongoose.connect(mongoURI, {
            autoIndex: true, 
        });
        
        console.log("👌 MongoDB connected successfully")

    } catch (error) {
        console.log("🥲 MongoDB connected ERROR : \n", error)
        process.exit(1);

    }
}