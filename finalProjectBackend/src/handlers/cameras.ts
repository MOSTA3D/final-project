import { Application, Request, Response } from "express";
import CamerasModel from "../models/cameras";
import { Camera, Err } from "../utils/types";


const camerasInstance = new CamerasModel();

export const getAreasCameras = async (req:Request, res:Response)=>{
        const cameras:Camera[]|Err = await camerasInstance.getAreasCameras(req.body.areaId);
        console.log(cameras);
        res.json(cameras);
}
