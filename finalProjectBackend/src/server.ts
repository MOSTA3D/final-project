import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import WebSocket from 'ws';

import userRoutes from "./handlers/user";
import { areas } from "./handlers/areas";
import { getAreasCameras } from "./handlers/cameras";

import { validateToken } from "./middlewares/validate";

dotenv.config()

const app:Application = express();

const address = "127.0.0.1";
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req:Request, res:Response)=>{
    res.send("welcome the land of the desert");
});

app.get("/something", validateToken, (req: Request, res:Response)=>{
    res.send("you got me.");
});

userRoutes(app);

app.use("/images", express.static("images"));

// others
app.get("/areas", validateToken, areas);
app.post("/cameras", validateToken, getAreasCameras);

app.all("*", (req: Request, res:Response)=>{
    res.status(404).send("Error 404 not found")
});


const server = app.listen(port, address, ()=>{
    console.log("SERVER INIT.....");
});


// const ws = new WebSocket.Server({server})

// ws.on("connection", (ws)=>{
//     console.log("hello world, ya welcome b el-client");

//     ws.send("ya hala walla ya client");

//     ws.on("message", (message)=>{
//         console.log("recieved the message and it's: ", message);
//     })
// })