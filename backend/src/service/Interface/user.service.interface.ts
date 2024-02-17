
export default interface IUserService {
    createUser:(args:any, model:any)=>any
    signIn:(args:any, model:any)=>any
    getUser: (args: any, model: any) => any
    getAllUsers: (model: any) => any
    updateUser:(body: any, user:any, model: any) => any
    deleteUser: (args: any, model: any) => any
    existUser: (args: any, model: any) => any
    existEmail: (args: any, model: any) => any
    validPassword: (password: any, hashPassword:any) => any
    generateToken:(args: any) => any
    changePassword:(user: any, newPassword:any) => any

}