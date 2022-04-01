import client from "../database";
import { User, RUser, UserCred, Err } from "../utils/types";
import bcrypt from "bcrypt";

class UserModel{
    pepper = process.env.PEPPER;
    saltRounds:unknown = process.env.SALT_ROUNDS;

    index = async ():Promise<null|RUser[]>=>{
        try{
            const con = await client.connect();
            const sql = "SELECT * FROM users;";
            const result = await con.query(sql);
            con.release();
            return result.rows;

        }catch(err){
            console.error("error can't connect to the database", err);
            return null;
        }
    }

    create = async (user:User):Promise<Err|null|RUser>=>{
        const hash = bcrypt.hashSync(user.password + this.pepper, Number(this.saltRounds as string));
        user.password = hash;
        if(!(user.firstname&&user.email&&user.password)){
            console.log("user didn't enter all required fields");
            return null;
        }
        try{
            const con = await client.connect();
            const sql = `INSERT INTO users (${Object.keys(user).join()}) VALUES (${Object.values(user).map(f=> `'${f}'`).join()}) RETURNING id, firstname, lastname, email;`;
            const result = await con.query(sql);
            con.release();
            return result.rows[0];
        }catch(err:unknown){
            if((err as Err).code == 23505){
                return {
                    code: 409,
                    message: "User already exits"
                }
            }else{
                return null;
            }
        }
    }

    signIn = async (cred:UserCred):Promise<RUser|Err>=>{
        let foundUser:User;
        try{
            const con = await client.connect();
            const sql = "SELECT * FROM users WHERE email=$1;";
            const result = await con.query(sql, [cred.email]);
            con.release();
            foundUser = result.rows[0];
        }catch(err){
            console.error("something went wrong while getting the password.", err)
            return {
                code: 500,
                message: "internal server error, try again later"
            }
        }

        if(!foundUser){
            return {
                code: 401,
                message: "Signup first"
            }
        }

        if(!await bcrypt.compare(cred.password + this.pepper, foundUser.password)){
            return {
                code: 401,
                message: "Enter correct password"
            }
        }

        const { password, ...rUser } = foundUser;
        return rUser;
    }
}

export default UserModel;