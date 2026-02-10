import type { Request, Response, NextFunction } from "express"
import { getAuth, requireAuth } from "@clerk/express"
import userModel from "../models/User.ts"

export const protectRouter = [
    requireAuth(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId: clerkId } = getAuth(req);
            if (!clerkId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
            const user = await userModel.findOne({ clerkId });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            (req as any).userId = user._id.toString();

            next();

        } catch (error) {
            console.error("Auth middleware error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
];