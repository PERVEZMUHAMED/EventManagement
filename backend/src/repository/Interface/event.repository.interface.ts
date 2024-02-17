
export default interface IEventRepository {
    create: (args: any, model: any) => any
    find: (model:any) => any
    findOne: (args: any, model: any) => any
    findById: (args: any, model: any) => any
    FindByIdAndUpdate: (body: any, user: any, model: any) => any
    FindByIdAndDelete: (args: any, model: any) => any
    getEvent:(args: any, model: any) => any
    Save: (args: any) => any
    markAttendance:(eventId:any, userId:any, model:any)=>any
    markInterest: (eventId: any, userId: any, model: any) => any

}