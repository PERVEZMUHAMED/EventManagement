
export default interface IEventService {
    createEvent:(args: any, model: any) => any
    getEvents: (args: any, model: any) => any
    updateEvent: (body: any, user: any, model: any) => any
    deleteEvent:(args: any, model: any) => any
    markAttendance: (eventId: any, userId: any, model: any) => any
    markInterest: (eventId: any, userId: any, model: any) => any

}