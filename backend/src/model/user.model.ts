import { Schema, Types, model } from "mongoose";
import validator from "validator";
import User from "./Interface/user.model.interface";

const objectId = Types.ObjectId;

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "please enter userName"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "please, enter email"],
        validate: [validator.isEmail, "please enter valid Email address"],
    },
    password: {
        type: String,
        requried: [true, "Please enter password"],
    },
    personalDetails: {
        dateOfBirth:{
            type:Date,
        },
        gender: {
            type:String
        },
        mobileNo:String
    },
    interests:[
        {
            type:String
        }
    ],
    attendedEvents:[
        {
            type:objectId,
            ref:"events"
        }
    ],
    role:{
        type: String,
        default: "user"
    },
}, {timestamps: true });

export default model<User>("users", userSchema);
