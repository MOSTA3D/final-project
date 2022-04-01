export const GET_AREAS = "GET_AREAS";

export function recieveAreas(areas){
    return{
        type: GET_AREAS,
        areas
    }
}