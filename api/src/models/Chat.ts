import mongoose, { Schema, type Document } from "mongoose";

interface IChat extends Document {
    participants: mongoose.Types.ObjectId[];
    lastMessage?: mongoose.Types.ObjectId;
    lastMessageAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new Schema<IChat>({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true
        }
    ],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: null
    },
    lastMessageAt : {
        type : Date,
        default : Date.now
    }

},
{
    timestamps : true
})

const chatModel : any  = mongoose.model("Chat" , chatSchema )
export default chatModel