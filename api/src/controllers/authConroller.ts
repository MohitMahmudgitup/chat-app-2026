import type { Request, Response, NextFunction } from "express"
import userModel from "../models/User.ts";
import { clerkClient, getAuth } from "@clerk/express";

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error("getMe error:", error);
        res.status(500)
        next(error)
    }
};
export const postMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const clerkUser = await clerkClient.users.getUser(clerkId);
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    // 1️⃣ Try finding by clerkId
    let user = await userModel.findOne({ clerkId });

    // 2️⃣ If not found, try finding by email
    if (!user && email) {
      user = await userModel.findOne({ email });

      // 3️⃣ If found by email, update clerkId
      if (user) {
        user.clerkId = clerkId;
        await user.save();
      }
    }

    // 4️⃣ If still not found, create new
    if (!user) {
      const fullName = clerkUser.firstName
        ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
        : email.split("@")[0];

      user = await userModel.create({
        clerkId,
        name: fullName,
        email,
        avatar: clerkUser.imageUrl
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error("postMe error:", error);
    next(error);
  }
};
