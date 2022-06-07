import { SET_SAFE, GET_CRIME } from "../actions/crime";

function crime(state=[], action){
    switch(action.type){
        case GET_CRIME:
            return action.crimes;
        case SET_SAFE:
            return state.filter(crime=>crime.camId != action.camId);
        default:
            return state;
    }
}

export default crime;