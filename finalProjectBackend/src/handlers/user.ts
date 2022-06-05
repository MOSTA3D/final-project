import { Application, Request, Response } from "express";
import { Err, RUser, User, UserCred } from "../utils/types";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";

import verifyFormData from "../middlewares/verifyAuth";

const userInstance = new UserModel();
const { PVTKEY } = process.env;

const signup = async (req:Request, res:Response)=>{
    const user:User = req.body;
    const rUser:RUser|null|Err = await userInstance.create(user);

    if(!rUser){
        return res.status(500).json({message: "el-hacker 7aram"});
    }

    if((rUser as Err).code === 409){
        return res.status(409).json({
            message: (rUser as Err).message
        });
    }

    try{
        const token = jwt.sign(rUser as RUser, PVTKEY as string);
        return res.json(token);
    }catch(err){

        res.status(500).json({
            message: "internal server error"
        });

        console.log("error while signing the token.", err);
    }
}

const signin = async (req:Request, res:Response)=>{
    const cred:UserCred = req.body;
    const rUser:RUser|Err = await userInstance.signIn(cred);

    if((rUser as Err).code){
        return res.json(rUser);
    }

    try{
        const token = jwt.sign(rUser, PVTKEY as string);
        return res.json(token);
    }catch(err){
        console.log("error while signing token in signin.", err);
        return res.json({
            code: 500,
            message: "internal server error"
        });
    }
}

const userRoutes = (app:Application)=>{
    app.post("/signin", signin);
    app.post("/signup", verifyFormData, signup);
}

export default userRoutes;