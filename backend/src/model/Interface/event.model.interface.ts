import { Document } from "mongoose";

export default interface Event extends Document {
    name:string
    date:string
    location:string
    description:string
    category:string
    organizer:string
    attendees:string[]
}