import type { Request, Response, NextFunction } from "express"
import chatModel from "../models/Chat";
import messageModel from "../models/Message";
export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        const { chatId } = req.params;

        const chat = await chatModel.findOne({
            _id: chatId,
            participants: userId
        })

        if (!chat) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to access this chat",
            });
        }
        const messages = await messageModel
            .find({ chat: chatId })
            .populate("sender", "name email avatar")
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages,
        });


    } catch (error) {

    }
}