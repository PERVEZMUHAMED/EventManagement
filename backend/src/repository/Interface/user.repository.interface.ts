
export default interface IUserRepository {
    create:(args:any, model:any)=>any
    findOne: (args: any, model: any) => any
    findById: (args: any, model: any) => any
    find: (model: any) => any
    FindByIdAndUpdate: (body: any, user:any, model: any) => any
    FindByIdAndDelete: (args:any, model:any) => any
    Save: (args: any) => any

}