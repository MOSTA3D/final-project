export const GET_PEOPLE = "GET_PEOPLE";

export function getPeople(people){
    return {
        type: GET_PEOPLE,
        people
    }
}