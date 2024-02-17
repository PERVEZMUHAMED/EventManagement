import express, { Application } from "express";
import dotenv from 'dotenv';
import { join } from "path";
import cookieParser from "cookie-parser";
import UserRouter from "./router/user.router";
// import { handleError } from "./middleware/error";
import ErrorMiddleware from "./middleware/error";
import EventRouter from "./router/event.router";

dotenv.config({path:join(__dirname, "config/config.env")});

export default class App {

    public app:Application;
    constructor() {
        this.app = express();
        this.configure();
        this.mountRoute();
    };

    private configure ():void {
        this.app.use(express.json());
        this.app.use(cookieParser());
    }
    private mountRoute():void{
        // this.app.use("/api/v1/", event)
        const userRouter = new UserRouter();
        const eventRouter = new EventRouter();
        this.app.use("/api/v1/", userRouter.getRouter());
        this.app.use("/api/v1/", eventRouter.getRouter());

        this.app.use(ErrorMiddleware.handleError);
    }
    public startServer =()=>{
        const {PORT} = process.env;
        this.app.listen(PORT,()=>{
            console.log(`Server is connected in http://localhost:${PORT}`);           
        })
    }
}