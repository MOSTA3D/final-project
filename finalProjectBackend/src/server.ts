import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import WebSocket, {WebSocketServer} from 'ws';

import userRoutes from "./handlers/user";
import { areas } from "./handlers/areas";
import { getAreasCameras } from "./handlers/cameras";

import { validateToken } from "./middlewares/validate";

// determination variable for websocket sending
let isInformed:boolean = true;

dotenv.config()

const app:Application = express();

// const address = "127.0.0.1";
const address = "localhost";
const port = process.env.PORT || 3001;

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




const server = app.listen(Number(port), ()=>{
    console.log("SERVER INIT.....");
});


// testing region
let webSocketSend:Function;

function webSocketCallBack(lws?:WebSocket.WebSocket):void{
    console.log("from web socket callback");
    (lws as unknown as WebSocket.WebSocket).send("web socket call back");
}


// web socket test section
const testData = [
    {
        areaId: 1,
        camId: 2,
        suspects: [
            "https://media.gemini.media/img/large/2020/2/7/2020_2_7_2_38_11_438.jpg",
            "https://i1.sndcdn.com/artworks-qzlPM6WBPKiGfvfp-mO2rjA-t500x500.jpg",
            "https://img.ahlmasrnews.com/728x485/2020/01/%D8%AC%D9%8A%D9%85-%D9%83%D8%A7%D8%B1%D9%8A-%D9%81%D9%8A%D9%84%D9%85-%D8%A7%D9%84%D9%82%D9%86%D8%A7%D8%B9-the-mask-1580489635-0.jpg"
        ]
    }
];

const ws = new WebSocketServer({port:8081});
ws.on("connection", ()=>{
    console.log("client connected");
})

app.get("/inform", (req: Request, res: Response)=>{
    const data = req.body;
    ws.clients.forEach(client=>client.send(JSON.stringify(testData)));
    res.send("hello world from inform route");
});

app.all("*", (req: Request, res:Response)=>{
    res.status(404).send("Error 404 not found")
});
