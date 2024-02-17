
export default interface IUserController {
    createUser:(Req: any, res: any, next: any)=>any
    Login:(Req, res, next) => any
    Logout:(req,res,next)=>any
    getUserProfile:(req, res, next) => any
    changePassword:(req, res, next)=>any
    updateProfile:(req, res, next) => any
    deleteProfile:(req, res, next)=> any
    getAllUsers:(req, res, next) => any
    getUser:(req, res, next) => any
    updateUser:(req, res, next) => any
    deleteUser:(req, res, next) => any
}