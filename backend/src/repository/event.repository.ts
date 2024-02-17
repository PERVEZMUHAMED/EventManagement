import "reflect-metadata";
import { injectable } from "inversify";
import IEventRepository from "./Interface/event.repository.interface";

@injectable()
export default class EventRepository implements IEventRepository {

    public create = async (args: any, model: any) => {
        try {
            const create = await model.create(args);
            return create;
        } catch (error) {
            return error;
        }
    };
    public find = async (model:any) => {
        try {
            const findone = await model.find();
            return findone;
        } catch (error) {
            return error;
        }
    }
    public findOne = async (args: any, model: any) => {
        try {
            const findone = await model.findOne(args);
            return findone;
        } catch (error) {
            return error;
        }
    }
    public findById = async (args: any, model: any) => {
        try {
            const findone = await model.findById(args);
            return findone;
        } catch (error) {
            return error;
        }
    }
    public FindByIdAndUpdate = async (body, user, model) => {
        try {
            const findbyidandupdate = await model.findByIdAndUpdate(user.id,
                { $set: body }, { new: true, runValidators: true });
            return findbyidandupdate;
        } catch (error) {
            return error;
        }
    }
    public FindByIdAndDelete = async (args, model) => {
        try {
            const findbyidanddelete = await model.findByIdAndDelete(args.id);
            return findbyidanddelete;
        } catch (error) {
            return error;
        }
    }
    public getEvent = async(args, model)=>{
        console.log("argsR", args);

        try {
            const page = parseInt(args.page) || 1;
            const limit = parseInt(args.limit) || 10;
            const searchTerm = args.keyword;
            const filter = args.category;
            const sortField = args.sort;
            const sortOrder = args.order;
            const search:any = {}; 
            let sortOption:any = {};
            
            if(searchTerm) {
                search.$or = [
                    {name:{$regex: new RegExp(searchTerm,`i`)}}
                ]
            }
            if(filter) {
                search.category = {$regex: new RegExp(filter, `i`)};
            }
            if(args.date) {
                let querystr = JSON.stringify(args.date);
               let q = querystr.replace(/\b(gt|gte|lt|lte)\b/g, match=>`$${match}`);
               search.date = JSON.parse(q);
            }
            if(sortField) {
                const sortBy = sortField.split(",").join(" ");
                sortOption[sortBy] = sortOrder === "asec"? 1 : -1;
            } else {
                sortOption["createdAt"] = -1;
            }
            console.log(sortOption);
            // sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;

            const event = await model.find(search)
            .skip(limit*(page-1))
            .limit(limit)
            .sort(sortOption);
            console.log("eventR", event);
            return event;
        } catch (error) {
            return error;
        }
    }
    public Save = async (args) => {
        try {
            await args.save();
        } catch (error) {
            return error;
        }
    }
    public markAttendance = async(eventId,userId, model)=>{
        try {
            const event = await model.findByIdAndUpdate(eventId, 
                {$addToSet:{attendees:userId}});
            return event;
        } catch (error) {
            return error;
        }
    }
    public markInterest = async (eventId, userId, model) => {
        try {
            const event = await model.findByIdAndUpdate(eventId,
                { $addToSet: { attendees: userId } });
                return event;
        } catch (error) {
            return error;
        }
    }
}