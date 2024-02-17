import { Schema, model, Types } from "mongoose";
import Event from "./Interface/event.model.interface";

const objectId = Types.ObjectId;

const eventSchema = new Schema({
    name: {
        type:String,
        required:[true, "Please, enter event name"],
    },
    date:{
        type:Date,
        required:[true, 'Please Enter event date']
    }, 
    location:{
        type:String,
        required:[true, "Please enter event location"]
    }, 
    description:{
        type:String,
        required:[true, "Please enter event description"],
    },
    category:{
        type:String,
        required:[true, "Please enter event category"],
        enum:{
            values:[
                "Software Development",
                "Data Science"
            ]
        }
    }, 
    organizer: {
        type:String,
        required:[true, "Please Enter event organizer Information"]
    },
    attendees:[
        {
        type:objectId,
        ref:"users"
        } 
    ]
},{timestamps:true});
 
export default model<Event>("events", eventSchema);