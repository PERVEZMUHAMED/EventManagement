import { connect } from "mongoose";

export default class Database {
    
    public databaseConnection=()=>{
        const {MONGODB_URL} = process.env;
        connect(MONGODB_URL)
        .then(()=>{
            console.log("DB is Connected");
        }).catch((error)=>{
            console.log(`Db is not Connected ${error}`);
        })
    };
}