import AreasModel from "../models/areas";
import { Request, Response } from "express";


const areasInstance = new AreasModel();

export const areas = async (req: Request, res:Response)=>{
    const areas = await areasInstance.getAll();
    res.json(areas);
}
 