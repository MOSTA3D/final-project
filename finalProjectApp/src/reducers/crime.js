import { GET_CRIME } from "../actions/crime";

function crime(state=[], action){
    switch(action.type){
        case GET_CRIME:
            return action.crimes;
        default:
            return state;
    }
}

export default crime;