import { Socket, Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { verifyToken } from "@clerk/express";
import messageModel from "../models/Message";
import userModel from "../models/User";
import chatModel from "../models/Chat";


// store online users in memory : userId -> socketId
export const onlineUsers: Map<string, string> = new Map()

export const initializeSocket = (httpServer: HttpServer) => {
    const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:8081",
    ].filter(Boolean);

    if (process.env.FRONTEND_URL) {
        allowedOrigins.push(process.env.FRONTEND_URL);
    }

    const io = new SocketServer(httpServer, {
        cors: {
            origin: allowedOrigins
        }
    });

    // ------------------- middleware -----------------

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token
        if (!token) return next(new Error("Authentication error"));
        try {
            const session = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY! })
            const clerkId = session.sub
            const user = await userModel.findOne({ clerkId })
            if (!user) return next(new Error("user not found"));
            socket.data.userId = user._id.toString();
            next()
        } catch (error) {
            next(new Error("Authentication failed"));
        }
    })

    io.on("connection", (socket) => {
        const userId = socket.data.userId;

        //send list of currently online users  to the newly connected client
        socket.emit("online-users", { userIds: Array.from(onlineUsers.keys()) })

        //store user in the online User map
        onlineUsers.set(userId, socket.id)

        //notify other  that  this current user is online
        socket.broadcast.emit("user-online", { userId })

        socket.join(`user : ${userId}`);
        socket.on("join-chat", (chatId: string) => {
            socket.join(`char:${chatId}`)
        })

        socket.on("leave-chat", (chatId: string) => {
            socket.leave(`char:${chatId}`)
        })

        //handle sending message
        socket.on("send-message", async (data: { chatId: string, text: string }) => {
            try {
                const { chatId, text } = data;
                const chat = await chatModel.findOne({
                    _id: chatId,
                    participants: userId
                })
                if (!chat) {
                    socket.emit("socket-error", { message: "chat not found" })
                    return
                }

                const message = await messageModel.create({
                    chat: chatId,
                    sender: userId,
                    text
                })

                chat.lastMessage = message._id;
                chat.lastMessageAt = new Date();
                await chat.save()
                await message.populate("sender", "name avatar")

                io.to(`chat:${chatId}`).emit("new-message", message)

                for (const participant of chat.participants) {
                    const participantId = participant.toString();

                    if (participantId !== userId) {
                        io.to(`user:${participantId}`).emit("new-message", message);
                    }
                }

            } catch (error) {
                socket.emit("socket-error", { message: "Failed to send message" })
            }
        })


        socket.on("disconnect", () => {
            onlineUsers.delete(userId)

            socket.broadcast.emit("user-offline", { userId });
        })

    })
    return io;
};
