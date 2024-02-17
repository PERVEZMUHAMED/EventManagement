import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import ErrorHandler from "../utils/errorHandler";
import { verify } from "jsonwebtoken";
import IAuthMiddleware from "./Interface/authenticate.interface";
import IUserRepository from "../repository/Interface/user.repository.interface";
import { TYPES } from "../di/Types";
import userModel from "../model/user.model";

@injectable()
export class AuthMiddleware implements IAuthMiddleware {
    private readonly userRepo:IUserRepository;
    constructor(
        @inject(TYPES.UserRepository) private _userRepo:IUserRepository
    ) {
        this.userRepo = _userRepo;
    }

    public authenticateUser = async(req:Request, res:Response, next:NextFunction)=>{
        const token = req.cookies.access_token;
        if(!token)  return next(new ErrorHandler("Login first then handle this  resource", 401));
        const decoded = verify(token, process.env.JWT_SECRET);
        const user = await this.userRepo.findById(decoded, userModel);
            // if(!usererr) return next(new ErrorHandler("Unauthorized User", 401));
        (req as any).user = user;
        // console.log("userAuth", user);
        next();
        
    }
    public authorizedUser=(...roles:string[])=>{
        return (req:Request, res:Response, next:NextFunction)=>{
            if(!roles.includes((req as any).user.role)) {
                return next(new ErrorHandler(`Role ${(req as any).user.role} is not allowed`, 401));
            };
            next();
        }
    }
}