import "reflect-metadata";
import { inject, injectable } from "inversify";
import IEventRepository from "../repository/Interface/event.repository.interface";
import { TYPES } from "../di/Types";
import IEventService from "./Interface/event.service.interface";

@injectable()
export default class EventServcie implements IEventService {
    private readonly eventRepo: IEventRepository
    constructor(
        @inject(TYPES.EventRepository) private _eventRepo: IEventRepository
    ) {
        this.eventRepo = _eventRepo;
    }
    public getEvents = async (args, model) => {
        try {
            const getevent = await this.eventRepo.getEvent(args, model);
            return getevent;
        } catch (error) {
            return error;
        }
    }
    public createEvent = async (args, model) => {
        console.log("argsS", args);
        try {
            const event = await this.eventRepo.create(args, model);
            console.log("event", event);
            return event;
        } catch (error) {
            return error;
        }
    }
    public updateEvent = async (body, user, model) => {
        try {
            const updateevent = await this.eventRepo.FindByIdAndUpdate(body, user, model);
            return updateevent;
        } catch (error) {
            return error;
        }
    }
    public deleteEvent = async (args, model) => {
        try {
            const deleteevent = await this.eventRepo.FindByIdAndDelete(args, model);
            return deleteevent;
        } catch (error) {
            return error;
        }
    }
    public markAttendance = async (eventId, userId, model) => {
        try {
            const event = await this.eventRepo.markAttendance(eventId,userId, model);
            return event;
        } catch (error) {
            return error;
        }
    }
    public markInterest = async (eventId, userId, model) => {
        try {
            const event = await this.eventRepo.markInterest(eventId, userId, model);
            return event;
        } catch (error) {
            return error;
        }
    } 
} 