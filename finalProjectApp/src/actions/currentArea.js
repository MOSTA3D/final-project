export const SET_CURRENT_AREA = "SET_CURRENT_AREA";

export const setCurrentArea = (currentArea)=>{
    return{
        type: SET_CURRENT_AREA,
        currentArea
    }
}