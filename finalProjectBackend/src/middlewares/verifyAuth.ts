import { Request, Response, NextFunction } from "express";
import { User } from "../utils/types";

const emailRegex:RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegex:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export default function verifyFormData(req:Request, res:Response, next:NextFunction){
    const user:User = req.body as unknown as User;
    if(!(user.email && user.firstname && user.password)){
        return res.status(500).json({message: "el-hacker 7aram"});
    }

    if(!(user.email.match(emailRegex) && user.password.match(passwordRegex))){
        return res.status(500).json({message: "3eeb 3aleek yasta"});
    }
    next();
}