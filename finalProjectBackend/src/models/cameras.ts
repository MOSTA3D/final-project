import client from "../database";
import { Err, Camera } from "../utils/types";

class CamerasModel{
    
   async getAllCameras():Promise<Camera[]|Err>{
       try{
           const con = await client.connect();
           const sql = "SELECT * FROM cameras;";
           const result = await con.query(sql);
           con.release();
           return result.rows;
       }catch(err){
           console.log(err);
           return {
               code: 500,
               message: "internal server errror."
           }
       }
   }

    async getAreasCameras(areaId:number):Promise<Camera[]|Err>{
        try{
            const con = await client.connect();
            const sql = "SELECT id, url FROM cameras WHERE area_id=$1;";
            const result = await con.query(sql, [areaId]);
            con.release();
            return result.rows;
        }catch(err){
            console.log(err);
            return {
                code: 500,
                message: "internal server error"
            }
        }
    }
}

export default CamerasModel;