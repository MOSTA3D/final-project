// User types

export interface User{
    id?:number,
    firstname: string,
    lastname?: string,
    email: string,
    password: string
}


export interface RUser{
    id?:number
    firstname: string,
    lastname?: string,
    email: string,
}

export interface UserCred{
    email:string,
    password:string
}

export interface Err{
    code:number,
    message:string
}

// Area type

export interface Area{
    id?: number;
    name: string,
    image: string,
    location: string
}

// camera type
export interface Camera{
    id?: number;
    url: string;
    areaId?: number;
}