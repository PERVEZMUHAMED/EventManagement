import "reflect-metadata";
import { injectable } from "inversify";
import IUserRepository from "./Interface/user.repository.interface";

@injectable()
export default class UserRepository implements IUserRepository {
    
    public create = async(args: any, model: any) =>{
        try {
            const create = await model.create(args);
            return create;
        } catch (error) {
            return error;
        }
    };
    public find = async (model:any) => {
        try {
            const findAll = await model.find();
            return findAll;
        } catch (error) {
            return error;
        }
    }
    public findOne = async(args:any, model:any)=>{
        try {
            const findone = await model.findOne(args);
            return findone;
        } catch (error) {
            return error;
        }
    }
    public findById = async (args: any, model: any) => {
        try {
            const findone = await model.findById(args._id);
            return findone;
        } catch (error) {
            return error;
        }
    }
    public FindByIdAndUpdate = async(body, user, model)=>{
        console.log("body", body);
        console.log("user", user);
        try {
            const findbyidandupdate = await model.findByIdAndUpdate(user._id,
            {$set:body}, {new:true, runValidators:true});
            console.log("findbyidandupdateR", findbyidandupdate);        
            return findbyidandupdate;
        } catch (error) {
            return error;           
        }
    }
    public FindByIdAndDelete = async (args, model) => {
        try {
            const findbyidanddelete = await model.findByIdAndDelete(args._id);
            return findbyidanddelete;
        } catch (error) {
            return error;
        }
    }
    public Save =async(args)=>{
        try {
            await args.save();
        } catch (error) {
            return error;
        }
    }
}