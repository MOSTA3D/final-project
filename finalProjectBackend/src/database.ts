import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
    DB,
    DB_TEST,
    DB_HOST,
    DB_HOST_TEST,
    DB_USER,
    DB_USER_TEST,
    DB_PASSWORD,
    DB_PASSWORD_TEST,
    DB_PORT,
    ENV
} = process.env;


let client:Pool;

if(ENV==="test"){
    client = new Pool({
        user:DB_USER_TEST,
        password:DB_PASSWORD_TEST,
        host:DB_HOST_TEST,
        database:DB_TEST,
        port: Number(DB_PORT)
    });
}else{
    client = new Pool({
        user:DB_USER,
        password:DB_PASSWORD,
        host:DB_HOST,
        database:DB,
        port: Number(DB_PORT)
    });
}

export default client;