import { Application, Request, Response } from "express";
import CamerasModel from "../models/cameras";
import { Camera, Err } from "../utils/types";


const camerasInstance = new CamerasModel();

export const getAreasCameras = async (req:Request, res:Response)=>{
        const { areaId } = req.body;
        let cameras:Camera[]|Err;
        if(areaId){
                cameras = await camerasInstance.getAreasCameras(areaId);
        }else{
                cameras = await camerasInstance.getAllCameras();
        }
        console.log(cameras);
        res.json(cameras);
}
