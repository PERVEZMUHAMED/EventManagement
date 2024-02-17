export default interface IEventController {
    createEvent:(Req: any, res: any, next: any) => any
    getEvents:(req, res, next)=>any
}