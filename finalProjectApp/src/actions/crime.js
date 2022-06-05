export const GET_CRIME = "GET_CRIME";

export function getCrime(crimes){
    return {
        type: GET_CRIME,
        crimes
    }
}