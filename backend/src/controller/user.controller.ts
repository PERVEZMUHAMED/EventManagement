import { inject, injectable } from "inversify";
import IUserService from "../service/Interface/user.service.interface";
import { TYPES } from "../di/Types";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import userModel from "../model/user.model";
import IUserController from "./Interface/user.controller.interface";


@injectable()
export default class  UserController implements IUserController {
    private readonly userService:IUserService;
    constructor(
        @inject(TYPES.UserService) private _userService:IUserService
    ) {
        this.userService = _userService;
    }
    public createUser = async(req:Request, res:Response, next:NextFunction)=>{
            const {userName, email, password} = req.body;
            console.log("req", req.body);
        if(!userName || !password || !email) {
            return next(new ErrorHandler("Please filled all the details", "400"));
        }
        try {
            const existUser = await this.userService.existUser({userName:userName}, userModel);
            if(existUser) return next(new ErrorHandler("userName Already Exists", 400));
            const existEmail = await this.userService.existEmail({ email: email }, userModel);
            if (existEmail) return next(new ErrorHandler("email Already Exists", 400));
            const createuser = await this.userService.createUser({...req.body}, userModel);
            if(!createuser) return next(new ErrorHandler("User not created", 400));
            console.log("createuserC", createuser);
            return res.status(201).json({
                success:true, 
                data:createuser
            });     
        } catch (error) {
            next(error);
        }
    }
    public Login =async(req:Request, res:Response, next:NextFunction)=>{
        const {email, password} = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400));
        };
        try {
            const user = await this.userService.existEmail({email:email}, userModel);
            if(!user) return next(new ErrorHandler("email or password Invalid", 400));
            const validPw = await this.userService.validPassword(password, user.password);
            if(!validPw) return next(new ErrorHandler("email or password is Invalid", 401));
            const token = await this.userService.generateToken(user);
            res.status(200).cookie("access_token", token, {expires: new Date
                (Date.now() + (process.env.COOKIE_EXPIRES_TIME as any)*24*60*60*1000),httpOnly:true}).json({
                success:true,
                token,
                user
            });
        } catch (error) {
            next(error);
        }
    }
    public Logout = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            res.cookie("access_token", null, {expires:new Date(Date.now()), httpOnly:true})
                .status(200).json({
                success:true,
                message:"Logout Successfully"
            });
        } catch (error) {
            next(error);
        }
    }
    public changePassword =async(req:Request, res:Response, next:NextFunction)=>{
        const {oldPassword, newPassword} = req.body;
        if(!oldPassword || !newPassword) {
            return next(new ErrorHandler("Please filled all the details", 400));
        }
        try {
            const user = await this.userService.getUser((req as any).user, userModel);
            if(!user) return next(new ErrorHandler("user not Found", 401));
            console.log("userC", user);
            const validPw = await this.userService.validPassword(oldPassword, user.password);
            console.log("validPwC", validPw);
            if(!validPw) return next(new ErrorHandler("OldPassword is invalid", 400));
            const change = await this.userService.changePassword(user, newPassword);
            res.status(200).json({
                success:true
            });
        } catch (error) {
            next(error);   
        }
    }
    public updateProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const  updateuser = await this.userService.updateUser(req.body, (req as any).user, userModel);
            if(!updateuser) return next(new ErrorHandler(" user not update", 401));
            return updateuser;
        } catch (error) {
            return error;
        }
    }
    public deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteuser = await this.userService.deleteUser((req as any).user, userModel);
            if (!deleteuser) return next(new ErrorHandler(" user not update", 401));
            return deleteuser;
        } catch (error) {
            next(error);
        }
    }
    public getUserProfile = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const getuser = await this.userService.getUser((req as any).user, userModel);
            if (!getuser) return next(new ErrorHandler(" user not update", 401));
            return getuser;
        } catch (error) {
            next(error);
        }
    }
    public getAllUsers = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const getallusers = await this.userService.getAllUsers(userModel);
            if (!getallusers) return next(new ErrorHandler(" users not found", 401));
            return getallusers;
        } catch (error) {
            
        }
    }
    public getUser = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const getuser = await this.userService.getUser(req.params, userModel);
            if (!getuser) return next(new ErrorHandler(" user not found", 401));
            return getuser;
        } catch (error) {
            next(error);
        }
    }
    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getallusers = await this.userService.updateUser(req.body, req.params, userModel);
            if (!getallusers) return next(new ErrorHandler(" users not found", 401));
            return getallusers;
        } catch (error) {
            next(error);
        }
    }
    public deleteUser = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const getallusers = await this.userService.deleteUser(req.params, userModel);
            if (!getallusers) return next(new ErrorHandler(" users not found", 401));
            return getallusers;
        } catch (error) {
            next(error);
        }
    }
}