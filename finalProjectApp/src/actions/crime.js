export const GET_CRIME = "GET_CRIME";
export const SET_SAFE = "SET_SAFE";

export function getCrime(crimes){
    return {
        type: GET_CRIME,
        crimes
    }
}

export function setSafe(camId){
    return {
        type: SET_SAFE,
        camId
    }
}