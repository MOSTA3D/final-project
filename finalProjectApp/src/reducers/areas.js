import { GET_AREAS } from "../actions/areas";

export default function areas(state={}, action){
    console.log("from areas reducer.");
    switch(action.type){
        case GET_AREAS:
            return action.areas;
        default:
            return state;
    }
}
