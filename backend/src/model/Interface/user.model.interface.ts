import { Document } from "mongoose"

export default interface User extends Document {
    userName:string
    email:String
    password:string
    personalDetails:{
        DateOfBirth:Date
        gender:string
        mobileNo:string
        address:string
    }
    interests:string[]
    attendedEvents:string[]
}