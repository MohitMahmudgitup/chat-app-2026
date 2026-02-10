import type { Request, Response, NextFunction } from "express"
import chatModel from "../models/Chat";
import messageModel from "../models/Message";
export const getAllChat = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = (req as any).userId;

        const allChats = await chatModel.find({ participants: userId })
            .populate("participants", "name email avatar")
            .populate("lastMessage")
            .sort({ lastMessageAt: -1 })

        const formattedChat = allChats.map((chat: any) => {
            const otherParticipant = chat.participants.find((p: any) => p._id.toString() !== userId);
            return {
                _id: chat._id,
                participant: otherParticipant,
                lastMessage: chat.lastMessage,
                lastMessageAt: chat.lastMessageAt
            }
        })
        res.json(formattedChat);

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
        let chat = await chatModel
            .findOne({
                isGroupChat: false,
                participants: {
                    $all: [userId, participantsId],
                },
            })
            .populate("participants", "name email avatar");

        if (!chat) {
            const newChat = new chat({ participants: [userId, participantsId] })
            await newChat.save();
            chat = newChat.populate("participants", "name email avatar");
        }
        const otherParticipant = chat.participants.find((p: any) => p._id.toString() !== userId);
        res.json({
            _id: chat._id,
            participant: otherParticipant ?? null,
            lastMessage: chat.lastMessage,
            lastMessageAt: chat.lastMessageAt,
            createAt: chat.createAt
        })


    } catch (error) {
        next(error);
    }

}