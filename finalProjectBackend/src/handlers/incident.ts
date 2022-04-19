import { Request, Response } from "express";
import { Incident } from "../utils/types";

const incidentHandler = (req: Request, res:Response)=>{
    const data:Incident = req.body as unknown as Incident;

}