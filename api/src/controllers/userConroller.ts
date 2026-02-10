import type { Request, Response, NextFunction } from "express"
import userModel from "../models/User.ts";


export const getAllUser = async (req: Request , res: Response, next: NextFunction)=>{
    try {
        const userId = (req as any).userId;
        const Alluser = await userModel.find({_id : {$ne : userId }}).select("name email avatar").limit(50);
           res.status(200).json({
            success: true,
            data: Alluser
        });
    } catch (error) {
        res.status(500)
        next(error)
    }
}

