import "reflect-metadata";
import { inject, injectable } from "inversify";
import IUserRepository from "../repository/Interface/user.repository.interface";
import { TYPES } from "../di/Types";
import { compare, hash } from "bcrypt";
import IUserService from "./Interface/user.service.interface";
import { sign } from "jsonwebtoken";
import { NextFunction } from "express";

@injectable()
export default class UserServcie implements IUserService {
    private readonly userRepo: IUserRepository
    constructor(
        @inject(TYPES.UserRepository) private _userRepo:IUserRepository
    ) {
        this.userRepo = _userRepo;
    }
    public existUser = async(args, model)=>{
        try {
            const existuser = await this.userRepo.findOne({userName:args.userName}, model);
            return existuser;
        } catch (error) {
            return error;
        }
    }
    public existEmail = async (args, model) => {
        try {
            const existemail = await this.userRepo.findOne({ email: args.email}, model);
            return existemail;
        } catch (error) {
            return error;
        }
    }
    public createUser = async(args, model)=>{
        console.log("argsS",args);
        const {userName, email} = args;
        try {
            const hashPassword = await hash(args.password, 7);
            // const existUser = await this.userRepo.findOne({userName:userName}, model);
            // if(existUser) return new  {error:"UserName Already Exists", status:400};
            const user = await this.userRepo.create({...args, password:hashPassword}, model);
            console.log("user", user);
            return user;
        } catch (error) {
            return error;
        }
    }
    public signIn = async(args: any, model: any) =>{
        try {
            const login = await this.userRepo.findOne(args, model);
            return login;
        } catch (error) {
            return error;
        }
    }
    public validPassword =async(password:string, hashPassword:string)=>{
        try {
            const validPw = await compare(password, hashPassword);
            return validPw;
        } catch (error) {
            return error;
        }
    }
    public generateToken = async (args: any) => {
        try {
            const { JWT_SECRET, JWT_EXPIRES_TIME } = process.env;
            const token = sign({ _id: args._id }, JWT_SECRET,
            { expiresIn:JWT_EXPIRES_TIME});
            return token;
        } catch (error) {
            return error;
        }
    }
    public changePassword = async (user,newPassword) => {
        try {
            const hashPassword = await hash(newPassword, 7);
            console.log("userS", user);
            user.password = hashPassword;
            await this.userRepo.Save(user);
        } catch (error) {
            return error;
        }
    }
    public getUser = async (args, model) => {
        try {
            const getuser = await this.userRepo.findById(args, model);
            return getuser;
        } catch (error) {
            return error;
        }
    }
    public getAllUsers = async (model) => {
        try {
            const getallusers = await this.userRepo.find(model);
            return getallusers;
        } catch (error) {
            return error;
        }
    }
    public updateUser = async(body, user, model)=>{
        try {
            const updateuser = await this.userRepo.FindByIdAndUpdate(body, user, model);
            console.log(updateuser);
            
            return updateuser;
        } catch (error) {
            return error;
        }
    }
    public deleteUser = async (args, model) => {
        try {
            const deleteuser = await this.userRepo.FindByIdAndDelete(args,model);
            return deleteuser;
        } catch (error) {
            return error;
        }
    }
} 