import { inject, injectable } from "inversify";
import IEventService from "../service/Interface/event.service.interface";
import { TYPES } from "../di/Types";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import eventModel from "../model/event.model";
import IEventController from "./Interface/event.controller.interface";
import userModel from "../model/user.model";


@injectable()
export default class EventController implements IEventController {
    private readonly eventService: IEventService;
    constructor(
        @inject(TYPES.EventService) private _eventService:IEventService
    ) {
        this.eventService = _eventService;
    }

    public createEvent = async (req: Request, res: Response, next: NextFunction) => {
        const { name, date, location, category } = req.body;
        // console.log("req", req.body);
        if (!name || !date || !location) {
            return next(new ErrorHandler("Please filled all the details", "400"));
        }
        try {
            const createEvent = await this.eventService.createEvent({...req.body}, eventModel);
            if (!createEvent) return next(new ErrorHandler("event not created", 400));
            console.log("createEventC", createEvent);
            return res.status(201).json({
                success: true,
                data: createEvent
            });
        } catch (error) {
            next(error);
        }
    }
    public updateEvent = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const updateevent = await this.eventService.updateEvent(req.body, req.params, eventModel);
            return updateevent;
        } catch (error) {
            return error;
        }
    }
    public deleteEvent = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const deleteevent = await this.eventService.deleteEvent(req.params, eventModel);
            if(!deleteevent) return next(new ErrorHandler("Event Not Deleted", 400));
            res.status(200).json({
                success:true,
                message:"Event Deleted Successfully"
            });
        } catch (error) {
            return error;
        }
    }
    public getEvents = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const events = await this.eventService.getEvents(req.query, eventModel);
            if(!events) return next(new ErrorHandler("Event not Found", 401));
                console.log(events);  
            res.status(302).json({
                success:true,
                cout:events.length,
                data:events
            });
        } catch (error) {
            next(error);
        }
    }
    public markAttendance =async(req:Request, res:Response, next:NextFunction)=>{
        const eventId = req.params._id;
        try {
            const event = await this.eventService.markAttendance(req.params._id, (req as any).user._id, eventModel);
            if(!event) return next(new ErrorHandler("Event not found", 404));
            res.status(200).json({
                success:true,
                message:"Attendance mark successfully",
                data:event
            })
        } catch (error) {
            next(error);
        }
    }
}