import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../utils/types";

// global declarations

export const validateUser = (req:Request, res:Response, next:NextFunction)=>{
    const user:User = req.body;
    if(!(user.firstname&&user.email&&user.password)){
        return res.status(404).json({
            message: "fill all required fields."
        });
    }
    next();
}

export const validateToken = (req:Request, res:Response, next:NextFunction)=>{
    const { PVTKEY } = process.env;
    const authHdr = req.headers.authorization;

    if(!authHdr){
        return res.send("you must login first");
    }

    const token = authHdr.split(" ")[1];
    console.log(authHdr);
    try{
        const user = jwt.verify(token, PVTKEY as string);
        res.locals.user = user;
        next();
    }catch(err){
        console.log("error while verifying token.", err);
        return res.send("please try again.");
    }
}