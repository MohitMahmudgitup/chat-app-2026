import type { Request, Response, NextFunction } from "express"
import chatModel from "../models/Chat";
import mongoose from "mongoose";
export const getAllChat = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = (req as any).userId;

        const allChats = await chatModel.find({ participants: userId })
            .populate("participants", "name email avatar")
            .populate("lastMessage", "text sender createdAt")
            .sort({ lastMessageAt: -1 })
            .lean();

        const formattedChats = allChats.map((chat: any) => {
            const otherParticipant = chat.participants.find((p: any) => p._id.toString() !== userId);
            return {
                _id: chat._id,
                participant: otherParticipant || null,
                lastMessage: chat.lastMessage || null,
                lastMessageAt: chat.lastMessageAt || null,
            };
        })
        return res.status(200).json({
            success: true,
            chats: formattedChats,
        });

    } catch (error) {
        res.status(500)
        next(error);
    }
}


export const getOrCreateChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).userId;
        const { participantsId } = (req as any).params

        if (!userId || !participantsId) {
            return res.status(400).json({
                success: false,
                message: "UserId or participantId missing",
            });
        }

        if (userId === participantsId) {
            return res.status(400).json({
                success: false,
                message: "You cannot chat with yourself",
            });
        }

        if (
            !mongoose.Types.ObjectId.isValid(userId) ||
            !mongoose.Types.ObjectId.isValid(participantsId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id",
            });
        }

        let chat = await chatModel
            .findOne({
                isGroupChat: false,
                participants: {
                    $all: [userId, participantsId],
                },
            })
            .populate("participants", "name email avatar");

        if (!chat) {
            const newChat = await chatModel.create({
                participants: [userId, participantsId],
            });
            await newChat.save();
            chat = newChat.populate("participants", "name email avatar");
        }
        const otherParticipant = chat.participants.find((p: any) => p._id.toString() !== userId);
        return res.status(200).json({
            success: true,
            _id: chat._id,
            participant: otherParticipant || null,
            lastMessage: chat.lastMessage || null,
            lastMessageAt: chat.lastMessageAt || null,
            createdAt: chat.createdAt,
        })


    } catch (error) {
        next(error);
    }

}