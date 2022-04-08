import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import WebSocket from 'ws';

import userRoutes from "./handlers/user";
import { areas } from "./handlers/areas";
import { getAreasCameras } from "./handlers/cameras";

import { validateToken } from "./middlewares/validate";

// determination variable for websocket sending
let isInformed:boolean = true;

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




const server = app.listen(port, address, ()=>{
    console.log("SERVER INIT.....");
});

// testing region
let webSocketSend:Function;

function webSocketCallBack(lws?:WebSocket.WebSocket):void{
    console.log("from web socket callback");
    (lws as unknown as WebSocket.WebSocket).send("web socket call back");
}

const ws = new WebSocket.Server({server});

ws.on("connection", (lws)=>{
    console.log("connection established.");
    webSocketSend = webSocketCallBack.bind(this, lws);
});

app.get("/inform", (req: Request, res: Response)=>{
    console.log("from inform");
    webSocketSend();
    res.send("hello world from inform route");
});

app.all("*", (req: Request, res:Response)=>{
    res.status(404).send("Error 404 not found")
});

// app.post("/inform", (req:Request, res:Response)=>{
//     const data = req.body;
//     ws.on("message", (buffer)=>{
//         console.log("messaged");
//         console.log("recieved the message and it's: ", buffer.toString());
//     })
// });

// ws.on("connection", (lws)=>{
//     console.log("hello world, ya welcome b el-client");
//     lws.send("some");
//     ws.on("message", (buffer)=>{
//         console.log("messaged");
//         console.log("recieved the message and it's: ", buffer.toString());
//     })
// })