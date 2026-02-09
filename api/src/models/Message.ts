import mongoose, { Schema, type Document } from "mongoose";

interface IMessage extends Document {
    chat: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    text: String;
    createdAt: Date;
    updatedAt: Date;

}

const messageSchema = new Schema<IMessage>({
    chat: {
        type: Schema.Types.ObjectId,
        ref: "chat",
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true,
        trim : true
    }
},
{
    timestamps : true 
})
messageSchema.index({
    chat : 1 ,
    createdAt : 1
})

const messageModle: any = mongoose.model("Message", messageSchema)
export default messageModle