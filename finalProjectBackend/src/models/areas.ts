import client from "../database";
import { Area, Err } from "../utils/types";

class AreasModel{

    getAll = async ():Promise<Area[]|Err>=>{
        try{
            const con = await client.connect();
            const sql = "SELECT * FROM areas";
            const result = await con.query(sql);
            con.release();
            return result.rows;
        }catch(err){
            return {
                code: 500,
                message: "internal server error"
            }
        }
    }
}

export default AreasModel;