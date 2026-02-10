import mongoose , {Schema , type Document} from "mongoose";

interface IUser extends Document{
    clerkId : String;
    name : String;
    email : String;
    avatar : String;
    createdAt : Date;
    updatedAt : Date;

}

const userSchema = new Schema<IUser>({
    clerkId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    avatar : {
        type : String,
        default : ""
    }
},{
    timestamps : true
}) 
const userModle : any  = mongoose.model("User" , userSchema )
export default userModle