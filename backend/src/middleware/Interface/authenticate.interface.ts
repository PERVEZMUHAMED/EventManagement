
export default interface IAuthMiddleware {
    authenticateUser:(req, res, next)=>any
    authorizedUser:(roles:string)=>any
}